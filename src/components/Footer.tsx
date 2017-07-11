import * as React from 'react';
import * as classNames from 'classnames';

import {TodoInterface, Filter} from './App';

export interface FooterProps {
  todos: TodoInterface[];
  filter: Filter;

  filterTodos(filter: Filter): void;
  destroyTodo(id: number): void;
}

export interface FooterState {}

export default class Footer extends React.Component<FooterProps, FooterState> {
  private destroyCompleted = () => {
    this.props.todos
      .filter(todo => todo.completed)
      .forEach((todo) => {
        this.props.destroyTodo(todo.id);
      });
  }

  render() {
    const todoCount = this.props.todos.filter(todo => !todo.completed).length;

    return (
      <footer className="footer">
        {/*<!-- This should be `0 items left` by default -->*/}
        <span className="todo-count"><strong>{todoCount}</strong> {todoCount === 1 ? 'item' : 'items'} left</span>
        {/*<!-- Remove this if you don't implement routing -->*/}
        <ul className="filters">
          <li>
            <a className={classNames({selected: this.props.filter === 'all'})} href="#/" onClick={() => this.props.filterTodos('all')}>All</a>
          </li>
          <li>
            <a className={classNames({selected: this.props.filter === 'active'})} href="#/active" onClick={() => this.props.filterTodos('active')}>Active</a>
          </li>
          <li>
            <a className={classNames({selected: this.props.filter === 'completed'})} href="#/completed" onClick={() => this.props.filterTodos('completed')}>Completed</a>
          </li>
        </ul>
        {/*<!-- Hidden if no completed items are left ↓ -->*/}
        <button className="clear-completed" onClick={this.destroyCompleted}>Clear completed</button>
      </footer>
    );
  }
}
