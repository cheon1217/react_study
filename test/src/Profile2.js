import { useLocation } from "react-router-dom";

const Profile2 = () => {
  const params = useLocation();
  return (
    <>
      <div>
        <h1>프로필2</h1>
        <div>params:{params.search}</div>
      </div>
    </>
  );
};
export default Profile2;
