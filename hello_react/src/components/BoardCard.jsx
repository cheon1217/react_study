import React from 'react';
import { Link } from 'react-router-dom';

// 소문자 기준 색상 매핑
const categoryColors = {
  '공지': 'bg-primary',
  '자유': 'bg-success',
  'q&a': 'bg-purple',
  '정보공유': 'bg-info',
  '잡담': 'bg-warning',
};

// 카테고리 정규화 함수
const normalizeCategory = (name = '') =>
  name.toLowerCase().replace(/[^a-z0-9가-힣]/g, '');

const BoardCard = ({ board }) => {
  const categoryClass =
    categoryColors[normalizeCategory(board.category_name)] || 'bg-secondary';

  return (
    <Link
      to={`/board/${board.id}`}
      className="text-decoration-none"
      style={{ color: 'inherit' }}
    >
      <div
        className="card shadow-sm border-0 rounded-3 mb-3"
        style={{
          transition: 'all 0.2s ease-in-out',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.05)';
        }}
      >
        <div className="card-body">
          {/* 제목 + 카테고리 */}
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-1 fw-bold text-dark">{board.title}</h5>
            {board.category_name && (
              <span className={`badge ${categoryClass} me-2`}>
                {board.category_name}
              </span>
            )}
          </div>

          {/* 내용 요약 */}
          <p
            className="card-text text-muted mb-2"
            style={{ fontSize: '0.9rem' }}
          >
            {board.content.length > 50
              ? board.content.slice(0, 50) + '...'
              : board.content}
          </p>

          {/* 작성자 + 좋아요 */}
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-secondary">✍ {board.writer}</small>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.9rem',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  animation:
                    board.likesCount > 0 ? 'pulse 1s infinite' : 'none',
                }}
              >
                ❤️
              </span>
              <strong>{board.likesCount || 0}</strong>
            </div>
          </div>

          {/* 작성일 */}
          <small className="text-muted d-block mt-1">
            {new Date(board.created_at).toLocaleDateString()}
          </small>
        </div>
      </div>
    </Link>
  );
};

export default BoardCard;
