import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useGetUserDetailQuery } from "../redux/api/userApi";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserPosts } from "./UserProfile";

const Dashboard = () => {
  const currentUser = useSelector(selectCurrentUser);

  const { data, isLoading, isSuccess, isError, error } = useGetUserDetailQuery(
    currentUser.id
  );

  let content = "";

  if (isSuccess) {
    content = (
      <>
        <section>
          <div className="">
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

                <div className="card mb-4">
                  <div className="card-body p-0">
                    <ul>
                      <li className="flex justify-between p-3 border-b">
                        <FontAwesomeIcon icon={["fas", "fa-droplet"]} />
                        <p className="text-gray-500">{data.bloodGroup}</p>
                      </li>
                      <li className="flex justify-between p-3 border-b">
                        <FontAwesomeIcon icon={["fas", "fa-ruler-vertical"]} />
                        <p className="text-gray-500">{data.height} cm</p>
                      </li>
                      <li className="flex justify-between p-3 border-b">
                        <FontAwesomeIcon icon={["fas", "fa-weight-scale"]} />
                        <p className="text-gray-500">{data.weight} kg</p>
                      </li>
                      <li className="flex justify-between p-3 border-b">
                        <FontAwesomeIcon icon={["fas", "fa-eye"]} />
                        <p className="text-gray-500">{data.eyeColor}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-span-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="flex justify-between p-3">
                      <div>
                        <p>Full Name</p>
                      </div>
                      <div>
                        <p className="text-gray-500">{`${data.firstName} ${data.lastName}`}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="flex justify-between p-3">
                      <div>
                        <p>Email</p>
                      </div>
                      <div>
                        <p className="text-gray-500">{data.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="flex justify-between p-3">
                      <div>
                        <p>Phone</p>
                      </div>
                      <div>
                        <p className="text-gray-500">{data.phone}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="flex justify-between p-3">
                      <div>
                        <p>Address</p>
                      </div>
                      <div>
                        <p className="text-gray-500">
                          {`${data.address.address}, ${data.address.city}, ${data.address.state}`}
                        </p>
                      </div>
                    </div>

                    <hr />
                    <div className="flex justify-between p-3">
                      <div className="col-sm-3">
                        <p className="mb-0">Gender</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-gray-500">{data.gender}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div className="card mb-4">
                      <div className="card-body">
                        <p className="my-4">Posts History</p>
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

export default Dashboard;
