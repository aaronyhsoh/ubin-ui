import React from 'react';

class Toggle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <a className="language-dropdown text-white text-uppercase" href="" onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

export default Toggle;
