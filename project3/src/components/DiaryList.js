import { useEffect, useState } from "react";
import "./DiaryList.css";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
];

const PAGE_SIZE = 5;

const DiaryList = ({ data, onEdit }) => {
    const [sortType, setSortType] = useState("latest");
    const [search, setSearch] = useState("");
    const [emotionFilter, setEmotionFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);
    const [sortedData, setSortedData] = useState([]);

    // 감정 리스트
    const emotionList = [
        { value: "all", name: "전체" },
        { value: 1, name: "완전 좋음" },
        { value: 2, name: "좋음" },
        { value: 3, name: "그럭저럭" },
        { value: 4, name: "나쁨" },
        { value: 5, name: "끔찍함" },
    ];

    // 검색/필터 적용
    useEffect(() => {
        let result = data;
        if (search.trim() !== "") {
            result = result.filter(it =>
                it.content.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (emotionFilter !== "all") {
            result = result.filter(it => String(it.emotionId) === String(emotionFilter));
        }
        setFilteredData(result);
        setCurrentPage(1); // 검색/필터 변경 시 첫 페이지로
    }, [data, search, emotionFilter]);

    // 정렬 적용
    useEffect(() => {
        const compare = (a, b) => {
            if (sortType === "latest") {
                return Number(b.date) - Number(a.date);
            } else {
                return Number(a.date) - Number(b.date);
            }
        };
        const copyList = JSON.parse(JSON.stringify(filteredData));
        copyList.sort(compare);
        setSortedData(copyList);
    }, [filteredData, sortType]);

    // 페이지네이션
    const totalPage = Math.ceil(sortedData.length / PAGE_SIZE);
    const pagedData = sortedData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const onChangeSortType = (e) => setSortType(e.target.value);
    const onChangeEmotion = (e) => setEmotionFilter(e.target.value);
    const onChangeSearch = (e) => setSearch(e.target.value);

    // 페이지 이동
    const goPage = (page) => setCurrentPage(page);

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <select value={sortType} onChange={onChangeSortType}>
                        {sortOptionList.map((it, idx) => (
                            <option key={idx} value={it.value}>{it.name}</option>
                        ))}
                    </select>
                    <select value={emotionFilter} onChange={onChangeEmotion}>
                        {emotionList.map((it, idx) => (
                            <option key={idx} value={it.value}>{it.name}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="내용 검색"
                        value={search}
                        onChange={onChangeSearch}
                        style={{ marginLeft: 8, padding: "6px 12px", borderRadius: 5, border: "1px solid #ececec", fontFamily: "Nanum Pen Script", fontSize: 18 }}
                    />
                </div>
            </div>
            <div className="list_wrapper">
                {pagedData.map((it) => (
                    <DiaryItem
                        key={it.id}
                        {...it}
                        onEdit={onEdit}
                    />
                ))}
            </div>
            {/* 페이지네이션 */}
            {totalPage > 1 && (
                <div className="pagination">
                    {[...Array(totalPage)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goPage(idx + 1)}
                            className={currentPage === idx + 1 ? "active" : ""}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DiaryList;