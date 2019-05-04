// react-transition-group实现动画效果
我们在想设置动画的组件外面包裹<CSSTransition>
import { CSSTransition } from 'react-transition-group';

<CSSTransition
  timeout={200}    //设置动画时长
  in={this.state.focused}   //当focused值为true，动画in
  classNames="slide"   //注意这个自己命名，后面写css要以这个slide开头
>
  <NavSearch
    className={this.state.focused ? 'focused' : ''}
    onFocus={this.handleInputFocus}
    onBlur={this.handleInputBlur}
  />
</CSSTransition>




//style.js中：【.slide-enter, .slide-enter-active, .slide-exit, .slide-exit-active】
export const SearchWrapper = styled.div`
  position: relative;
  float: left;

  .slide-enter {
    width: 160px;
    transition: all 0.2s ease-out;
  }
  .slide-enter-active {
    width: 240px;
  }
  .slide-exit {
    transition: all 0.2s ease-out;
  }
  .slide-exit-active {
    width: 160px;
  }


或者放到Navsearch中：
export const NavSearch = styled.input.attrs({
  placeholder: '搜索'
})`
  &.slide-enter {
    width: 160px;
    transition: all 0.2s ease-out;
  }
  &.slide-enter-active {
    width: 240px;
  }
  &.slide-exit {
    transition: all 0.2s ease-out;
  }
  &.slide-exit-active {
    width: 160px;
  }`