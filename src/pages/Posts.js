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
      className={
        "bg-gray-600 text-white text-xs font-bold px-2 py-1 mr-2 rounded-lg"
      }
      key={index}
    >
      {item}
    </span>
  ));

export const PostItem = ({ posts }) => {
  const postItemContent = posts.map((item, index) => {
    const mapOutput = (
      <tr key={index} className="border-b">
        <td className="py-3">
          <Link to={`/user/${item.userId}`}>
            <UserImage userId={item.userId} styleClass={"w-20 mr-2"} />
          </Link>
        </td>
        <td className="text-start py-3">
          <Link
            to={`/post/${item.id}`}
            className="font-semibold text-blue-800 underline"
          >
            {item.title}
          </Link>

          <div className="">
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
      <div>
        <div className="card">
          <table className="text-center">
            <thead className="border-b">
              <tr>
                <th className="py-3"></th>
                <th className="py-3">Topic</th>
                <th className="py-3">Comments</th>
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
        <div className="flex justify-center">
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
