import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchBoardDetail,
  deleteBoardPost,
  toggleBoardLike
} from '../api/boardApi';
import { AuthContext } from '../context/AuthContext';
import ReviewSection from '../components/review/ReviewSection';

const categoryColors = {
  '공지': 'bg-primary',
  '자유': 'bg-success',
  'q&a': 'bg-purple', 
  '정보공유': 'bg-info',
  '잡담': 'bg-warning',
};

function normalizeCategory(name = '') {
  return name.toLowerCase().replace(/[^a-z0-9가-힣]/g, '');
}

function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const { member } = useContext(AuthContext);

  useEffect(() => {
    const loadBoard = async () => {
      try {
        const data = await fetchBoardDetail(id);
        setBoard(data);
        setLikesCount(Number(data.likesCount) || 0);
        setLiked(Boolean(data.liked));
      } catch {
        alert('존재하지 않는 게시글입니다.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    loadBoard();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteBoardPost(id);
      alert('삭제되었습니다.');
      navigate('/');
    } catch {
      alert('삭제에 실패했습니다.');
    }
  };

  const handleToggleLike = async () => {
    if (!member) return alert('로그인 후 이용하세요!');
    try {
      const res = await toggleBoardLike(id);
      setLiked(res.liked);
      setLikesCount((prev) => (res.liked ? prev + 1 : Math.max(prev - 1, 0)));
    } catch {
      alert('좋아요 실패');
    }
  };

  if (loading) return <div className="container mt-5">불러오는 중...</div>;
  if (!board) return null;

  const isAuthor = String(member?.memberId) === String(board.member_id);
  const categoryClass = categoryColors[normalizeCategory(board.category_name)] || 'bg-secondary';

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-body">
          <h2 className="fw-bold mb-2">{board.title}</h2>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <span className={`badge me-2 ${categoryClass}`}>
                {board.category_name || '카테고리 없음'}
              </span>
              <small className="text-muted">
                작성자: {board.writer} ·{' '}
                {new Date(board.created_at).toLocaleString()}
              </small>
            </div>

            {/* 좋아요 버튼 */}
            <button
              className={`btn btn-sm ${
                liked ? 'btn-danger' : 'btn-outline-danger'
              }`}
              style={{
                transition: 'transform 0.2s ease-in-out',
                animation: liked ? 'pulse 0.6s ease-in-out' : 'none',
              }}
              onClick={handleToggleLike}
            >
              ❤️ {likesCount}
            </button>
          </div>

          <hr />
          <p className="card-text" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            {board.content}
          </p>

          <div className="mt-3">
            <button
              className="btn btn-secondary me-2"
              onClick={() => navigate(-1)}
            >
              뒤로가기
            </button>
            {member && isAuthor && (
              <>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => navigate(`/edit/${id}`)}
                >
                  수정
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 리뷰 */}
      <ReviewSection
        boardId={parseInt(id, 10)}
        boardWriterId={board.member_id}
      />
    </div>
  );
}

export default BoardDetail;