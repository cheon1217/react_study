import { useNavigate } from "react-router-dom";
import "./DiaryItem.css";
import { getEmotionImgById } from "../util";
import React from "react";

const DiaryItem = ({ id, emotionId, content, date, nickname, userId, onEdit }) => {
    const navigate = useNavigate();

    const loginUserId = localStorage.getItem("loginUser");
    const isOwner = userId === loginUserId && !!loginUserId;

    const goDetail = () => {
        if (!loginUserId) {
            alert("로그인 후 이용 가능합니다.");
            navigate("/login");
            return;
        }
        navigate(`/diary/${id}`);
    };

    return (
        <div className="DiaryItem">
            <div
                onClick={goDetail}
                className={["img_section", `img_section_${emotionId}`].join(" ")}
            >
                <img alt={`emotion${emotionId}`} src={getEmotionImgById(emotionId)} />
            </div>
            <div className="info_section" onClick={goDetail}>
                <div className="date_wrapper">
                    {new Date(parseInt(date)).toLocaleDateString()}
                    <span className="nickname"> [{nickname}]</span>
                </div>
                <div className="content_wrapper">{content.slice(0, 25)}</div>
            </div>
            {isOwner && (
                <button
                    className="edit-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!loginUserId) {
                            navigate("/login");
                            return;
                        }
                        if (onEdit) onEdit(id, userId);
                    }}
                >
                    수정하기
                </button>
            )}
        </div>
    );
};

export default React.memo(DiaryItem);