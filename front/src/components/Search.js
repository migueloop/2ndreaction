import React, { PropTypes } from 'react'
import { Input } from 'react-bootstrap';

const Search = ({ value, onChange, options }) => (
  <div className="row">
      <div className="col-xs-12">
          <div className="input-group c-search">
                  <input className="form-control" type="text" onChange={e => onChange(e.target.value)}
                          value={value}>
                  </input>
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button">
                      <span className="glyphicon glyphicon-search text-muted"></span>
                    </button>
                  </span>
          </div>
      </div>
  </div>
)

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Search
