function Member({ name, age, children }) {
  return (
    <>
      <div>
        저는 {name}입니다. 나이는 {age}세입니다.
      </div>
      <div>{children}</div>
    </>
  );
}
export default Member;
