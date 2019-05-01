//TodoList.js

import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import './style.css';
import axios from 'axios';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }

  render() {
    return (
      <Fragment>
        <label htmlFor="insertArea">输入内容</label>
        <input
          id="insertArea"
          className="input"
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          // ref={input => {
          //   this.input = input;}}
        />
        <button onClick={this.handleBtnClick}>Submit</button>
        <ul>{this.getTodoItem()}</ul>
      </Fragment>
    );
  }

  componentDidMount() {
    axios
      .get('/api/todolist')
      .then(res => {
        this.setState(() => ({
          list: [...res.data]
        }));
      })
      .catch(() => {
        alert('error');
      });
  }

  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <TodoItem
          key={index}
          content={item}
          index={index}
          deleteItem={this.handleItemDelete}
        />
      );
    });
  }

  handleInputChange(e) {
    const value = e.target.value;
    this.setState(() => ({
      inputValue: value
    }));
    // this.setState({
    //   inputValue: e.target.value
    // });
  }

  handleBtnClick() {
    this.setState(prevState => ({
      list: [...prevState.list, this.state.inputValue],
      inputValue: ''
    }));
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // });
  }

  handleItemDelete(index) {
    this.setState(prevState => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return { list };
    });
    // this.setState({
    //   list: list
    // });
  }
}

export default TodoList;




// TodoItem.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextSatet) {
    if (nextProps.content !== this.props.content) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { content } = this.props;
    return <div onClick={this.handleClick}>{content}</div>;
  }

  handleClick() {
    const { deleteItem, index } = this.props;
    deleteItem(index);
  }
}

TodoItem.propTypes = {
  test: PropTypes.string,
  content: PropTypes.string,
  deleteItem: PropTypes.func,
  index: PropTypes.number
};

export default TodoItem;

