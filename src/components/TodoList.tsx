import * as React from 'react';

import {TodoInterface, Filter} from './App';
import TodoItem from './TodoItem';

export interface TodoListProps {
  todos: TodoInterface[];
  filter: Filter;

  updateTodo(updatedTodo: TodoInterface): void;
  destroyTodo(id: number): void;
}

const TodoList: React.StatelessComponent<TodoListProps> = (props: TodoListProps) => {
  const filteredTodos = props.todos.filter((todo) => {
    switch (props.filter) {
      case 'active':
        return todo.completed === false;
      case 'completed':
        return todo.completed === true;
      case 'all':
      default:
        return true;
    }
  });

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} updateTodo={props.updateTodo} destroyTodo={props.destroyTodo} />
      ))}
    </ul>
  );
};
export default TodoList;
