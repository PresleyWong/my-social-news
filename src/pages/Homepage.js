import { PostListing } from "./Posts";
import { useGetAllPostsQuery } from "../redux/api/postApi";
import Spinner from "../components/Spinner";

const Homepage = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetAllPostsQuery(7);

  let content = "";

  if (isSuccess) {
    content = <PostListing posts={data.posts} />;
  } else if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return content;
};

export default Homepage;
