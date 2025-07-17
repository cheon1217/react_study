// src/pages/WriteBoard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBoardPost } from '../api/boardApi';

function WriteBoard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      await createBoardPost({ title, content, category_id: categoryId });
      alert('게시글이 등록되었습니다!');
      navigate('/'); // 목록으로 이동
    } catch (error) {
      console.error('게시글 등록 실패', error);
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>✍️ 게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        {/* 제목 */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">제목</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </div>

        {/* 카테고리 선택 */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">카테고리</label>
          <select
            id="category"
            className="form-select"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            <option value={1}>공지</option>
            <option value={2}>자유</option>
            <option value={3}>Q&A</option>
            {/* 필요 시 카테고리 추가 가능 */}
          </select>
        </div>

        {/* 내용 */}
        <div className="mb-3">
          <label htmlFor="content" className="form-label">내용</label>
          <textarea
            id="content"
            className="form-control"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
          />
        </div>

        {/* 버튼 */}
        <button type="submit" className="btn btn-primary">작성 완료</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>취소</button>
      </form>
    </div>
  );
}

export default WriteBoard;
