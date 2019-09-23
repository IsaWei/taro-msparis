import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import {AtButton, AtInput, AtForm, AtMessage, AtModal, AtModalHeader, AtModalContent, AtModalAction} from 'taro-ui'
import './index.scss';
import {clearStorageAndCookies} from '../utils'


@connect(({login}) => ({
  ...login,
}))
export default class Login extends Component {

  constructor(props) {
    super(...arguments)
    this.state = {
      username: 'admin',
      password: 'test',
      isOpened: false
    }
  }

  config = {
    navigationBarTitleText: 'login',
  };

  componentDidMount = () => {
    clearStorageAndCookies()
    this.setState({isOpened: false})
    Taro.setNavigationBarTitle({title: '微信小程序登录页'})
  };

  onSubmit = () => {
    let {username, password} = this.state
    this.props.dispatch({
      type: 'login/accountLogin',
      payload: {username, password},
      callback: (response) => {
        Taro.atMessage({
          'message': '登陆成功',
          'type': 'success',
        })
        setTimeout(() => {
          Taro.navigateTo({url: '/pages/study/index'})
        }, 1000)

      }
    });
  }
  onReset = () => {
    this.state = {
      username: '',
      password: '',
      isOpened: false
    }
  }
  handleChange = (value1, key) => {
    this.setState({[key]: value1})
    return value1
  }

  handleCloseModal = () => {
    this.setState({isOpened: false})
  }

  render() {
    const {username, password, isOpened} = this.state
    const TARO_ENV = process.env.TARO_ENV
    return (
      <View className="login-page">
        <AtMessage/>
        <AtModal
          isOpened={isOpened}
          title='标题'
          cancelText='取消'
          confirmText='确认'
          onClose={this.handleCloseModal}
          onCancel={this.handleCloseModal}
          onConfirm={this.handleCloseModal}
          content={`openBluetoothAdapter：`}
        />
        <View className='at-article__h1 center_title'>
          用户登陆({TARO_ENV})
        </View>
        <AtForm className='login_form'
                onSubmit={this.onSubmit.bind(this)}
                onReset={this.onReset.bind(this)}>
          <AtInput
            name='username'
            title='用户名'
            type='text'
            placeholder='请输入用户名'
            value={username}
            onChange={(value) => this.handleChange(value, 'username')}
          />
          <AtInput
            name='password'
            title='密码'
            type='password'
            placeholder='请输入密码'
            value={password}
            onChange={(value) => this.handleChange(value, 'password')}
          />
          <AtButton formType='submit' onClick={this.onSubmit.bind(this)} type='primary' circle
                    className='submitBtn'>提交</AtButton>
          <AtButton formType='reset' type='secondary' circle className='submitBtn'>重置</AtButton>
        </AtForm>
      </View>
    )
  }
}
