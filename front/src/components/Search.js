import React, { PropTypes } from 'react'

const Search = ({ value, onChange, options }) => (
  <span>
    <input onChange={e => onChange(e.target.value)}
            value={value}>
    </input>
  </span>
)

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Search
