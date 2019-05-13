import React, {Component} from 'react'
import './header.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { is, fromJS } from 'immutable';
import {Icon} from "antd";

class Header extends Component {
  static propTypes = {
    signUp: PropTypes.bool,
    edit: PropTypes.func,
    userInfo: PropTypes.object.isRequired,
  }
  state = {
    latitude: '31.228768', // 纬度
    longitude: '121.346026',
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>{
        this.setState(
            {
              latitude: position.coords.latitude, // 纬度
              longitude: position.coords.longitude,
            }
        )
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }
  render () {
    return (
      <header className="header-container">
        <div className='location'>
          <Icon className='font' type="environment"/>
          <div className='locate font'>上海国际博览中心</div>
          <span className='font icon-arrow-right'></span>
        </div>
        <div className='search'>
          <Icon className='search-icon' type='search'/>
          <span className='search-icon'>请输入商家或商品名称</span>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps,{})(Header)
