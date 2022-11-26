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
        <section style={{ backgroundColor: "#eee" }}>
          <div className="container-fluid py-5">
            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img
                      src={data.image}
                      alt={data.username}
                      className="rounded-circle img-fluid"
                      style={{ width: "150px" }}
                    />
                    <h5 className="my-3">{data.username}</h5>
                    <p className="text-muted mb-1">{data.company.title}</p>
                    <p className="text-muted mb-4">{`${data.address.city}, ${data.address.state}`}</p>
                  </div>
                </div>
                <div className="card mb-4 mb-lg-0">
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush rounded-3">
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <FontAwesomeIcon icon={["fas", "fa-droplet"]} />
                        <p className="mb-0">{data.bloodGroup}</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <FontAwesomeIcon icon={["fas", "fa-ruler-vertical"]} />
                        <p className="mb-0">{data.height} cm</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <FontAwesomeIcon icon={["fas", "fa-weight-scale"]} />
                        <p className="mb-0">{data.weight} kg</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <FontAwesomeIcon icon={["fas", "fa-eye"]} />
                        <p className="mb-0">{data.eyeColor}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Full Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{`${data.firstName} ${data.lastName}`}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{data.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Phone</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{data.phone}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Address</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {`${data.address.address}, ${data.address.city}, ${data.address.state}`}
                        </p>
                      </div>
                    </div>

                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Gender</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{data.gender}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="card mb-4 mb-md-0">
                      <div className="card-body">
                        <p className="mb-4">Posts History</p>
                        <UserPosts userId={data.id} />
                      </div>
                    </div>
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
