import React, { Component, Fragment } from 'react';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  render() {
    return (
      <Fragment>
        <input
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleBtnClick}>提交</button>
        <ul>
          {this.state.list.map((item, index) => {
            return (
              <li key={index} onClick={this.handleItemDelete.bind(this, index)}>
                {item}
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }

  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  handleBtnClick = () => {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    });
  };

  handleItemDelete(index) {
    const list = [...this.state.list];
    list.splice(index, 1);

    this.setState({
      list: list
    });
  }
}

export default TodoList;

