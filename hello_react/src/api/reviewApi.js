import axiosInstance from './axiosInstance';

// 좋아요 Top5 리뷰 가져오기
export const fetchTopLikedReviews = async () => {
  const res = await axiosInstance.get('/api/reviews/top-liked');
  return res.data;
};

// 리뷰 목록 가져오기
export const getReviews = async () => {
    const response = await axiosInstance.get('/api/reviews');
    return response.data;
};

// 리뷰 상세 정보 가져오기
export const getReviewById = async (reviewId) => {
    const response = await axiosInstance.get(`/api/reviews/${reviewId}`);
    return response.data;
};

// 리뷰 작성
export const createReview = async (reviewData) => {
    const response = await axiosInstance.post('/api/reviews', reviewData);
    return response.data;
};

// 리뷰 수정
export const updateReview = async (reviewId, reviewData) => {
    const response = await axiosInstance.put(`/api/reviews/${reviewId}`, reviewData);
    return response.data;
};

// 리뷰 삭제
export const deleteReview = async (reviewId) => {
    const response = await axiosInstance.delete(`/api/reviews/${reviewId}`);
    return response.data;
};

// 리뷰 좋아요 토글
export const toggleReviewLike = async (reviewId, memberId) => {
    const response = await axiosInstance.post('/api/reviews/like/toggle', { review_id: reviewId, member_id: memberId });
    return response.data;
}

// 리뷰 좋아요 개수 가져오기
export const getReviewLikesCount = async (reviewId) => {
    const response = await axiosInstance.get(`/api/reviews/${reviewId}/likes`);
    return response.data.likesCount;
}