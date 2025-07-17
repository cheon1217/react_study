import axiosInstance from './axiosInstance';

// 상위 5개 게시글 가져오기
export const fetchTopLikedBoards = async () => {
  const res = await axiosInstance.get('/api/boards/top-liked');
  return res.data;
};

// 게시판 목록 가져오기
export const fetchBoardList = async (query = '') => {
  const res = await axiosInstance.get(`/api/boards${query}`);
  return res.data;
};

// 게시판 상세 정보 가져오기
export const fetchBoardDetail = async (id) => {
    const response = await axiosInstance.get(`/api/boards/${id}`);
    return response.data;
};

// 게시판 글 작성
export const createBoardPost = async (postData) => {
    const response = await axiosInstance.post('/api/boards', postData);
    return response.data;
};

// 게시판 글 수정
export const updateBoardPost = async (id, postData) => {
    const response = await axiosInstance.put(`/api/boards/${id}`, postData);
    return response.data;
};

// 게시판 글 삭제
export const deleteBoardPost = async (id) => {
    const response = await axiosInstance.delete(`/api/boards/${id}`);
    return response.data;
};

// 게시판 글 좋아요 토글
export const toggleBoardLike = async (boardId) => {
  const res = await axiosInstance.post(`/api/boards/${boardId}/like`);
  return res.data;
};

// 게시판 글 좋아요 개수 가져오기
export const fetchLikesCount = async (postId) => {
    const response = await axiosInstance.get(`/api/boards/${postId}/likes`);
    return response.data.likesCount;
}

// 게시판 검색
export const searchBoards = async (query = '') => {
  const res = await axiosInstance.get(`/api/boards/search${query}`);
  return res.data;
};