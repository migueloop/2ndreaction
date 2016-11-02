import { combineReducers } from 'redux'
import {
  SEARCH_USER, INVALIDATE_REDDIT,
  REQUEST_USERS, RECEIVE_USERS
} from '../actions'

const searchText = (state = '', action) => {
  switch (action.type) {
    case SEARCH_USER:
      return action.searchText
    default:
      return state
  }
}

const users = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_USERS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_USERS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.users,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const usersByReddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_USERS:
    case REQUEST_USERS:
      return {
        ...state,
        [action.searchText]: users(state[action.searchText], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  usersByReddit,
  searchText
})

export default rootReducer
