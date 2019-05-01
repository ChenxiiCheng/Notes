//动画react-transition-group

//App.js
import React, { Component, Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  render() {
    return (
      <Fragment>
        <CSSTransition
          in={this.state.show}
          timeout={1000}
          classNames="fade"
          unmountOnExit
          onEntered={el => {
            el.style.color = 'blue';
          }}
          appear={true}
        >
          <div>hello</div>
        </CSSTransition>
        <button onClick={this.handleToggle}>toggle</button>
      </Fragment>
    );
  }

  handleToggle() {
    this.setState({
      show: this.state.show ? false : true
    });
  }
}

export default App;







//style.css
.fade-enterm .fade-appear {
  opacity: 0;
}

.fade-enter-active,
.fade-appear-active {
  opacity: 1;
  transition: opacity 1s ease-in;
}

.fade-enter-done {
  opacity: 1;
}

.fade-exit {
  opacity: 1;
}

.fade-exit-active {
  opacity: 0;
  transition: opacity 1s ease-in;
}

.fade-exit-done {
  opacity: 0;
}

