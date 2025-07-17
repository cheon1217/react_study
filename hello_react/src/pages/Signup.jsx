import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMember } from '../api/memberApi';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      await createMember(form);
      alert('회원가입 완료! 로그인해주세요.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || '회원가입 실패');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">회원가입</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>이름</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>이메일</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>비밀번호</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success w-100">회원가입</button>
      </form>
    </div>
  );
}

export default Signup;