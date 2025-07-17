import React, { useEffect, useState } from 'react';
import { fetchBoardList, searchBoards, fetchTopLikedBoards } from '../api/boardApi';
import { fetchTopLikedReviews } from '../api/reviewApi';
import BoardCard from '../components/BoardCard';
import Slider from "react-slick";

const sliderSettings = {
  dots: true,             
  infinite: true,         
  speed: 500,             
  slidesToShow: 1,        
  slidesToScroll: 1,      
  autoplay: true,         
  autoplaySpeed: 2000,    
  pauseOnHover: true,     
  centerMode: true,       
  centerPadding: "0px",   
};

function Home() {
  const [boards, setBoards] = useState([]);
  const [topLiked, setTopLiked] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [topLikedReviews, setTopLikedReviews] = useState([]);

  const loadBoards = async () => {
    try {
      const params = { page, limit: 10 };
      if (search) params.search = search;
      if (category) params.category = category;
      if (sort) params.sort = sort;

      const query = new URLSearchParams(params).toString();

      const data = search || category || sort
        ? await searchBoards(`?${query}`)
        : await fetchBoardList(`?${query}`);

      setBoards(data.boards);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('게시글 불러오기 실패', err);
    }
  };

  const loadTopLiked = async () => {
    try {
      const data = await fetchTopLikedBoards();
      setTopLiked(data);
    } catch (err) {
      console.error('인기글 불러오기 실패', err);
    }
  };

  const loadTopLikedReviews = async () => {
    try {
      const data = await fetchTopLikedReviews();
      setTopLikedReviews(data);
    } catch (err) {
      console.error("리뷰 Top5 불러오기 실패", err);
    }
  };

  useEffect(() => {
    loadBoards();
    loadTopLiked();
    loadTopLikedReviews();
    // eslint-disable-next-line
  }, [category, sort, page]);

  const handleSearch = () => {
    setPage(1);
    loadBoards();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 페이지네이션: "..." 표시 로직
  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      pages.push(
        <li key="start" className="page-item">
          <button className="page-link" onClick={() => setPage(1)}>1</button>
        </li>
      );
      if (startPage > 2) {
        pages.push(<li key="ellipsis1" className="page-item disabled"><span className="page-link">...</span></li>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => setPage(i)}>{i}</button>
        </li>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<li key="ellipsis2" className="page-item disabled"><span className="page-link">...</span></li>);
      }
      pages.push(
        <li key="end" className="page-item">
          <button className="page-link" onClick={() => setPage(totalPages)}>{totalPages}</button>
        </li>
      );
    }

    return pages;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold d-flex align-items-center">📄 게시판 목록</h2>

      {/* 인기글 섹션 */}
      {topLiked.length > 0 && (
        <div className="top-liked-section d-flex flex-column align-items-center">
          <h5 className="fw-bold text-danger d-flex justify-content-center align-items-center mb-2">
            🔥 인기 Top5
          </h5>
          <Slider {...sliderSettings}>
            {topLiked.map((board) => (
              <div key={`top-${board.id}`}>
                <div
                  className="card top-liked-card shadow-sm border-1 rounded-3"
                  style={{
                    width: "300px",
                    height: "300px", // 정사각형
                    overflow: "hidden",
                    cursor: "pointer"
                  }}
                  onClick={() => (window.location.href = `/board/${board.id}`)}
                >
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h6
                      className="fw-bold text-dark"
                      style={{ fontSize: "1rem" }}
                    >
                      {board.title.length > 15
                        ? board.title.slice(0, 15) + "..."
                        : board.title}
                    </h6>
                    <p
                      className="text-muted"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {board.content
                        ? board.content.slice(0, 30) +
                          (board.content.length > 30 ? "..." : "")
                        : ""}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-secondary">{board.writer}</small>
                      <span className="text-danger fw-bold">
                        ❤️ {board.likesCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* 검색 바 */}
      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control rounded-start"
            placeholder="검색어 입력"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{ maxWidth: '250px' }}
          />
          <select
            className="form-select"
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            style={{ maxWidth: '120px' }}
          >
            <option value="">전체</option>
            <option value="1">공지</option>
            <option value="2">자유</option>
            <option value="3">Q&A</option>
            <option value="4">정보공유</option>
            <option value="5">잡담</option>
          </select>
          <select
            className="form-select"
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            style={{ maxWidth: '120px' }}
          >
            <option value="">최신순</option>
            <option value="likes">좋아요순</option>
          </select>
          <button
            className="btn btn-dark rounded-end"
            onClick={handleSearch}
            style={{ padding: '0 20px' }}
          >
            검색
          </button>
        </div>
      </div>

      {/* 게시글 목록 */}
      {boards.length === 0 ? (
        <p className="text-muted text-center">게시글이 없습니다.</p>
      ) : (
        <div className="list-group">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>이전</button>
          </li>
          {renderPagination()}
          <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>다음</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;