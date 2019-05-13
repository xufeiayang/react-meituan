import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Animate from 'rc-animate'
import './login.scss'
import {saveUserInfo} from '@/store/action'
import {imgUrl} from "../../config/envconfig";


class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      mobile: '',
      verifyCode: '',
      canLogin: false,
      mobileRight: false
    }
  }
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    saveUserInfo: PropTypes.func.isRequired
  }
  componentDidMount () {
    console.log(this);
  }
  verifyInput () {
    if ((/^1(3|4|5|7|8)\d{9}$/.test(this.state.mobile)) && this.state.verifyCode.length === 6 && typeof Number(this.state.verifyCode) === 'number') {
      this.setState({canLogin: true});
    } else {
      this.setState({canLogin: false});
    }
    if (/^1(3|4|5|7|8)\d{9}$/.test(this.state.mobile)) {
      this.setState({mobileRight: true});
    } else {
      this.setState({mobileRight: false});
    }
  }
  handleInput = (type, event) => {
    let value = event.target.value;
    let newState = {};
    newState[type] = value;
    this.setState(newState, () => {
      this.verifyInput();
    });
  }
  login () {
    let userInfo = {
      "userName": this.state.mobile,
      "face": "https://img.meituan.net/avatar/9f1b91422463f22158612db09b4029799451.jpg",
      "couponCount": 0,
      "poiCouponNum": 0,
      "message": "",
      "type": 1,
      "subtyp": 0,
      "close": "",
      "inviteEnvelopeSwitch": true
    }
    this.props.saveUserInfo(userInfo)
    this.props.history.push('/profile');
  }
  render() {
    return (
      <Animate transitionName='fade'>
    <div className="login-container">
      <div className='logo-wrap'>
        <img className='logo' src={imgUrl+'meituan.png'} alt=''/>
        <div className='logo-name'>美团外卖</div>
      </div>
      <div className='input-wrap'>
        <div className='phone'>
          <input maxLength='11' placeholder='请输入手机号' value={this.state.mobile} onChange={this.handleInput.bind(this, 'mobile')}/>
          <div className={`phone-btn ${this.state.mobileRight ? 'active-mes' : 'disable' }`}>发送验证码</div>
        </div>
        <div className='phone mes-code'>
          <input maxLength='6' placeholder='请输入短信验证码' value={this.state.verifyCode} onChange={this.handleInput.bind(this, 'verifyCode')}/>
        </div>
        <button className={this.state.canLogin ? 'active' : 'disable'} onClick={this.login.bind(this)}>登录</button>
        <div className='a-wrap'>
          <a href="//i.waimai.meituan.com/node/account/agreement">查看美团协议与说明</a>
        </div>
      </div>
    </div>
    </Animate>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserInfo: (userInfo) => dispatch(saveUserInfo(userInfo))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
