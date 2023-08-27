import { TodoContext } from './TodoContext';
import { fetchCreateTodo, fetchDeleteTodo, fetchGetTodo, fetchUpdateTodo } from 'api/todo';
import useLoading from 'hooks/useLoading';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Todo } from 'types';

export default function TodoContextProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { loading, isLoaded, handleLoading } = useLoading();

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = useCallback(async () => {
    const res = await handleLoading(() => fetchGetTodo());
    setTodos(res);
  }, [handleLoading]);

  const createTodo = useCallback(
    async (todo: string) => {
      const res = await handleLoading(() => fetchCreateTodo(todo));
      setTodos(prev => [...prev, res]);
      return res;
    },
    [handleLoading],
  );

  const updateTodo = useCallback(
    async (id: number, todo: string, isCompleted: boolean) => {
      const res = await handleLoading(() => fetchUpdateTodo(id, todo, isCompleted));
      setTodos(prev => {
        const arr = [...prev];
        arr[arr.findIndex(item => item.id === id)] = res;
        return arr;
      });
    },
    [handleLoading],
  );

  const deleteTodo = useCallback(
    async (id: number) => {
      const res = await handleLoading(() => fetchDeleteTodo(id));
      if (res) {
        setTodos(prev => prev.filter(item => item.id !== id));
      }
    },
    [handleLoading],
  );

  const sortTodo = useCallback((index: number, change: number) => {
    setTodos(prev => {
      const arr = [...prev];
      const sortingItem = arr[index];
      arr.splice(index, 1);
      arr.splice(change, 0, sortingItem);
      return arr;
    });
  }, []);

  return (
    <TodoContext.Provider
      value={{ todos, createTodo, updateTodo, deleteTodo, sortTodo, loading, isLoaded }}
    >
      {children}
    </TodoContext.Provider>
  );
}
