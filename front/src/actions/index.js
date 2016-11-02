export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SEARCH_USER = 'SEARCH_USER'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const typedSearchText = searchText => ({
  type: SEARCH_USER,
  searchText
})

export const invalidateReddit = searchText => ({
  type: INVALIDATE_REDDIT,
  searchText
})

export const requestUsers = searchText => ({
  type: REQUEST_USERS,
  searchText
})

export const receiveUsers = (searchText, json) => ({
  type: RECEIVE_USERS,
  searchText,
  users: json,
  receivedAt: Date.now()
})

const fetchUsers = searchText => dispatch => {
  dispatch(requestUsers(searchText))
  if(searchText === ''){
    return fetch(`http://localhost:8000/users/`)
      .then(response => response.json())
      .then(json => dispatch(receiveUsers(searchText, json)))
  }else{
    return fetch(`http://localhost:8000/user/search/${searchText}`)
      .then(response => response.json())
      .then(json => dispatch(receiveUsers(searchText, json)))
  }
}

const shouldFetchUsers = (state, searchText) => {
  const users = state.usersByReddit[searchText]
  if (!users) {
    return true
  }
  if (users.isFetching) {
    return false
  }
  return users.didInvalidate
}

export const fetchUsersIfNeeded = searchText => (dispatch, getState) => {
  if (shouldFetchUsers(getState(), searchText)) {
    return dispatch(fetchUsers(searchText))
  }
}
