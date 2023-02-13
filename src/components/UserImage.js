import { useGetUserDetailQuery } from "../redux/api/userApi";
import Spinner from "./Spinner";

const UserImage = ({ userId, styleClass }) => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetUserDetailQuery(userId);

  let content = "";

  if (isSuccess) {
    content = (
      <img
        src={data?.image}
        alt={userId}
        className={`border rounded-full ${styleClass}`}
      />
    );
  } else if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return content;
};

export default UserImage;
