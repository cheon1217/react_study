import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const New = () => {
    const { onCreate } = useContext(DiaryDispatchContext);
    const navigate = useNavigate();
    const location = useLocation();

    // 쿼리스트링에서 date 추출
    const params = new URLSearchParams(location.search);
    const queryDate = params.get("date");

    const goBack = () => {
        navigate(-1);
    };

    const onSubmit = (data) => {
        const { date, content, emotionId } = data;
        onCreate(date, content, emotionId);
        navigate("/", { replace: true });
    };

    // Editor에 date 기본값 전달
    return (
        <div>
            <Header 
                title={"새 일기 쓰기"}
                leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
            />
            <Editor onSubmit={onSubmit} defaultDate={queryDate} />
        </div>
    );
}

export default New;