import React, { useContext, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { DiaryStateContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import "../pages/CalendarPage.css";

function CalendarPage() {
  const data = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  const [selectedList, setSelectedList] = useState(null);

  // 날짜별 일기 존재 여부 확인
  const diaryDates = data.map(d => new Date(Number(d.date)).toDateString());

  // 날짜 클릭 시
  const onClickDay = (date) => {
    const selected = data.filter(
      d => new Date(Number(d.date)).toDateString() === date.toDateString()
    );
    if (selected.length === 1) {
      navigate(`/diary/${selected[0].id}`);
    } else if (selected.length > 1) {
      setSelectedList({
        date,
        diaries: selected,
      });
    } else {
      // 일기가 없으면 새 일기 쓰기로 이동 (날짜 전달)
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      navigate(`/new?date=${y}-${m}-${d}`);
    }
  };

  // 타일에 일기 있으면 점 표시
  const tileContent = ({ date, view }) => {
    if (view === "month" && diaryDates.includes(date.toDateString())) {
      return <div className="calendar-dot" />;
    }
    return null;
  };

  // 여러 개 일기 리스트 모달/박스
  const renderDiaryList = () => {
    if (!selectedList) return null;
    return (
      <div className="calendar-diary-list-modal">
        <div className="calendar-diary-list-box">
          <div className="calendar-diary-list-title">
            {selectedList.date.getFullYear()}년 {selectedList.date.getMonth() + 1}월 {selectedList.date.getDate()}일의 일기
          </div>
          <ul>
            {selectedList.diaries.map((d) => (
              <li key={d.id}>
                <button
                  className="calendar-diary-list-btn"
                  onClick={() => navigate(`/diary/${d.id}`)}
                >
                  <span className="calendar-diary-list-nickname">
                    [{d.nickname || "알 수 없음"}]
                  </span>{" "}
                  {d.content.slice(0, 20) || "내용 없음"}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="calendar-diary-list-close"
            onClick={() => setSelectedList(null)}
          >
            닫기
          </button>
        </div>
        <div className="calendar-diary-list-bg" onClick={() => setSelectedList(null)} />
      </div>
    );
  };

  return (
    <div>
      <Header
        title="일정/캘린더"
        leftChild={<Button text="< 뒤로가기" onClick={() => navigate(-1)} />}
      />
      <div className="calendar-wrapper">
        <Calendar
          onChange={setValue}
          value={value}
          tileContent={tileContent}
          onClickDay={onClickDay}
          calendarType="gregory"
          locale="ko-KR"
          formatDay={(_, date) => date.getDate()}
        />
        {renderDiaryList()}
      </div>
    </div>
  );
}

export default CalendarPage;