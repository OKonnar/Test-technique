NAME =	my_du

SRC = $(shell find ./du -name "*.c")

OBJ	=	$(SRC:.c=.o)

CFLAGS = -g

all:	$(NAME)
		@gcc -g -o $(NAME) $(OBJ) $(LIB)
		@rm -f $(OBJ)

clean:
	@rm -f $(NAME)

$(NAME):	$(OBJ)

fclean: clean
	@rm -f $(OBJ)
	@rm -f *.
	@rm -f ~*

re:	fclean all

.PHONY:	all clean fclean re