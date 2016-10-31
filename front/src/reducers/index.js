import { combineReducers } from 'redux'
import {
  SELECT_USER, INVALIDATE_REDDIT,
  REQUEST_USERS, RECEIVE_USERS
} from '../actions'

const selectedReddit = (state = '', action) => {
  switch (action.type) {
    case SELECT_USER:
      return action.reddit
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
        [action.reddit]: users(state[action.reddit], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  usersByReddit,
  selectedReddit
})

export default rootReducer
