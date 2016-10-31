import React, { PropTypes } from 'react'

const Users = ({users}) => (
  <ul>
    {users.map((user, i) =>
      <li key={i}>{user.first} {user.last} - {user.phone}</li>
    )}
  </ul>
)

Users.propTypes = {
  users: PropTypes.array.isRequired
}

export default Users
