import { useGetAllPostsQuery } from "../redux/api/postApi";
import { useGetCommentByPostIdQuery } from "../redux/api/commentApi";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../components/Pagination";
import { useState } from "react";
import Spinner from "../components/Spinner";
import UserImage from "../components/UserImage";

export const CommentCount = ({ postId }) => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetCommentByPostIdQuery(postId);

  if (isLoading) return <span className="spinner-border-sm"></span>;
  else if (isSuccess) return data.comments.length;
};

export const Tags = ({ tags }) =>
  tags.map((item, index) => (
    <span
      className={"badge bg-secondary " + (index === 0 ? "" : "mx-1")}
      key={index}
    >
      {item}
    </span>
  ));

export const PostItem = ({ posts }) => {
  const postItemContent = posts.map((item, index) => {
    const mapOutput = (
      <tr key={index}>
        <td className="text-nowrap">
          <Link to={`/user/${item.userId}`}>
            <UserImage userId={item.userId} />
          </Link>
        </td>
        <td className="text-start">
          <Link to={`/post/${item.id}`} className="font-weight-bold blue-text">
            {item.title}
          </Link>

          <div className="my-2">
            <span>{item.body.substring(0, 100).concat("...")}</span>
            <div>
              <Tags tags={item.tags} />
            </div>
          </div>
        </td>
        <td>
          <div className="text-dark">
            <span>
              <CommentCount postId={item.id} />
            </span>{" "}
            <FontAwesomeIcon icon={["fas", "fa-comments"]} className="ml-1" />
          </div>
        </td>
      </tr>
    );
    return mapOutput;
  });

  return postItemContent;
};

export const PostListing = ({ posts, itemsPerPage = 7 }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentPageData = posts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(posts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="card d-flex">
        <div className="card-body">
          <table className="table-responsive"></table>
          <table className="table table-hover table-forum text-center">
            <thead>
              <tr>
                <th></th>
                <th className="text-left">Topic</th>
                <th>Comments</th>
              </tr>
            </thead>

            <tbody>
              <PostItem posts={currentPageData} />
            </tbody>
          </table>
        </div>
      </div>

      {pageCount === 1 ? (
        <span></span>
      ) : (
        <div className="d-flex justify-content-center">
          <nav className="my-2 pt-2">
            <Pagination
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
          </nav>
        </div>
      )}
    </>
  );
};

const Posts = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetAllPostsQuery(50);

  let content = "";

  if (isSuccess) {
    content = (
      <>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <p>{error.toString()}</p>
        ) : (
          <PostListing posts={data.posts} />
        )}
      </>
    );
  } else if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return content;
};

export default Posts;
