# RestApi
This is a small and simple rest api server which is using JWT for authorization and authentication.
All of the sensitive data in is exposed for the test purposes only.

## Project specifications
* Nodejs v14+
* MYSQL v8
* Prisma v2


## Required steps to run the project:
* Download and install Docker on your machine [Docker](https://www.docker.com/products/docker-desktop)
* Download the project and replace the credentials from .env file whit yours
* Open your project with VS code or other editor
* Install all dependencies through the terminal -> npm install
* Run npx prisma db push to generate the DB tables 
* Run docker-compose up to download and run MYSQL image from docker hub
* Run node index to run the server. 


## .env - in root level of the project, create .env file, copy the variables below and replace the * wtih your own data.

#### Your domain *
##### DOMAIN = localhost

#### your DB username *
##### DB_USER = root

#### your DB password *
##### DB_PASSWORD = ''

#### DB port *
##### DB_PORT = 3306

#### Server port
##### SERVER_PORT = 7878

#### production or development
##### NODE_ENV = development

#### Your email name *
##### EMAIL_NAME= ''

#### Your email address *
##### EMAIL_USER = ''

#### Your email password *
##### EMAIL_PASSWORD = ''

### Replace all secrets whith your own !
ACCESS_TOKEN_SECRET = 'dfgdfgfdgdsf213324!@fd'
EMAIL_ACCESS_TOKEN_SECRET = 'zx23fdgdsf213324!@fd'
REFRESH_TOKEN_SECRET = 'dfgdfgfdgdsf213324!@fd'
SALT = 12

##### This text is inserted by `prisma init`:
##### Environment variables declared in this file are automatically made available to Prisma.
##### See the documentation for more detail: https://pris.ly/d/prisma-schema#using-environment-variables
##### Prisma supports the native connection string format for PostgreSQL, MySQL and SQLite.Ф
##### See the documentation for all the connection string options: https://pris.ly/d/connection-strings
##### The default pool size (num_physical_cpus \* 2 + 1) - //TO DO


### Replace DB_USER, DB_PASSWORD, DOMAIN and DB_PORT whit your actual credentials !!!
DATABASE_URL="mysql://DB_USER:DB_PASSWORD@DOMAIN:DB_PORT/rest_api?connection_limit=1&pool_timeout=2"
