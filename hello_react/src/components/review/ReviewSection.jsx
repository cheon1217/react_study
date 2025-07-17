import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  toggleReviewLike
} from '../../api/reviewApi';
import { AuthContext } from '../../context/AuthContext';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';

const ReviewSection = ({ boardId, boardWriterId }) => {
  const { member } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);

  const loadReviews = useCallback(async () => {
    try {
      const all = await getReviews();
      const filtered = all.filter(r => r.board_id === boardId && r.is_deleted !== 1);

      const rootReviews = filtered.filter(r => !r.parent_review_id);
      const replies = filtered.filter(r => r.parent_review_id);

      const buildTree = (parent) => ({
        ...parent,
        replies: replies
          .filter(r => r.parent_review_id === parent.id)
          .map(reply => buildTree(reply))
      });

      const tree = rootReviews.map(root => buildTree(root));
      setReviews(tree);
    } catch (err) {
      console.error('리뷰 불러오기 실패:', err);
    }
  }, [boardId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleReviewSubmit = async (data, id, scrollTargetId = null) => {
    try {
      if (id) {
        await updateReview(id, data);
      } else {
        await createReview(data);
      }
      await loadReviews();

      if (scrollTargetId) {
        setTimeout(() => {
          document
            .getElementById(`review-${scrollTargetId}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }

      setEditingReview(null);
    } catch (err) {
      console.error('리뷰 저장 실패:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('리뷰를 삭제할까요?')) return;
    try {
      await deleteReview(id);
      await loadReviews();
    } catch (err) {
      console.error('리뷰 삭제 실패:', err);
    }
  };

  const handleLikeToggle = async (targetReview) => {
    if (!member) return alert('로그인이 필요합니다.');
    try {
      const res = await toggleReviewLike(targetReview.id, member.memberId);

      setReviews((prevReviews) =>
        prevReviews.map((r) =>
          r.id === targetReview.id
            ? {
                ...r,
                like_count: Math.max(
                  0,
                  (r.like_count || 0) + (res.liked ? 1 : -1)
                ),
                liked: res.liked
              }
            : {
                ...r,
                replies: r.replies?.map((reply) =>
                  reply.id === targetReview.id
                    ? {
                        ...reply,
                        like_count: Math.max(
                          0,
                          (reply.like_count || 0) + (res.liked ? 1 : -1)
                        ),
                        liked: res.liked
                      }
                    : reply
                )
              }
        )
      );
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
      alert('좋아요 토글 실패!');
    }
  };

  return (
    <div className="mt-5">
      <h4 className="mb-3">리뷰</h4>

      {member && member.memberId !== boardWriterId && !editingReview && (
        <ReviewForm
          boardId={boardId}
          memberId={member.memberId}
          onSubmit={handleReviewSubmit}
        />
      )}

      {editingReview && (
        <ReviewForm
          boardId={boardId}
          memberId={member.memberId}
          onSubmit={handleReviewSubmit}
          isEdit={true}
          initialData={editingReview}
          onCancel={() => setEditingReview(null)}
        />
      )}

      {reviews.length === 0 ? (
        <p className="text-muted">아직 리뷰가 없습니다.</p>
      ) : (
        reviews.map(review => (
          <ReviewItem
            key={review.id}
            review={review}
            onEdit={setEditingReview}
            onDelete={handleDelete}
            onLikeToggle={handleLikeToggle}
            member={member}
            boardWriterId={boardWriterId}
            onReplySubmit={handleReviewSubmit}
          />
        ))
      )}
    </div>
  );
};

export default ReviewSection;