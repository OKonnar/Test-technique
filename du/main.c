#include <stdio.h>
#include <string.h>
#include <dirent.h>
#include <stdlib.h>
#include <sys/stat.h>

int file_size(char *pathname)
{
    struct stat buf;

    stat(pathname, &buf);
    return (buf.st_size);
}

void getPathSize(char *path)
{
    char *tmpPath = path;
    char newPath[1000];
    DIR *dir = opendir(path);
    int size = 0;

    if (dir == 0)
        return;

    for (struct dirent *dp; (dp = readdir(dir)) != NULL;) {
        if (strcmp(dp->d_name, ".") != 0 && strcmp(dp->d_name, "..") != 0) {
            strcpy(newPath, path);
            strcat(newPath, "/");
            strcat(newPath, dp->d_name);
            size += file_size(newPath);
            getPathSize(newPath);
        }
    }
    printf("%s %d bytes\n", tmpPath, size);
    closedir(dir);
}

int main(int ac, char **av)
{
    if (ac != 2)
        exit(84);
    getPathSize(av[1]);
    return 0;
}