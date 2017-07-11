import * as React from 'react';

import MainSection from './MainSection';
import Header from './Header';
import Footer from './Footer';

export interface TodoInterface {
  id: number;
  title: string;
  completed: boolean;
}

export type Filter = 'all'|'active'|'completed';

export interface AppProps {}

export interface AppState {
  todos: TodoInterface[];
  filter: Filter;
  nextId: number;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor() {
    super();

    this.state = {
      todos: [],
      filter: 'all',
      nextId: 1,
    }
  }

  private addTodo = (title: string) => {
    this.setState((previousState: AppState) => ({
      todos: [
        ...previousState.todos,
        {
          id: previousState.nextId,
          title,
          completed: false,
        },
      ],
      nextId: previousState.nextId + 1,
    }));
  };

  private updateTodo = (updatedTodo: TodoInterface) => {
    this.setState((previousState: AppState) => {
      const index = previousState.todos.findIndex(todo => todo.id === updatedTodo.id);

      return {
        todos: [
          ...previousState.todos.slice(0, index),
          updatedTodo,
          ...previousState.todos.slice(index + 1),
        ]
      };
    });
  };

  private destroyTodo = (id: number) => {
    this.setState((previousState: AppState) => ({
      todos: previousState.todos.filter(todo => todo.id !== id),
    }));
  };

  private filterTodos = (filter: 'all'|'active'|'completed') => {
    this.setState({
      filter,
    });
  };

  render() {
    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />
        <MainSection todos={this.state.todos} filter={this.state.filter} updateTodo={this.updateTodo} destroyTodo={this.destroyTodo} />
        <Footer todos={this.state.todos} filter={this.state.filter} filterTodos={this.filterTodos} destroyTodo={this.destroyTodo} />
      </section>
    );
  }
}
