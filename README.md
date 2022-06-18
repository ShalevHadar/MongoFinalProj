# Async server side - final project

### `Shalev Hadar`
### `Sapir Arbiv`

## To run the project locally

1. In server folder, make a .env file and make there 2 parameters:
  a. `DB_PASS` which will include the password to the db (mongo atlas)
  b. `PORT` which will include the port you wish to run the server on
2. cd to server folder and npm install
3. cd to client folder and npm install
4. npm start server
5. npm start client

## To use the project

With postman, create a user using the route: `.../api/users/register`
with the following details:
    "personal_id": `9 numbers`,
    "first_name": `fname in string`,
    "last_name": `lname in string`,
    "birthday": `date in format - 1\1\1`,
    "marital_status": `enum in format: 'Married', 'Single', 'Divorced', 'Widowed'`

### `Enjoy !`