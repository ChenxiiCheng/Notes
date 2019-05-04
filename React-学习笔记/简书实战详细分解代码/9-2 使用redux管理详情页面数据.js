//使用redux管理详情页面数据

1.(1)在detail文件夹下新建index.js,constants.js,actionCreators.js,reducer.js
detail/store/index.js是store文件夹下的统一出口
index.js:
import reducer from './reducer';
import * as actionCreators from './actionCreators';
import * as constants from './constants';

export { reducer, actionCreators, constants };


(2)reducer.js:
import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({})

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};


(3)把数据放到reducer.js中 defaultState中：
const defaultState = fromJS({
  title: '星星工程师和刷牙机器人',
  content:
    '<img src="https://s2.ax1x.com/2019/05/04/Eaetn1.jpg" alt=""/><p><b>生命固然是脆弱的，但生命也有韧性。</b>张书豪几次和死神擦身而过，最终，都凭借顽强的意志救回了自己。也许活着最大的敌人并非存在于外界，而是自己的内心——一颗因畏惧而不敢前行的心。</p><p><b>当一切都拨云见雾，梅里十三峰也揭开神秘面纱，站在拉萨的最高点，红布飞扬，一切的艰难困苦便都有了意义。</b></p><p>这一路，他忍受高原反应带来的不适，努力克服险峻山造成的身体与心灵的支离破碎，压抑下同伴因意外事故造成伤残而停下步伐的心酸，与寒风相博，与飞雪相抗，同狼豹相拼。</p><p><b>看着苦行僧三跪九拜的朝圣，不禁心生敬佩。</b>心中要怀有怎样坚定的信仰，才能拥有如此虔诚而执着的行为。每一个动作和神情都充满了对神明、自然和生命的敬畏和尊重。</p>'
});

======================================================================

2.(1)detail/index.js连接到store获取数据
import { connect } from 'react-redux';

const mapState = state => ({
  title: state.getIn(['detail', 'title']),
  content: state.getIn(['detail', 'content'])
});

export default connect(mapState, null)(Detail);


(2)JSX中：
因为content的内容是包含html标签，如果想正常显示html标签的话，需要用
dangerouslySetInnerHTML这个东西！！
<DetailWrapper>
  <Header>{this.props.title}</Header>
  <Content dangerouslySetInnerHTML={{ __html: this.props.content }} />
</DetailWrapper>


























