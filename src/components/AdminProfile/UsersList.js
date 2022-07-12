import React from "react";

import UserName from "./UserName";

const UsersList = (props) => {
  const { props: users } = props;
  return (
    <div className="section-detail-wrapper">
      {users.map((user) => {
        return <UserName props={user} key={user.uuid} />;
      })}
    </div>
  );
};

export default UsersList;
