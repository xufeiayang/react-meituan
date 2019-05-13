import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Footer from '@/components/footer/footer'
import AlertTip from '@/components/alert_tip/alert_tip'
import { is, fromJS } from 'immutable';  // 保证数据的不可变
import QueueAnim from 'rc-queue-anim'
import {saveUserInfo} from '@/store/action'
import './profile.scss'
import {imgUrl} from "../../config/envconfig";
import {userInfo} from "../../assets/data/data";
import { Modal } from 'antd';
const confirm = Modal.confirm;

class Profile extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    saveUserInfo: PropTypes.func.isRequired,
  }
  state = {
    userInfo: this.props.userInfo || userInfo,
    hasAlert: '',   // tip是否显示
    alertText: '请在手机APP中打开',
    myList: ['美团红包', '收货地址', '常见问题', '美团协议与说明', '退出登录']
  }
  handleClick = (index) =>{
    let alertText
    switch (index){
      case 4:
        this.showConfirm();
        return;
      default:
        alertText = '功能尚未开发'

    }
    this.setState({
      hasAlert: !this.state.hasAlert,
      alertText,
    })
  }
  goBack = () => {
    this.props.history.goBack()
  }
  showConfirm = () => {
    confirm({
      title: '确认要退出登陆吗？',
      onOk: ()=> {
        this.props.history.push('/login');
      },
      width: 250,
      okText: '确定',
      cancelText: '取消',
      centered: 'true',
      onCancel() {},
    });
  }
  componentDidMount () {
    if (!this.props.userInfo.userName) {
      this.setState({userInfo: userInfo});
    }
  }
  componentWillReceiveProps(nextProps){  // 属性props改变时候触发
    if(!is(fromJS(this.props.proData), fromJS(nextProps.proData))){   //
      this.initData(nextProps);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }
  render () {
    return (
      <div className='profile-container'>
      <QueueAnim type='bottom'>
        <section  key='s1'>
          <section className='profile-info'>
            <img className='face' src={this.state.userInfo.face} alt=''/>
            <div className='name'>{this.state.userInfo.userName}</div>
          </section>
          <section className='profile-list'>
            <QueueAnim deley='0.4'>
              {this.state.myList.map((item, index) => {
                return <div className='myorder' onClick={this.handleClick.bind(this, index)} key={item}>
                  <img className='my-img' src={`${imgUrl}my${index+1}.png`} alt=''/>
                  <div className='myorder-text'>
                    <span>{item}</span>
                    <div className='icon-arrow-right'></div>
                  </div>
                </div>
              })}
          </QueueAnim>
          </section>
        </section>
        <section className='phone-num'>
          <p>客服电话：10109777</p>
          <a href="tel:10109777"> </a>
        </section>
        <section className='time'>
          <p>服务时间：9:00-23:00</p>
        </section>
        <Footer key='s2'/>
        </QueueAnim>
      {this.state.hasAlert&&<AlertTip logout={()=> {return false}}  closeTip={this.handleClick} alertText={this.state.alertText}/>}
      </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Profile)
