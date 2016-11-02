import React, { PropTypes } from 'react'
import {Tooltip, ButtonToolbar, OverlayTrigger, Button} from 'react-bootstrap'

const Users = ({users}) => (
    <ul className="list-group" id="contact-list">
      {users.map((user, i) =>
        <li key={i} className="list-group-item">
            <div className="col-xs-12 col-sm-3">
                <img key={i} src={user.picture} alt={user.first} className="img-responsive img-circle"/>
            </div>
            <div className="col-xs-12 col-sm-9">
                <span className="name">{user.first} {user.last}</span><br></br>
                <ButtonToolbar className="hidden-xs">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="phone_tooltip"><strong>{user.phone}</strong></Tooltip>}>
                  <span className="glyphicon glyphicon-earphone text-muted c-info"></span>
                  </OverlayTrigger>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="email_tooltip"><strong>{user.email}</strong></Tooltip>}>
                    <span className="glyphicon glyphicon-envelope text-muted c-info"></span>
                  </OverlayTrigger>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="comments_tooltip"><strong>No comments yet</strong></Tooltip>}>
                    <span className="glyphicon glyphicon-comment text-muted c-info"></span>
                  </OverlayTrigger>
                </ButtonToolbar>
                <div className="visible-xs"> <span className="glyphicon glyphicon-earphone text-muted c-info">  {user.phone}</span><br></br></div>
                <div className="visible-xs"> <span className="glyphicon glyphicon-envelope text-muted c-info">  {user.email}</span><br></br></div>
                <div className="visible-xs"> <span className="glyphicon glyphicon-comment text-muted c-info">  No comments yet</span><br></br></div>
            </div>
            <div className="clearfix"></div>
        </li>
          )}
    </ul>
)

Users.propTypes = {
  users: PropTypes.array.isRequired
}

export default Users
