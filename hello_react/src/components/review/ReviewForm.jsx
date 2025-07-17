import React, { useState, useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const ReviewForm = ({
  onSubmit,
  initialData = {},
  boardId,
  memberId,
  isEdit = false,
  onCancel,
  parentReviewId = null
}) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    if (isEdit && initialData) {
      setContent(initialData.content || '');
      setRating(initialData.rating || 5);
      setIsAnonymous(initialData.is_anonymous === 1);
    }
  }, [initialData, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return alert('리뷰 내용을 입력해주세요.');

    const reviewData = {
      board_id: boardId,
      member_id: memberId,
      content,
      rating: parentReviewId ? null : rating, 
      is_anonymous: isAnonymous ? 1 : 0,
      parent_review_id: parentReviewId
    };

    onSubmit(reviewData, initialData?.id);
    setContent('');
    setRating(5);
    setIsAnonymous(false);
  };

  // Enter키로 작성 (Shift + Enter는 줄바꿈)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`review-compact ${parentReviewId ? 'reply-form' : ''}`} 
    >
      <textarea
        rows="2"
        placeholder={parentReviewId ? '답글을 입력해주세요...' : '리뷰를 입력해주세요...'}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {!parentReviewId && (
        <div className="stars mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${rating >= star ? 'active' : ''}`}
              onClick={() => setRating(star)}
            >
              {rating >= star ? (
                <AiFillStar size={22} />
              ) : (
                <AiOutlineStar size={22} />
              )}
            </span>
          ))}
          <span className="ms-2 small text-muted">{rating}점</span>
        </div>
      )}

      <div className="bottom-bar">
        <label className="form-check-label small">
          <input
            type="checkbox"
            className="form-check-input me-1"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          익명
        </label>
        <div>
          {isEdit && (
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={onCancel}
            >
              취소
            </button>
          )}
          <button type="submit" className="btn-submit">
            {isEdit ? '수정' : parentReviewId ? '답글 작성' : '리뷰 작성'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
