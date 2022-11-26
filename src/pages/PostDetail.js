import { useGetPostDetailQuery } from "../redux/api/postApi";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { Tags } from "./Posts";
import UserImage from "../components/UserImage";
import { Link } from "react-router-dom";

export const CommentListing = ({ comments }) => {
  const output = comments.map((item, index) => (
    <div className="d-flex mb-3" key={index}>
      <Link to={`/user/${item.user.id}`}>
        <UserImage userId={item.user.id} imageHeight={65} />
      </Link>

      <div>
        <div className="bg-light rounded-3 px-3 py-1">
          <Link to={`/user/${item.user.id}`} className="text-dark mb-0">
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
      <section>
        <div className="card">
          <div className="card-body">
            <div className="d-flex mb-3">
              <Link to={`/user/${post.userId}`}>
                <UserImage
                  userId={post.userId}
                  imageHeight={50}
                  styleClass="border rounded-circle me-2 post-avatar"
                />
              </Link>

              <div>
                <Link to={`/user/${post.userId}`} className="text-dark mb-0">
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
          <div
            className="bg-image hover-overlay ripple rounded-0"
            data-mdb-ripple-color="light"
          >
            <a href="#!">
              <div className="mask"></div>
            </a>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <div>
                <span className="text-muted">
                  {`${post.comments.length} comments`}
                </span>
              </div>
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
