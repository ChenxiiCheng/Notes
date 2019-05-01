//创建store和reducer初始化

//store文件夹下index.js中：
import { creatStore } from 'redux';
import reducer from './reducer';

const store = creatStore(reducer);

export default store;


//reducer.js
const defaultState = {};

export default (state=defaultState, action) => {
  return state;
};