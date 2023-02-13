import { useGetPostDetailQuery } from "../redux/api/postApi";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { Tags } from "./Posts";
import UserImage from "../components/UserImage";
import { Link } from "react-router-dom";

export const CommentListing = ({ comments }) => {
  const output = comments.map((item, index) => (
    <div className="flex mb-3" key={index}>
      <Link to={`/user/${item.user.id}`}>
        <UserImage userId={item.user.id} styleClass="h-12" />
      </Link>

      <div>
        <div className="bg-light rounded-3 px-3 py-1">
          <Link to={`/user/${item.user.id}`} className="underline">
            <strong>{item.user.username}</strong>
          </Link>

          <p className="text-muted d-block">
            <small>{item.body}</small>
          </p>
        </div>
      </div>
    </div>
  ));
  return output;
};

export const PostContent = ({ post }) => {
  return (
    <>
      <section className="rounded-lg shadow-lg p-5 border border-slate-300">
        <div className="">
          <div className="mb-10">
            <div className="flex mb-2">
              <Link to={`/user/${post.userId}`}>
                <UserImage userId={post.userId} styleClass="h-12 mr-2" />
              </Link>

              <div>
                <Link
                  to={`/user/${post.userId}`}
                  className="text-bold underline"
                >
                  <strong>{post.username}</strong>
                </Link>

                <p className="text-muted d-block">
                  <small>
                    <Tags tags={post.tags} />
                  </small>
                </p>
              </div>
            </div>

            <div>
              <p>{post.body}</p>
            </div>
          </div>
          <div>
            <div className="mb-3">
              <span className="text-gray-600">
                {`${post.comments.length} comments`}
              </span>
            </div>
            <CommentListing comments={post.comments} />
          </div>
        </div>
      </section>
    </>
  );
};

const PostDetail = () => {
  const { postId } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetPostDetailQuery(postId);

  let content = "";

  if (isSuccess) {
    content = <PostContent post={data} />;
  } else if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return content;
};

export default PostDetail;
