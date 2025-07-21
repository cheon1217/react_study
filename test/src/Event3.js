function Event3() {
  const onClick = (e) => {
    const { isTrusted, target, bubbles } = e;
    console.log("클릭 이벤트 : ", isTrusted, target, bubbles);
  };
  const onClick2 = (e) => {
    const { isTrusted, target, bubbles, currentTarget } = e;
    console.log("클릭 이벤트 : ", isTrusted, target, bubbles, currentTarget);
  };
  return (
    <>
      <div onClick={onClick2}>
        <div onClick={onClick}>클릭3</div>
      </div>
    </>
  );
}
export default Event3;
