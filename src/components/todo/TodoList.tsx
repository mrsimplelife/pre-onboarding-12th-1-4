import TodoItem from './TodoItem';
import DraggableItem from 'components/common/Draggble';
import { TodoContext } from 'context/todo/TodoContext';
import useDrag from 'hooks/useDrag';
import { useContext } from 'react';
import { styled } from 'styled-components';
import { TodoListStyle } from 'styles/CommonStyle';

export default function TodoList() {
  const { todos, loading, sortTodo } = useContext(TodoContext);
  const { onDragStart, onDragOver, onDrop, onDragEnd, dragAnimation } = useDrag(sortTodo);
  return (
    <TodoListStyle>
      {todos.length === 0 ? (
        <p>일정이 없습니다.</p>
      ) : (
        todos.map((todo, index) => (
          <DraggableItem
            key={todo.id}
            index={index}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragEnd={onDragEnd}
            dragAnimation={dragAnimation}
          >
            <TodoItem todo={todo} />
          </DraggableItem>
        ))
      )}
      <Loading loading={loading} />
    </TodoListStyle>
  );
}

const Loading = ({ loading }: { loading: boolean }) => {
  return (
    <LoadingStyle loading={`${loading}`}>
      <div className='loading__bar'></div>
    </LoadingStyle>
  );
};

const LoadingStyle = styled.div<{ loading: string }>`
  opacity: ${({ loading }) => (loading === 'true' ? 1 : 0)};
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #e9ecef;
  .loading__bar {
    width: 0%;
    height: 100%;
    background-color: #212529;
    animation: loading 1s infinite;
  }
  @keyframes loading {
    0% {
      width: 0%;
    }
    50% {
      width: 50%;
    }
    100% {
      width: 100%;
    }
  }
`;
