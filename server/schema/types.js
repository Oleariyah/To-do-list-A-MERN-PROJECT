
//define datatype and schema
const typeDefs = `
  type Query {
    hello(name: String): String!
    todos: [Todo]
  }

  type Todo {
      id: ID!
      text: String!
      complete: Boolean!
  }

  type Mutation {
    createTodo(text: String!) : Todo
    updateTodo(id: ID!, complete: Boolean!) : Boolean
    removeTodo(id: ID!) : Boolean 
}
`

module.exports= typeDefs;
