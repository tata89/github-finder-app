import React from "react";
import UserItems from "./UserItems";
import Spinner from "../Layout/Spinner";
const Users = ({ user, loading }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={user_Style}>
        {user.map((user_data) => (
          <UserItems key={user_data.id} user={user_data} />
        ))}
      </div>
    );
  }
};
const user_Style = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};
export default Users;
