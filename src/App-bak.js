import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import './firebase';

import firebase from 'firebase';
import 'firebase/database';
import { runInThisContext } from 'vm';

var config = {
    apiKey: "AIzaSyCV6T_qMIKOmRHkTepT3mvFLVdVcSOqDgA",
    authDomain: "todolxs.firebaseapp.com",
    databaseURL: "https://todolxs.firebaseio.com",
    projectId: "todolxs",
    storageBucket: "todolxs.appspot.com",
    messagingSenderId: "945676605396"
};

firebase.initializeApp(config);

const title = {
  listo: ''
}
class App extends Component {
  state = {
    todos: [],
    index: 0,
  }

  componentDidMount() {
    console.log('componentDidMount: -----');
    // firebase.database().ref('todolxs/' + 'todo_1').set({
    //   'name': 'todo_1',
    //   'description': 'todo',
    // })
    firebase.database().ref().on('value', (snapshot) => {
      this.newTodos = [];
      snapshot.forEach((todo) => {
        this.newTodos.push({ id: todo.key, ...todo.val() });
      })
      this.setState({ todos: this.newTodos });
      console.log(this.state.todos);
    })
  }
  setTodo() {
    console.log(this.state.todos.length);
    firebase.database().ref(this.state.todos.length).set({
      'name': this.listo + this.state.todos.length,
      'description': 'todo' + this.state.todos.length,
    });
    // this.state.todos.push(todo);
  }
  deleteTodo(id) {
    console.log('delete todo w/ id : ' + id);
    firebase.database().ref().child(id).remove();
  }
  checkTodo(id, checked) {
    firebase.database().ref().child(id).update({ checked: !checked });
  }
  render() {
    const todoList = () => {
      let list = []
      this.state.todos.forEach((todo) => {
        list.push(
          <div>
            <p>{todo.name}</p>
            <input type="checkbox" onChange={ () => this.checkTodo(todo.id, todo.checked) }></input>
            <button onClick={ () => this.deleteTodo(todo.id) }>Delete</button>
          </div>
        );
      })
      return list;
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <input id="name" type="text" value={this.listo} onChange={e => this.setState({ listo: e.target.value })} ></input>
          { todoList() }
          <p></p>
          <button onClick={() => this.setTodo()}></button>
        </header>
      </div>
    );
  }
}

export default App;
