import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import {AtButton} from 'taro-ui'
import './index.scss';

@connect(({home}) => ({
  ...home,
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'home/load',
    });
  };

  handleToLogin = () => {
    Taro.navigateTo({url:'/pages/login/index'})
  }


  render() {
    return (
      <View className="home-page">
        {this.props.title}
        <AtButton onClick={this.handleToLogin}>跳转登录页</AtButton>
      </View>
    )
  }
}

