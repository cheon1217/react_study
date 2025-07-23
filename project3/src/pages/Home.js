import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate } from "../util";
import DiaryList from "../components/DiaryList";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);
    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`;
    const navigate = useNavigate();

    useEffect(() => {
        if (data.length >= 1) {
            const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter(
                    (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
                )
            );
        } else {
            setFilteredData([]);
        }
    }, [data, pivotDate]);

    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    };

    // 로그인한 사용자 id
    const loginUserId = localStorage.getItem("loginUser");

    // 수정하기 버튼 클릭 시 권한 체크
    const handleEdit = (diaryId, diaryUserId) => {
        if (diaryUserId !== loginUserId) {
            alert("본인이 작성한 일기만 수정할 수 있습니다.");
            return;
        }
        navigate(`/edit/${diaryId}`);
    };

    // 로그인 전/후 오른쪽 버튼
    let rightChild;
    if (loginUserId) {
        // 로그인 후: > 버튼
        rightChild = <Button text=">" onClick={onIncreaseMonth} />;
    } else {
        // 로그인 전: 로그인 버튼 + > 버튼
        rightChild = (
            <div style={{ display: "flex", gap: "10px" }}>
                <Button text="로그인" onClick={() => navigate("/login")} />
                <Button text=">" onClick={onIncreaseMonth} />
            </div>
        );
    }

    const handleRequireLogin = () => {
        alert("로그인 후 이용 가능합니다.");
        navigate("/login");
    };

    return (
    <div>
        <Header
            title={headerTitle}
            leftChild={<Button text="<" onClick={onDecreaseMonth} />}
            rightChild={rightChild}
        />
        <DiaryList
            data={filteredData}
            onEdit={handleEdit}
        />
        <div className="home-bottom-btns">
          <Button
            text="감정 비율 확인하기"
            type="default"
            onClick={() => navigate("/stats")}
          />
          <Button
            text="캘린더 보기"
            type="default"
            onClick={() => {
                if (!loginUserId) {
                    handleRequireLogin();
                    return;
                }
                navigate("/calendar");
            }}
          />
          <Button
            text="새 일기 쓰기"
            type="positive"
            onClick={() => {
                if (!loginUserId) {
                    handleRequireLogin();
                    return;
                }
                navigate("/new");
            }}
          />
        </div>
    </div>
    );
}

export default Home;