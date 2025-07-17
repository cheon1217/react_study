import React, { useState } from 'react';
import ReviewForm from './ReviewForm';

const ReviewItem = ({
  review,
  depth = 0,
  onEdit,
  onDelete,
  onLikeToggle,
  member,
  boardWriterId,
  onReplySubmit
}) => {
  const {
    id,
    content,
    rating,
    is_anonymous,
    is_edited,
    member_id,
    created_at,
    writerName,
    parent_review_id,
    replies = [],
    like_count = 0,
    liked = false
  } = review;

  const [replyMode, setReplyMode] = useState(false);

  const displayName = is_anonymous ? '익명 사용자' : writerName || `User ${member_id}`;
  const isLoggedIn = !!member;
  const isReviewAuthor = isLoggedIn && Number(member.memberId) === Number(member_id);

  // 아바타용 첫 글자
  const avatarLetter = displayName?.charAt(0).toUpperCase();

  return (
    <div
      id={`review-${id}`}
      className={`review-item ${depth > 0 ? 'reply' : ''}`}
      style={{
        marginLeft: depth * 12,
        borderLeft: depth > 0 ? '2px solid #e5e5e5' : 'none',
        paddingLeft: depth > 0 ? 10 : 0
      }}
    >
      {/* 작성자 + 좋아요 */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <div className="avatar-circle">{avatarLetter}</div>
          <strong className="text-dark">{displayName}</strong>
          {!parent_review_id && (
            <span className="badge bg-warning text-dark">⭐ {rating}</span>
          )}
          {is_edited && (
            <span className="badge bg-secondary">수정됨</span>
          )}
          <small className="text-muted">{new Date(created_at).toLocaleString()}</small>
        </div>
        <button
          className={`btn btn-sm px-2 py-0 rounded-pill ${
            liked ? 'btn-danger' : 'btn-outline-danger'
          } like-btn`}
          onClick={() => onLikeToggle(review)}
        >
          ❤️ {like_count}
        </button>
      </div>

      {/* 내용 */}
      <p className="mt-1 mb-1 review-content">{content}</p>

      {/* 버튼 */}
      {isLoggedIn && (
        <div className="review-actions">
          {isReviewAuthor && (
            <>
              <span className="action" onClick={() => onEdit(review)}>✏ 수정</span>
              <span className="action text-danger" onClick={() => onDelete(id)}>🗑 삭제</span>
            </>
          )}
          <span
            className="action text-secondary"
            onClick={() => setReplyMode(!replyMode)}
          >
            💬 {replyMode ? '취소' : '답글'}
          </span>
        </div>
      )}

      {/* 답글 작성 */}
      {replyMode && (
        <div className="mt-2 mb-2">
          <ReviewForm
            boardId={review.board_id}
            memberId={member.memberId}
            onSubmit={(data) => {
              onReplySubmit(data, null, id);
              setReplyMode(false);
            }}
            parentReviewId={id}
            onCancel={() => setReplyMode(false)}
          />
        </div>
      )}

      {/* 대댓글 */}
      {replies.length > 0 && (
        <div className="mt-1">
          {replies.map((reply) => (
            <ReviewItem
              key={reply.id}
              review={reply}
              depth={depth + 1}
              onEdit={onEdit}
              onDelete={onDelete}
              onLikeToggle={onLikeToggle}
              member={member}
              boardWriterId={boardWriterId}
              onReplySubmit={onReplySubmit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewItem;