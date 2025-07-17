const db = require('../models/db'); // better-sqlite3로 초기화된 db 인스턴스

// 공통적으로 사용할 페이지네이션 헬퍼
function getPaginationQuery(req) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

// 좋아요 상위 인기글 5개
exports.getTopLikedBoards = (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT 
        b.id, b.title, b.content, b.created_at,
        m.name AS writer,
        c.name AS category_name,
        (SELECT COUNT(*) FROM board_like bl WHERE bl.board_id = b.id) AS likesCount
      FROM board b
      JOIN member m ON b.member_id = m.id
      LEFT JOIN category c ON b.category_id = c.id
      ORDER BY likesCount DESC, b.created_at DESC
      LIMIT 5
    `);
    res.json(stmt.all());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 게시글 전체 조회 (페이지네이션 적용)
exports.getBoards = (req, res) => {
  try {
    const { page, limit, offset } = getPaginationQuery(req);

    // 전체 게시글 수
    const totalStmt = db.prepare(`SELECT COUNT(*) AS total FROM board`);
    const total = totalStmt.get().total;

    // 실제 데이터
    const stmt = db.prepare(`
      SELECT b.*, m.name AS writer, c.name AS category_name,
        (SELECT COUNT(*) FROM board_like bl WHERE bl.board_id = b.id) AS likesCount
      FROM board b
      JOIN member m ON b.member_id = m.id
      LEFT JOIN category c ON b.category_id = c.id
      ORDER BY b.created_at DESC
      LIMIT ? OFFSET ?
    `);
    const boards = stmt.all(limit, offset);

    res.json({ boards, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 검색 전용 API (페이지네이션 포함)
exports.searchBoards = (req, res) => {
  try {
    const { search = '', category, sort } = req.query;
    const { page, limit, offset } = getPaginationQuery(req);

    let sql = `
      SELECT b.*, 
             m.name AS writer, 
             c.name AS category_name,
             (SELECT COUNT(*) FROM board_like bl WHERE bl.board_id = b.id) AS likesCount
      FROM board b
      JOIN member m ON b.member_id = m.id
      LEFT JOIN category c ON b.category_id = c.id
      WHERE 1=1
    `;
    let countSql = `SELECT COUNT(*) AS total FROM board b JOIN member m ON b.member_id = m.id WHERE 1=1`;
    const params = [];
    const countParams = [];

    if (search) {
      sql += ' AND (b.title LIKE ? OR b.content LIKE ? OR m.name LIKE ?)';
      countSql += ' AND (b.title LIKE ? OR b.content LIKE ? OR m.name LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    if (category) {
      sql += ' AND b.category_id = ?';
      countSql += ' AND b.category_id = ?';
      params.push(category);
      countParams.push(category);
    }

    if (sort === 'likes') {
      sql += ' ORDER BY likesCount DESC, b.created_at DESC';
    } else {
      sql += ' ORDER BY b.created_at DESC';
    }

    sql += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const total = db.prepare(countSql).get(...countParams).total;
    const results = db.prepare(sql).all(...params);

    res.json({ boards: results, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 게시글 상세 조회 (좋아요 개수 + liked 여부 포함)
exports.getBoardById = (req, res) => {
  try {
    const member_id = req.user ? req.user.id : null; // 로그인하지 않았다면 null
    const stmt = db.prepare(`
      SELECT 
        b.*, 
        m.name AS writer, 
        c.name AS category_name,
        (SELECT COUNT(*) FROM board_like bl WHERE bl.board_id = b.id) AS likesCount,
        CASE 
          WHEN ? IS NOT NULL AND 
               EXISTS (SELECT 1 FROM board_like bl WHERE bl.board_id = b.id AND bl.member_id = ?) 
          THEN 1 ELSE 0 
        END AS liked
      FROM board b
      JOIN member m ON b.member_id = m.id
      LEFT JOIN category c ON b.category_id = c.id
      WHERE b.id = ?
    `);

    const board = stmt.get(member_id, member_id, req.params.id);

    if (board) {
      res.json(board);
    } else {
      res.status(404).json({ error: '게시글이 존재하지 않습니다.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 게시글 작성
exports.createBoard = (req, res) => {
  const member_id = req.user.id;
  const { category_id, title, content } = req.body;
  console.log('POST 요청 도착:', {
    user: req.user,
    body: req.body
  });
  try {
    const stmt = db.prepare(`
      INSERT INTO board (member_id, category_id, title, content)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(member_id, category_id, title, content);
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 게시글 수정
exports.updateBoard = (req, res) => {
  const member_id = req.user.id;
  const board_id = req.params.id; // 게시글 ID
  const { category_id, title, content } = req.body;

  try {
    const stmt = db.prepare(`
      UPDATE board
      SET category_id = ?, title = ?, content = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND member_id = ?
    `);
    const result = stmt.run(category_id, title, content, board_id, member_id);

    if (result.changes > 0) {
      res.json({ message: '수정 완료' });
    } else {
      res.status(403).json({ error: '수정 권한이 없거나 게시글이 존재하지 않습니다.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 게시글 삭제
exports.deleteBoard = (req, res) => {
  try {
    const stmt = db.prepare(`DELETE FROM board WHERE id = ?`);
    const result = stmt.run(req.params.id);
    if (result.changes > 0) {
      res.json({ message: '삭제 완료' });
    } else {
      res.status(404).json({ error: '삭제할 게시글이 없습니다.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 좋아요 토글
exports.toggleLike = (req, res) => {
  const member_id = req.user.id; 
  const board_id = req.params.id;

  try {
    const checkStmt = db.prepare(`
      SELECT * FROM board_like WHERE board_id = ? AND member_id = ?
    `);
    const like = checkStmt.get(board_id, member_id);

    if (like) {
      db.prepare(`DELETE FROM board_like WHERE board_id = ? AND member_id = ?`).run(board_id, member_id);
      res.json({ liked: false });
    } else {
      db.prepare(`INSERT INTO board_like (board_id, member_id) VALUES (?, ?)`).run(board_id, member_id);
      res.json({ liked: true });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 좋아요 개수 가져오기
exports.getLikesCount = (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT COUNT(*) AS likesCount FROM board_like WHERE board_id = ?
    `);
    const result = stmt.get(req.params.id);
    res.json({ likesCount: result.likesCount || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};