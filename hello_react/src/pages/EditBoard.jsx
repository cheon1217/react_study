// src/pages/EditBoard.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBoardDetail, updateBoardPost } from '../api/boardApi';

function EditBoard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState(null); // 선택적으로 유지
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBoard = async () => {
      try {
        const data = await fetchBoardDetail(id);
        setTitle(data.title);
        setContent(data.content);
        setCategoryId(data.category_id); // 선택사항
      } catch (err) {
        console.error('게시글 불러오기 실패', err);
        alert('존재하지 않는 게시글입니다.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadBoard();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBoardPost(id, {
        title,
        content,
        category_id: categoryId,
      });
      alert('수정 완료!');
      navigate(`/board/${id}`);
    } catch (err) {
      console.error('수정 실패', err);
      alert('수정에 실패했습니다.');
    }
  };

  if (loading) return <div className="container mt-5">불러오는 중...</div>;

  return (
    <div className="container mt-5">
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">제목</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">내용</label>
          <textarea
            className="form-control"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        {/* 카테고리 선택 (선택사항) */}
        
        <div className="mb-3">
          <label className="form-label">카테고리</label>
          <select
            className="form-select"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            <option value="">선택하세요</option>
            <option value="1">공지</option>
            <option value="2">자유</option>
            <option value="3">Q&A</option>
          </select>
        </div>
       

        <button type="submit" className="btn btn-primary">수정 완료</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>취소</button>
      </form>
    </div>
  );
}

export default EditBoard;
