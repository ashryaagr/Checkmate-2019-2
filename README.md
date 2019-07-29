# Checkmate-2019


### Requirements
- Node, npm, mongodb should be installed in your system.
- In case you don't have node and npm, download it from <https://nodejs.org/en/download/>
- In case you don't have mongodb, install it from <https://www.mongodb.com/download-center/community>
- Go to the root directory of the project and execute this in terminal to install node_modules
```
npm install
```


### Starting up the server
- Start the mongo database using 
```
cd {path-to-mongodb}/mongodb/bin
./mongod --dbpath {path-to-data-directory-for-mongo}/mongodb-data
```
- Navigate to the root directory of the project in another terminal window.
- Execute this in terminal
```
npm run dev
```
- Go to <localhost:3000> in your browser.


### Miscellanous points
- Whenever there is a change in package.json, you have to install new node_modules using :
```
npm install
```
- We will use ejs for dynamic rendering of content. If you are not familiar with it, learn it from <https://www.npmjs.com/package/ejs>
- We will not be using REST. Graphql will be used as the query language. 
- In backend we will use the npm package graphql-tools. Read following tutorials to learn more :
    - <https://medium.com/@haidermalik504/building-apis-with-graphql-nodejs-and-mongoose-64655c062dd2>
    - <https://blog.pusher.com/handling-authentication-in-graphql/>
    - Above tutorials should be sufficient. If you want to learn more, go to <https://www.apollographql.com/docs/graphql-tools/>
- The endpoint for all CRUD ( Create, Read, Update, Delete) operations will be /graphql
- Till the frontend is integrated into backend we will use Postman and GraphiQL.
- Frontend team should read <https://graphql.org/graphql-js/graphql-clients/> . This would be sufficient for frontend.
- The directory for frontend files is ./public
- Frontend team, you can take advantage of partials to refactor repetitive code. See ./public/index.ejs for syntax to use partials.
- Frontend team should go to <localhost:3000/graphql> and click on Docs in upper right corner to get the list of available queries, mutations, and their input/return types that they expect.
- Answers will be verfied by sending a post request to /check_answer . The body of request will have :
    - _id : This will be the id of the question.
    - answer : Answer given by user
- Other endpoints available are :
    - GET /login : will render login page
    - GET /register : will render registration page
    - GET /game : will render the main game page
    - GET /instructions : will render instructions page
    - POST /time : will send the server time in the form "HH:MM:SS"
- Frontend team can take advantage of the feature that you direct graphql what fields to return ( among the available fields given in return type)
- Backend team, please ensure that there is no problem of circular imports in your commit.


### Contributions
- Feel free to make any changes and submit a PR.
- Raise issue if you find a bug.
- Please don't push unwanted files.
- Regularly fetch the changes to avoid merge conflicts later.
- Write comments wherever needed.
