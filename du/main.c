#include <stdio.h>
#include <string.h>
#include <dirent.h>
#include <stdlib.h>

void goThroughFiles(char *path)
{
    char newPath[1000];
    DIR *dir = opendir(path);

    if (dir == 0)
        return;

    for (struct dirent *dp; (dp = readdir(dir)) != NULL;) {
        if (strcmp(dp->d_name, ".") != 0 && strcmp(dp->d_name, "..") != 0) {
            printf("%s\n", dp->d_name);
            strcpy(newPath, path);
            strcat(newPath, "/");
            strcat(newPath, dp->d_name);
            goThroughFiles(newPath);
        }
    }

    closedir(dir);
}

int main(int ac, char **av)
{
    if (ac != 2)
        exit(84);
    goThroughFiles(av[1]);
    return 0;
}