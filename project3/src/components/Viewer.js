import { emotionList } from "../util";
import "./Viewer.css";

const Viewer = ({ content, emotionId, nickname }) => {
    const emotionItem = emotionList.find((it) => it.id === emotionId);

    return (
        <div className="Viewer">
            <section>
                <h4>오늘의 감정</h4>
                <div
                    className={[
                        "emotion_img_wrapper",
                        `emotion_img_wrapper_${emotionId}`,
                    ].join(" ")}
                >
                    <img alt={emotionItem.name} src={emotionItem.img} />
                    <div className="emotion_descript">{emotionItem.name}</div>
                </div>
            </section>
            <section>
                <div className="viewer-title-row">
                    <h4>오늘의 일기</h4>
                    {nickname && (
                        <span className="viewer-nickname">[{nickname}]</span>
                    )}
                </div>
                <div className="content_wrapper">
                    <p>
                        {content ? content : "일기가 없습니다."}
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Viewer;