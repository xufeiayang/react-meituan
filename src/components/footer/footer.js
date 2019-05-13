import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './footer.scss'
import '../../assets/iconfont/iconfont.js';
import {Icon} from "antd";

class Footer extends Component {
  render () {
    return (
      <section className='footer-container'>
        <NavLink className='guide-item' to='/msite'>
          <Icon className='icon icon-style icon-home' type="home" />
          <span>首页</span>
        </NavLink>
        <NavLink className='guide-item' to='/order'>
          <div className='icon-dingdan icon icon-style'></div>
          <span>订单</span>
        </NavLink>
        <NavLink className='guide-item' to='/profile'>
          <div className='icon-account icon icon-style'></div>
          <span>我的</span>
        </NavLink>
      </section>
    )
  }
}

export default Footer
