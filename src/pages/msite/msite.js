import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Header from "@/components/header/header";
import "./msite.scss";
import Footer from '@/components/footer/footer'
import ShopList from '@/components/shop_list/shop_list'
import { is, fromJS } from 'immutable';  // 保证数据的不可变
import "swiper/dist/css/swiper.css";
import {saveAttrInfo} from '@/store/action'
import PropTypes from 'prop-types'
import {imgUrl} from "../../config/envconfig";
import {kingkongList} from "../../assets/data/data";

class Msite extends Component {
  static propTypes = {
    saveAttrInfo: PropTypes.func.isRequired,
  };
  state = {
    footTypes: kingkongList,
  };


  goHome = () => {
    this.props.history.push('/')
  }
  componentDidMount () {
    // this.cityGuess()
  }
  shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
    let refresh = !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    return refresh
  }
  render() {
    return (
      <div className='msite'>
        <Header/>
        <div className='title-wrap'>
          {this.state.footTypes.map((item, index) => {
           return (
               <Link className='title' to='/order' key={item.cateId}>
                 <div className='item'><img className='title-img' src={`${imgUrl}title${index+1}.png`} alt=''/></div>
                 <div className='title-name'>{item.name}</div>
               </Link>)
          })}
        </div>
        <div>
          <div className='nearby'>----附近商家----</div>
          <div className='filter'>
            <span>综合排序</span>
            <span>销量最高</span>
            <span>距离最近</span>
            <span>筛选</span>
          </div>
        </div>
        <ShopList />
        <Footer/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveAttrInfo: (attr, geohash) => dispatch(saveAttrInfo(attr, geohash))
  }
}
export default connect(()=>({}), mapDispatchToProps)(Msite)
