import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';


class SearchIcon extends Component {
  render() {
    return (
      <Icon name='search' onClick={(e) => this.props.handleClick(e)} link/>
    )
  }
}

export default SearchIcon;