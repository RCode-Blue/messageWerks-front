import React from "react";

import UserDetails from "./UserDetails";

const UsersList = (props) => {
  const { props: users } = props;
  // console.log("users: ", users);
  return (
    <div>
      {users.map((user) => {
        return <UserDetails props={user} key={user.uuid} />;
      })}
    </div>
  );
};

export default UsersList;
