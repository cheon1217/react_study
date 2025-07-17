const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 회원가입
exports.signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    console.log('회원가입 요청 도착:', { email, name });

    const hashedPw = await bcrypt.hash(password, 10);

    const stmt = db.prepare('INSERT INTO member (email, password, name) VALUES (?, ?, ?)');
    stmt.run(email, hashedPw, name);

    res.status(201).json({ message: '회원가입 완료' });
  } catch (err) {
    console.error('회원가입 실패:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// 로그인
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const stmt = db.prepare('SELECT * FROM member WHERE email = ?');
    const user = stmt.get(email);

    if (!user) return res.status(404).json({ error: '존재하지 않는 이메일' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: '비밀번호 오류' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, memberId: user.id, name: user.name });
  } catch (err) {
    console.error('로그인 실패:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// 내 정보 (토큰 기반)
exports.getMyInfo = (req, res) => {
  const memberId = req.user.id; // 미들웨어에서 설정됨

  try {
    const stmt = db.prepare('SELECT id, email, name FROM member WHERE id = ?');
    const user = stmt.get(memberId);

    if (!user) {
      return res.status(404).json({ error: '사용자 없음' });
    }

    res.json(user);
  } catch (err) {
    console.error('내 정보 조회 실패:', err.message);
    res.status(500).json({ error: '서버 오류' });
  }
};

// 회원 정보 조회
exports.getMember = async (req, res) => {
  const memberId = req.params.id;
  try {
    const stmt = db.prepare('SELECT id, email, name FROM member WHERE id = ?');
    const user = stmt.get(memberId);

    if (!user) return res.status(404).json({ error: '존재하지 않는 회원' });

    res.json(user);
  } catch (err) {
    console.error('회원 정보 조회 실패:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// 회원 정보 수정
exports.updateMember = async (req, res) => {  
  const memberId = req.params.id;
  const { email, name } = req.body;
  try {
    const stmt = db.prepare('UPDATE member SET email = ?, name = ? WHERE id = ?');
    stmt.run(email, name, memberId);

    res.json({ message: '회원 정보 수정 완료' });
  } catch (err) {
    console.error('회원 정보 수정 실패:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// 회원 탈퇴
exports.deleteMember = async (req, res) => {
  const memberId = req.params.id;
  try {
    const stmt = db.prepare('DELETE FROM member WHERE id = ?');
    stmt.run(memberId);

    res.json({ message: '회원 탈퇴 완료' });
  } catch (err) {
    console.error('회원 탈퇴 실패:', err.message);
    res.status(500).json({ error: err.message });
  }
};