const db = require('./db');

// 닉네임·게시글·댓글 샘플 데이터
const nicknames = [
  "하늘소리", "바람결", "초록비", "푸른하늘", "달빛소년",
  "코딩하는고양이", "재미있는사람", "웃는토끼", "밤하늘별", "아침햇살",
  "커피중독", "게임천재", "여행러버", "책읽는소녀", "운동광"
];
const postTitles = [
  "오늘 너무 힘들었네요", "React 질문드립니다", "자유게시판 첫 글!",
  "맛집 추천 좀 해주세요", "이거 버그인가요?", "공지 확인 부탁드려요",
  "좋은 하루 보내세요", "Q&A: 로그인 오류 해결 방법", "프론트엔드 공부 팁 공유합니다",
  "잡담: 비 오는 날 좋아하시나요?"
];
const postContents = [
  "오늘 회사에서 정말 피곤했어요. 다들 어떻게 스트레스를 푸시나요?",
  "React 훅스(useEffect) 관련해서 질문이 있습니다. 아시는 분 답변 부탁드립니다!",
  "안녕하세요, 자유롭게 소통하는 공간이 되면 좋겠습니다.",
  "강남역 근처 맛집 추천 부탁드려요. 점심 메뉴 고민입니다.",
  "버튼 클릭하면 콘솔에 오류가 나는데 혹시 같은 경험 있으신가요?",
  "공지사항입니다. 반드시 확인 부탁드립니다.",
  "모두 오늘도 행복한 하루 보내시길 바랍니다!",
  "로그인할 때 500 에러가 발생하는데 혹시 해결하신 분 계신가요?",
  "프론트엔드 개발할 때 어떤 책이나 강의 추천하시나요?",
  "비 오는 날이면 왠지 감성이 차오르는 것 같아요. 다들 어떠세요?"
];
const commentContents = [
  "저도 그렇게 생각해요!", "오 좋은 정보네요 감사합니다!", "질문이 있는데요…",
  "정말 공감합니다 ㅎㅎ", "도움이 많이 됐어요!", "저도 비슷한 경험 있어요",
  "감사합니다 덕분에 해결했어요!", "이건 조금 다르게 생각해요", "혹시 더 자세히 설명해주실 수 있나요?",
  "재밌는 글이네요 잘 보고 갑니다"
];
const replyContents = [
  "네, 맞아요 저도 그렇게 느껴요", "감사합니다! 참고하겠습니다",
  "헐 대박 정보네요 ㄷㄷ", "오! 좋은 팁 감사합니다", "맞아요 완전 공감합니다"
];

// 랜덤 헬퍼
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ========================
// 초기화
// ========================
function resetAllData() {
  console.warn('모든 데이터를 초기화합니다.');
  const tables = ['review_like', 'board_like', 'review', 'file', 'board', 'category', 'member'];
  db.transaction(() => {
    for (const table of tables) {
      db.prepare(`DELETE FROM ${table}`).run();
      db.prepare(`DELETE FROM sqlite_sequence WHERE name = ?`).run(table);
    }
  })();
  console.log('초기화 완료');
}

