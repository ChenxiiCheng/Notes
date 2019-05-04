//异步获取数据

1.(1)在index.js中：
componentDidMount() {
  this.props.getDetail();
}

const mapDispatch = dispatch => ({
  getDetail() {
    dispatch(actionCreators.getDetail());
  }
});


(2)在actionCreators.js中：
import axios from 'axios';
import * as constants from './constants';

const changeDetail = (title, content) => ({
  type: constants.CHANGE_DETAIL,
  title,
  content
});

export const getDetail = () => {
  return dispatch => {
    axios.get('/api/detail.json').then(res => {
      const result = res.data.data;
      console.log(result);
      dispatch(changeDetail(result.title, result.content));
    });
  };
};


(3)在constants.js中：
export const CHANGE_DETAIL = 'detail/CHANGE_DETAIL';


(4)在reducer.js中：
export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_DETAIL:
      return state.merge({
        title: fromJS(action.title),
        content: fromJS(action.content)
      });
    default:
      return state;
  }
};



















