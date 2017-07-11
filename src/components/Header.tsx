import * as React from 'react';

export interface HeaderProps {
  addTodo(title: string): void;
}

export interface HeaderState {}

export default class Header extends React.Component<HeaderProps, HeaderState> {

  private handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const inputElement = event.target as HTMLInputElement;
      const title = inputElement.value.trim();

      if (title !== '') {
        this.props.addTodo(title);
        inputElement.value = '';
      }
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to be done?" autoFocus onKeyUp={this.handleKeyUp} />
      </header>
    );
  }
}
