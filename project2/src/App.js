import './App.css';
import Header from './components/Header';
import TestComp from './components/TestComp';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import { useState, useReducer, useCallback } from 'react';

const mockTodo = [
  { id: 0, isDone: false, content: "React 공부하기", createdDate: new Date().getTime() },
  { id: 1, isDone: false, content: "빨래 널기", createdDate: new Date().getTime() },
  { id: 2, isDone: false, content: "노래 연습하기", createdDate: new Date().getTime() }
]

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.newItem, ...state];
    case "UPDATE":
      return state.map((item) => 
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  const idRef = useState(3);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime()
      }
    });
    idRef.current += 1;
  };

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId
    });
  }, []);

  return (
    <div className="App">
      <TestComp />
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
