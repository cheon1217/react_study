import { useContext } from "react";
import { DiaryStateContext } from "../App";
import EmotionChart from "../components/EmotionChart";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function EmotionStats() {
  const data = useContext(DiaryStateContext);
  const navigate = useNavigate();

  return (
    <div>
      <Header
        title="감정별 일기 비율"
        leftChild={<Button text="< 뒤로가기" onClick={() => navigate(-1)} />}
      />
      <EmotionChart diaryList={data} />
    </div>
  );
}

export default EmotionStats;