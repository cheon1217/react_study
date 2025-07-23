import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import EmotionStats from "./pages/EmotionStats";
import CalendarPage from "./pages/CalendarPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './App.css';
import React, { useEffect, useReducer, useRef, useState } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newState = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "UPDATE": {
      const newState = state.map((it) => String(it.id) === String(action.data.id) ? { ...action.data } : it);
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "DELETE": {
      const newState = state.filter((it) => String(it.id) !== String(action.targetId));
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    default: {
      return state;
    }
  }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

// 로그인 필요 안내 컴포넌트
function RequireLoginNotice() {
  return (
    <div style={{ padding: 40, textAlign: "center", fontSize: 22 }}>
      <div style={{ marginBottom: 18 }}>로그인 후 이용 가능한 기능입니다.</div>
      <a href="/login" style={{ color: "#64c964", fontSize: 20, textDecoration: "underline" }}>로그인 하러 가기</a>
    </div>
  );
}

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const rawData = localStorage.getItem("diary");
    if (!rawData) {
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData);
    if (localData.length === 0) {
      setIsDataLoaded(true);
      return;
    }
    localData.sort((a, b) => Number(b.id) - Number(a.id));
    idRef.current = localData[0].id + 1;
    dispatch({ type: "INIT", data: localData });
    setIsDataLoaded(true);
  }, []);

  const onCreate = (date, content, emotionId) => {
    const loginUserId = localStorage.getItem("loginUser");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => String(u.id) === String(loginUserId));
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
        userId: loginUserId,
        nickname: user ? user.nickname : "알 수 없음",
      },
    });
    idRef.current += 1;
  };

  const onUpdate = (targetId, date, content, emotionId) => {
    const loginUserId = localStorage.getItem("loginUser");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => String(u.id) === String(loginUserId));
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
        userId: loginUserId,
        nickname: user ? user.nickname : "알 수 없음",
      },
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  const loginUser = localStorage.getItem("loginUser");

  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다.</div>;
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<EmotionStats />} />
              <Route
                path="/new"
                element={loginUser ? <New /> : <RequireLoginNotice />}
              />
              <Route
                path="/edit/:id"
                element={loginUser ? <Edit /> : <RequireLoginNotice />}
              />
              <Route
                path="/diary/:id"
                element={loginUser ? <Diary /> : <RequireLoginNotice />}
              />
              <Route
                path="/calendar"
                element={loginUser ? <CalendarPage /> : <RequireLoginNotice />}
              />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
