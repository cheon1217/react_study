import Member from "./Member";

function Greet() {
  console.log("greet");
  return (
    <>
      <div>
        안녕하세요
        <Member name="이순신" age="10">
          반갑습니다.
        </Member>
      </div>
    </>
  );
}
export default Greet;
