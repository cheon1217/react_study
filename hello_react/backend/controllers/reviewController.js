const db = require('../models/db');

// 리뷰 Top5 (좋아요순)
exports.getTopLikedReviews = (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT r.*, m.name AS writerName,
            (SELECT COUNT(*) FROM review_like rl WHERE rl.review_id = r.id) AS like_count
      FROM review r
      JOIN member m ON r.member_id = m.id
      WHERE r.is_deleted = 0
      ORDER BY like_count DESC, r.created_at DESC
      LIMIT 5;
    `);
    res.json(stmt.all());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 리뷰 전체 조회 (좋아요 수 포함)
exports.getReviews = (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT 
        r.*, 
        m.name as writerName,
        (SELECT COUNT(*) FROM review_like rl WHERE rl.review_id = r.id) as like_count
      FROM review r
      JOIN member m ON r.member_id = m.id
      WHERE r.is_deleted = 0
      ORDER BY r.created_at ASC
    `);
    const reviews = stmt.all();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 리뷰 추가
exports.addReview = (req, res) => {
  let {
    board_id,
    member_id,
    content,
    rating = 5,
    is_anonymous = 0,
    parent_review_id = null
  } = req.body;

  try {
    if (parent_review_id) {
      rating = 0;
    }

    const stmt = db.prepare(`
      INSERT INTO review (board_id, member_id, content, rating, is_anonymous, parent_review_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(board_id, member_id, content, rating, is_anonymous, parent_review_id);
    res.status(201).json({
      id: info.lastInsertRowid,
      board_id,
      member_id,
      content,
      rating,
      is_anonymous,
      parent_review_id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 단일 리뷰 조회
exports.getReviewById = (req, res) => {
  const { id } = req.params;
  try {
    const stmt = db.prepare(`
      SELECT r.*, m.name as writerName,
        (SELECT COUNT(*) FROM review_like rl WHERE rl.review_id = r.id) as like_count
      FROM review r
      JOIN member m ON r.member_id = m.id
      WHERE r.id = ?
    `);
    const review = stmt.get(id);
    if (!review || review.is_deleted) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 리뷰 수정
exports.updateReview = (req, res) => {
  const { id } = req.params;
  const { content, rating, is_anonymous = 0 } = req.body;
  try {
    const stmt = db.prepare(`
      UPDATE review
      SET content = ?, rating = ?, is_anonymous = ?, is_edited = 1
      WHERE id = ?
    `);
    const info = stmt.run(content, rating, is_anonymous, id);
    if (info.changes) {
      res.json({ id, content, rating, is_anonymous, is_edited: 1 });
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 리뷰 삭제
exports.deleteReview = (req, res) => {
  const { id } = req.params;
  try {
    const stmt = db.prepare('UPDATE review SET is_deleted = 1 WHERE id = ?');
    const info = stmt.run(id);
    if (info.changes) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 리뷰 좋아요 토글
exports.toggleLike = (req, res) => {
  const { review_id, member_id } = req.body;
  try {
    const exists = db
      .prepare('SELECT 1 FROM review_like WHERE review_id = ? AND member_id = ?')
      .get(review_id, member_id);

    if (exists) {
      db.prepare('DELETE FROM review_like WHERE review_id = ? AND member_id = ?')
        .run(review_id, member_id);
      return res.json({ review_id, liked: false });
    } else {
      db.prepare('INSERT INTO review_like (review_id, member_id) VALUES (?, ?)')
        .run(review_id, member_id);
      return res.json({ review_id, liked: true });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};