export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SELECT_USER = 'SELECT_USER'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const selectReddit = reddit => ({
  type: SELECT_USER,
  reddit
})

export const invalidateReddit = reddit => ({
  type: INVALIDATE_REDDIT,
  reddit
})

export const requestUsers = reddit => ({
  type: REQUEST_USERS,
  reddit
})

export const receiveUsers = (reddit, json) => ({
  type: RECEIVE_USERS,
  reddit,
  users: json,
  receivedAt: Date.now()
})

const fetchUsers = reddit => dispatch => {
  dispatch(requestUsers(reddit))
  if(reddit === ''){
    return fetch(`http://localhost:8000/users/`)
      .then(response => response.json())
      .then(json => dispatch(receiveUsers(reddit, json)))
  }else{
    return fetch(`http://localhost:8000/user/search/${reddit}`)
      .then(response => response.json())
      .then(json => dispatch(receiveUsers(reddit, json)))
  }
}

const shouldFetchUsers = (state, reddit) => {
  const users = state.usersByReddit[reddit]
  if (!users) {
    return true
  }
  if (users.isFetching) {
    return false
  }
  return users.didInvalidate
}

export const fetchUsersIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchUsers(getState(), reddit)) {
    return dispatch(fetchUsers(reddit))
  }
}