// ========================
// 목업 데이터 삽입 (운영판)
// ========================
function insertMockData() {
  // 회원 (20명)
  const insertMember = db.prepare(`INSERT INTO member (email, password, name) VALUES (?, ?, ?)`);
  const members = [];
  for (let i = 1; i <= 20; i++) {
    const nickname = `${rand(nicknames)}${Math.floor(Math.random() * 100)}`;
    members.push({
      email: `user${i}@example.com`,
      password: '1234',
      name: nickname
    });
  }
  db.transaction(() => members.forEach(m => insertMember.run(m.email, m.password, m.name)))();

  // 카테고리
  const insertCategory = db.prepare(`INSERT INTO category (name) VALUES (?)`);
  const categories = ['공지', '자유', 'Q&A', '정보공유', '잡담'];
  categories.forEach(c => insertCategory.run(c));

  // 게시글 (100개)
  const allMembers = db.prepare('SELECT id FROM member').all();
  const allCategories = db.prepare('SELECT id FROM category').all();
  const insertBoard = db.prepare(`
    INSERT INTO board (member_id, category_id, title, content)
    VALUES (?, ?, ?, ?)
  `);
  for (let i = 1; i <= 100; i++) {
    const rm = rand(allMembers);
    const rc = rand(allCategories);
    insertBoard.run(rm.id, rc.id, rand(postTitles), rand(postContents));
  }

  // 댓글 (400개)
  const allBoards = db.prepare('SELECT id FROM board').all();
  const insertReview = db.prepare(`
    INSERT INTO review (board_id, member_id, content, rating, is_anonymous)
    VALUES (?, ?, ?, ?, ?)
  `);
  for (let i = 1; i <= 400; i++) {
    const rb = rand(allBoards);
    const rm = rand(allMembers);
    insertReview.run(rb.id, rm.id, rand(commentContents), Math.floor(Math.random() * 5) + 1, Math.random() > 0.7 ? 1 : 0);
  }

  // 게시글 좋아요 (랜덤 400개)
  const insertBoardLike = db.prepare(`INSERT OR IGNORE INTO board_like (board_id, member_id) VALUES (?, ?)`);
  for (let i = 0; i < 400; i++) {
    const rb = rand(allBoards);
    const rm = rand(allMembers);
    insertBoardLike.run(rb.id, rm.id);
  }

  // 댓글 좋아요 (랜덤 400개)
  const allReviews = db.prepare('SELECT id FROM review').all();
  const insertReviewLike = db.prepare(`INSERT OR IGNORE INTO review_like (review_id, member_id) VALUES (?, ?)`);
  for (let i = 0; i < 400; i++) {
    const rr = rand(allReviews);
    const rm = rand(allMembers);
    insertReviewLike.run(rr.id, rm.id);
  }

  console.log('운영판 목업 데이터 삽입 완료');
}

// ========================
// 대댓글 (400개)
// ========================
function insertMockReplies() {
  const allReviews = db.prepare('SELECT id, board_id FROM review').all();
  const allMembers = db.prepare('SELECT id FROM member').all();
  if (allReviews.length < 5) {
    console.warn('대댓글을 만들 만큼 댓글이 부족합니다.');
    return;
  }
  const insertReply = db.prepare(`
    INSERT INTO review (board_id, member_id, content, rating, is_anonymous, parent_review_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  for (let i = 1; i <= 400; i++) {
    const parent = rand(allReviews);
    const rm = rand(allMembers);
    insertReply.run(parent.board_id, rm.id, rand(replyContents), Math.floor(Math.random() * 5) + 3, Math.random() > 0.5 ? 1 : 0, parent.id);
  }
  console.log('운영판 대댓글 목업 삽입 완료');
}

// ========================
// 데이터 출력 (간단)
// ========================
function showAllData() {
  console.log('\n=== [회원 수] ===', db.prepare('SELECT COUNT(*) as cnt FROM member').get().cnt);
  console.log('=== [게시글 수] ===', db.prepare('SELECT COUNT(*) as cnt FROM board').get().cnt);
  console.log('=== [댓글 수] ===', db.prepare('SELECT COUNT(*) as cnt FROM review').get().cnt);
  console.log('=== [게시글 좋아요 수] ===', db.prepare('SELECT COUNT(*) as cnt FROM board_like').get().cnt);
  console.log('=== [댓글 좋아요 수] ===', db.prepare('SELECT COUNT(*) as cnt FROM review_like').get().cnt);
}

// ========================
// 직접 실행
// ========================
if (require.main === module) {
  resetAllData();
  insertMockData();
  insertMockReplies();
  showAllData();
}

module.exports = { resetAllData, insertMockData, insertMockReplies, showAllData };