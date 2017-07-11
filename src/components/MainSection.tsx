import * as React from 'react';

import {TodoInterface, Filter} from './App';
import TodoList from './TodoList';

export interface MainSectionProps {
  todos: TodoInterface[];
  filter: Filter;

  updateTodo(updatedTodo: TodoInterface): void;
  destroyTodo(id: number): void;
}

export interface MainSectionState {}

export default class MainSection extends React.Component<MainSectionProps, MainSectionState> {
  render() {
    return (
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" TODO />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList todos={this.props.todos} filter={this.props.filter} updateTodo={this.props.updateTodo} destroyTodo={this.props.destroyTodo} />
      </section>
    );
  }
}
