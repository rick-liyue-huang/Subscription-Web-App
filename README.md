## About Project


### How to use token

when signup
server once received the email and password from client:
1. validate the email and password;
2. check if email is not already used;
3. hash the password;
4. save the user to the database;
5. send back token to clients.

when signin
1. get the user from database
2. compare the hashed password with stored password
3. send back a token
