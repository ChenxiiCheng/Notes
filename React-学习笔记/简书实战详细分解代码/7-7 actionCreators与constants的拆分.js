//actionCreators与constants的拆分
在header/store下新建actionCreator.js，我们把action定义在这个文件夹里
import * as constants from './constants';

export const searchFocus = () => ({
  type: constants.SEARCH_FOCUS
});

export const searchBlur = () => ({
  type: constants.SEARCH_BLUR
});

--------------------------------------------------------------

我们把需要type定义成常量，在header/store下新建constants.js:
export const SEARCH_FOCUS = 'header/SEARCH_FOCUS';
export const SEARCH_BLUR = 'header/SEARCH_BLUR';

--------------------------------------------------------------

我们把store下的东西都在header/store/index.js中暴露出去，这样其他文件导入store下需要的东西时，路径就比较简洁
store/index.js:

import reducer from './reducer';
import * as actionCreators from './actionCreators';
import * as constants from './constants';

export { reducer, actionCreators, constants };

--------------------------------------------------------------

header/index.js中修改action这部分写法：
import { actionCreators } from './store';

const mapDispatchToProps = dispatch => {
  return {
    handleInputFocus() {
      //简写版本：dispatch(actionCreators.searchFocus())
      const action = actionCreators.searchFocus();
      dispatch(action);
    },

    handleInputBlur() {
      //简写版本:dispatch(actionCreators.searchBlur())
      const action = actionCreators.searchBlur();
      dispatch(action);
    }
  };
};

--------------------------------------------------------------

在header/store/reducer.js中也需要修改（因为type改写了）
import * as constants from './constants';
export default (state = defaultState, action) => {
  if (action.type === constants.SEARCH_FOCUS) {
    return {
      focused: true
    };
  }

  if (action.type === constants.SEARCH_BLUR) {
    return {
      focused: false
    };
  }
  return state;
};




