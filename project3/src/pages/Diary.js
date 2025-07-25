import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import { getFormattedDate } from "../util";
import Button from "../components/Button";
import Header from "../components/Header";
import Viewer from "../components/Viewer";

const Diary = () => {
    const { id } = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const loginUserId = localStorage.getItem("loginUser");

    const goEdit = () => {
        if (!loginUserId) {
            navigate("/login");
            return;
        }
        navigate(`/edit/${id}`);
    };

    if (!data) {
        return <div>일기를 불러오고 있습니다...</div>
    } else {
        const isOwner = data.userId === loginUserId;
        const { date, emotionId, content } = data;
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`;

        return (
            <div>
                <Header 
                    title={title}
                    leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
                    rightChild={
                        isOwner && <Button text={"수정하기"} onClick={goEdit} />
                    }
                />
                <Viewer content={content} emotionId={emotionId} nickname={data.nickname} />
            </div>
        );
    }
};

export default Diary;