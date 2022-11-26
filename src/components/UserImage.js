import { useGetUserDetailQuery } from "../redux/api/userApi";

const UserImage = ({ userId, imageHeight = 80, styleClass = null }) => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetUserDetailQuery(userId);

  let content = "";

  if (isSuccess) {
    content = (
      <img
        src={data?.image}
        alt={userId}
        style={{ height: `${imageHeight}px` }}
        className={styleClass}
      />
    );
  } else if (isLoading) {
    content = <span className="spinner-border"></span>;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return content;
};

export default UserImage;
