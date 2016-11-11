### CMPE281
Final project for CMPE281 -- Cloud technology

###### DB Command

```
npm i --save sequelize
npm i --save mysql

sequelize init

sequelize model:create --name=Author --attributes name:string,bio:text --underscored

```

###### How to run application

```
//Install node from https://nodejs.org/en/download/

npm i
PORT=8000 nodemon index.js

```


###### Create your .env file for development

```
DATABASE_URL=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PW=
```

##### Technology

* MySQL
* Sequelize
* ExpressJS
* Angular
* HandleBar
