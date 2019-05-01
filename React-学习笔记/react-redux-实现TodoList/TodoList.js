import React, { Component } from 'react';
import { connect } from 'react-redux';

class TodoList extends Component {
  render() {
    return (
      <div>
        <div>
          <input
            type="text"
            value={this.props.inputValue}
            onChange={this.props.changeInputValue}
          />
          <button>提交</button>
          <ul>
            <li>Dell</li>
          </ul>
        </div>
      </div>
    );
  }
}

//把store里的数据映射到组件的props里
const mapStateToProps = state => {
  return {
    inputValue: state.inputValue
  };
};

//store.dispatch, props
const mapDispatchToProps = dispatch => {
  return {
    changeInputValue(e) {
      const action = {
        type: 'change_input_value',
        value: e.target.value
      };
      // console.log(e.target.value);
      dispatch(action);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
