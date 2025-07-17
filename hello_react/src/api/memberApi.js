import axiosInstance from './axiosInstance';

// 회원 목록 조회
export const fetchMembers = () => {
    return axiosInstance.get('/members');
};

// 회원 상세 조회
export const fetchMemberById = (id) => {
    return axiosInstance.get(`/members/${id}`);
};

// 회원 생성
export const createMember = (data) => {
    return axiosInstance.post('/api/members/signup', data);
};

// 회원 로그인
export const loginMember = (data) => {
    return axiosInstance.post('/api/members/login', data);
}

export const getMyInfo = () => {
    return axiosInstance.get('/api/members/me'); // 토큰으로 유저정보 조회
}

// 회원 정보 수정
export const updateMember = (id, data) => {
    return axiosInstance.put(`/members/${id}`, data);
};

// 회원 삭제
export const deleteMember = (id) => {
    return axiosInstance.delete(`/members/${id}`);
};
