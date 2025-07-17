import { Link } from "react-router-dom";

const Main = () => {
  return (
    <>
      <div>
        <h1>Main</h1>
        <a href="/intro">소개</a>
        <Link to="/intro">소개</Link>
        <br />
        <h2>라우터 변수</h2>
        <Link to="/profile/홍길동">홍길동</Link>
        <Link to="/profile/이순신">이순신</Link>
        <h2>파라미터</h2>
        <Link to="/profile2?a=1&b=2&c=3">프로필2</Link>
      </div>
    </>
  );
};
export default Main;
