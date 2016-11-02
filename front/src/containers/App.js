import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectReddit, fetchUsersIfNeeded, invalidateReddit } from '../actions'
import Search from '../components/Search'
import Users from '../components/Users'
import s from '../styles/styles.css'
import {Button, Collapse} from 'react-bootstrap'


class App extends Component {
  static propTypes = {
    searchText: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  constructor(...args) {
    super(...args);

    this.state = { showSearchInput : false };
  }

  componentDidMount() {
    const { dispatch, searchText } = this.props
    dispatch(fetchUsersIfNeeded(searchText))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchText !== this.props.searchText) {
      const { dispatch, searchText } = nextProps
      dispatch(fetchUsersIfNeeded(searchText))
    }
  }

  handleChange = nextSearchText => {
      this.props.dispatch(selectReddit(nextSearchText))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, searchText } = this.props
    dispatch(invalidateReddit(searchText))
    dispatch(fetchUsersIfNeeded(searchText))
  }

  render() {
    const { searchText, users, isFetching, lastUpdated } = this.props
    const isEmpty = users.length === 0
    return (
      <div className="container">
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>

          <div className="row">
            <div className="col-xs-12 col-sm-offset-3 col-sm-6">
                <div className="panel panel-default">
                    <div className="panel-heading c-list">
                        <span className="title">Contacts</span>
                        <ul className="pull-right c-controls">
                            <li><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Add Contact"><i className="glyphicon glyphicon-plus"></i></a></li>
                            <li>
                              <a href="#" onClick={ ()=> this.setState({ showSearchInput: !this.state.showSearchInput })}>
                                  <span className="glyphicon glyphicon-option-vertical text-muted"></span>
                              </a>
                            </li>
                        </ul>
                    </div>

                    <Collapse in={this.state.showSearchInput}>
                     <div>
                       <Search value={searchText}
                               onChange={this.handleChange}
                        />
                     </div>
                   </Collapse>
                   {isEmpty
                     ? (isFetching ? <span className="glyphicon glyphicon-refresh spinning"></span>  : <span className='text-center'> No contacts found </span>)
                     : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                            <Users users={users} />
                            </div>
                    }
                    </div>
                </div>
             </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  const { searchText, usersByReddit } = state
  const {
    isFetching,
    lastUpdated,
    items: users
  } = usersByReddit[searchText] || {
    isFetching: true,
    items: []
  }

  return {
    searchText,
    users,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
