# SD-Login-System

bcryptjs: used to hash passwords before we store them in our database
express: sits on top of Node to make the routing, request handling, and responding easier to write
is-empty: global function that will come in handy when we use validator
jsonwebtoken: used for authorization
mongoose: used to interact with MongoDB
passport: used to authenticate requests, which it does through an extensible set of plugins known as strategies
passport-jwt: passport strategy for authenticating with a JSON Web Token (JWT); lets you authenticate endpoints using a JWT
validator: used to validate inputs (e.g. check for valid email format, confirming passwords match)
TO ADD ---concurrently: allows us to run our backend and frontend concurrently and on different ports


npm i bcryptjs concurrently express is-empty jsonwebtoken mongoose passport passport-jwt validator
npm install --save express-rate-limit
npm i -D nodemon
