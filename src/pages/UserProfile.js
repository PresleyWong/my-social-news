import { useParams } from "react-router-dom";
import { useGetUserDetailQuery } from "../redux/api/userApi";
import { useGetPostByUserIdQuery } from "../redux/api/postApi";
import Spinner from "../components/Spinner";
import { PostListing } from "./Posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UserPosts = ({ userId }) => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetPostByUserIdQuery(userId);

  let content = <Spinner />;
  if (isSuccess) {
    if (data.posts.length > 0)
      content = <PostListing posts={data.posts.slice(0, 10)} />;
    else content = <p>There's nothing here...</p>;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return content;
};

const UserProfile = () => {
  const { userId } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetUserDetailQuery(userId);

  let content = "";

  if (isSuccess) {
    content = (
      <>
        <section>
          <div>
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img
                      className="rounded-full"
                      src={data.image}
                      alt={data.username}
                    />

                    <h5 className="my-3 font-bold">{data.username}</h5>
                    <p className="text-gray-500 mb-1">{data.company.title}</p>
                    <p className="text-gray-500 mb-4">{`${data.address.city}, ${data.address.state}`}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-8">
                <div className="card mb-4">
                  <div className="card-body py-4">
                    <p className="mb-4">Posts History</p>
                    <UserPosts userId={data.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  } else if (isLoading) {
    content = <Spinner />;
  }

  return content;
};

export default UserProfile;
