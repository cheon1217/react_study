import { useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();
  return (
    <>
      <div>
        <h1>프로필</h1>
        <div>params:{params.name}</div>
      </div>
    </>
  );
};
export default Profile;
