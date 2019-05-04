// 详情页面布局

1.在detail文件夹下新建style.js文件
import styled from 'styled-components';

export const DetailWrapper = styled.div`
  overflow: hidden;
  width: 620px;
  margin: 0 auto;
  padding-bottom: 100px;
`;

export const Header = styled.div`
  margin: 50px 0 20px 0;
  line-height: 44px;
  font-size: 34px;
  color: #333;
  font-weight: bold;
`;

export const Content = styled.div`
  color: #2f2f2f;
  img {
    width: 100%;
  }
  p {
    margin: 25px 0;
    font-size: 16px;
    line-height: 30px;
  }
  b {
    font-weight: bold;
  }
`;

=====================================================================

2.detail/index.js中：
import { DetailWrapper, Header, Content } from './style';

class Detail extends Component {
  render() {
    return (
      <DetailWrapper>
        <Header>星星工程师和刷牙机器人</Header>
        <Content>
          <img src="https://s2.ax1x.com/2019/05/04/Eaetn1.jpg" alt="" />
          <p>
            <b>生命固然是脆弱的，但生命也有韧性。</b>
            张书豪几次和死神擦身而过，最终，都凭借顽强的意志救回了自己。也许活着最大的敌人并非存在于外界，而是自己的内心——一颗因畏惧而不敢前行的心。
          </p>
          <p>
            <b>
              当一切都拨云见雾，梅里十三峰也揭开神秘面纱，站在拉萨的最高点，红布飞扬，一切的艰难困苦便都有了意义。
            </b>
          </p>
          <p>
            这一路，他忍受高原反应带来的不适，努力克服险峻山造成的身体与心灵的支离破碎，压抑下同伴因意外事故造成伤残而停下步伐的心酸，与寒风相博，与飞雪相抗，同狼豹相拼。
          </p>
          <p>
            <b>看着苦行僧三跪九拜的朝圣，不禁心生敬佩。</b>
            心中要怀有怎样坚定的信仰，才能拥有如此虔诚而执着的行为。每一个动作和神情都充满了对神明、自然和生命的敬畏和尊重。
          </p>
        </Content>
      </DetailWrapper>
    );
  }
}