import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Form from './form';
import TodosQuery from '../graphql/query';
import {UpdateMutation, CreateMutation, RemoveMutation} from '../graphql/mutation';
import {form, todolist, wrapper} from '../static/todoClass';


class TodoList extends Component {

    updateTodo = async todo => {
          //update todo
          await this.props.updateTodo({
          variables: {
            id: todo.id,
            complete: !todo.complete
          },
          update : store => {
            // Read the data from our cache for this query.
            let data = store.readQuery({ query:TodosQuery });
            // Add our comment from the mutation to the end.
            data = data.todos.map(x => x.id === todo.id ? ({...todo, complete: !todo.complete}) : x)
            // Write our data back to the cache.
            store.writeQuery({ query: TodosQuery, data});
          },
          refetchQueries:[{ query: TodosQuery}]
        })
      };
    
        //remove todo
        removeTodo = async todo => {
          await this.props.removeTodo({
            variables: {
              id: todo.id
            },
            update: store => {
              // Read the data from our cache for this query.
              let data = store.readQuery({ query: TodosQuery });
              // Update our TodosQuery from the mutation to the end.
              data = data.todos.filter(x => x.id !== todo.id);
              // Write our data back to the cache.
            store.writeQuery({ query: TodosQuery, data});
            },
            refetchQueries:[{ query: TodosQuery}]
        });
        };
        

    createTodo = async text => {
      //createTodo
      await this.props.createTodo({
        variables: {
          text,
        },
        update: (store, {data: {createTodo}}) => {
          // Read the data from our cache for this query.
          let data = store.readQuery({ query: TodosQuery });
          // Update our TodosQuery from the mutation to the end.
          data = data.todos.unshift(createTodo);
          // Write our data back to the cache.
          store.writeQuery({ query: TodosQuery, data});
        },
        refetchQueries:[{ query: TodosQuery}]
    });
    }
    
    //when enter key is pressed, then submit 
    handleKeyDown = e => {
      if (e.key === "Enter") {
      this.props.submit(this.state.text);
      this.setState({text:""});
      }
    };

render() {
const { data: {loading, todos} } = this.props;

console.log(this.props)     
if (loading){
        return null;
}
  return (
    <div style={todolist}>
        <Paper elevation={1}>
        <div style={form} >
          <Form submit= {this.createTodo}/>
          </div>  
          <List >
            {todos.map(todo => (
              <ListItem
                key={todo.id}
                role={undefined}
                dense
                button
              >
                <Checkbox
                onClick={() => this.updateTodo(todo)}
                defaultChecked={todo.complete}
                tabIndex={-1}
              />
                
                <div style={wrapper}>
                <ListItemText primary={todo.text} />
                </div>
                <ListItemSecondaryAction>
                  <IconButton 
                  onClick={() => this.removeTodo(todo)}>
                    <CloseIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
    </div>);
  }
  }

export default compose(
  graphql(CreateMutation, {name: 'createTodo'}),
  graphql(RemoveMutation, {name: 'removeTodo'}),
  graphql(UpdateMutation, {name: 'updateTodo'}),
  graphql(TodosQuery)) (TodoList);
