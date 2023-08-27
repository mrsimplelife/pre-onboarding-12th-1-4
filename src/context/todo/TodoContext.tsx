import { createContext } from 'react';
import { Todo } from 'types';

export const TodoContext = createContext<{
  todos: Todo[];
  createTodo: (todo: string) => void;
  updateTodo: (id: number, todo: string, isCompleted: boolean) => void;
  deleteTodo: (id: number) => void;
  sortTodo: (index: number, change: number) => void;
  loading: boolean;
  isLoaded: boolean;
}>({
  todos: [],
  createTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  sortTodo: () => {},
  loading: false,
  isLoaded: false,
});
