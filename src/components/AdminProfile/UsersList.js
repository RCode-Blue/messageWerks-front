import React from "react";

const UsersList = (props) => {
  const { props: users } = props;
  console.log("users: ", users);
  return (
    <div>
      <div>User 1</div>
      <div>User 2</div>
      <div>User 3</div>
    </div>
  );
};

export default UsersList;
