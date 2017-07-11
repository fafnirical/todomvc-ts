import * as React from 'react';
import * as classNames from 'classnames';

import {TodoInterface} from './App';

export interface TodoItemProps {
  todo: TodoInterface;

  updateTodo(updatedTodo: TodoInterface): void;
  destroyTodo(id: number): void;
}

export interface TodoItemState {
  editing: boolean;
}

export default class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
  private editInput: HTMLInputElement|null;

  constructor(props: TodoItemProps) {
    super(props);

    this.state = {
      editing: false,
    };
  }

  componentDidUpdate({}, prevState: TodoItemState) {
    if (!prevState.editing && this.state.editing) {
      if (this.editInput) {
        this.editInput.focus();
      }
    }
  }

  private enableEditing = () => {
    this.setState({
      editing: true,
    });
  };

  private handleEditBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.editTodo((event.target as HTMLInputElement).value);
  };

  private handleEditKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.editTodo((event.target as HTMLInputElement).value);
    } else if (event.key === 'Escape') {
      this.setState({
        editing: false,
      });
    }
  };

  private editTodo = (title: string) => {
    const sanitizedTitle = title.trim();

    if (sanitizedTitle !== '') {
      this.props.updateTodo({
        ...this.props.todo,
        title: sanitizedTitle
      });
    } else {
      this.props.destroyTodo(this.props.todo.id);
    }

    this.setState({
      editing: false,
    });
  };

  private completeTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateTodo({
      ...this.props.todo,
      completed: event.target.checked,
    });
  };

  private destroyTodo = () => {
    this.props.destroyTodo(this.props.todo.id);
  };

  render() {
    return (
      <li className={classNames({
          completed: this.props.todo.completed,
          editing: this.state.editing,
      })}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={this.props.todo.completed} onChange={this.completeTodo} />
          <label onDoubleClick={this.enableEditing}>{this.props.todo.title}</label>
          <button className="destroy" onClick={this.destroyTodo}></button>
        </div>
        <input ref={input => this.editInput = input} className="edit" defaultValue={this.props.todo.title} onBlur={this.handleEditBlur} onKeyUp={this.handleEditKeyUp} />
      </li>
    );
  }
}
