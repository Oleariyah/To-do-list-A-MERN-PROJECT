const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const resolvers = require ('./resolver/resolvers');
const typeDefs = require('./schema/types');

//connect to MongoDB with mongoose
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

//connect to the database and run the server
const server = new GraphQLServer({ typeDefs, resolvers })
const PORT = process.env.PORT || 5000
mongoose.connection.once('open', () => 
server.start(() => console.log('Server is running on localhost:4000')));

//nodemon ./server.js localhost 4000