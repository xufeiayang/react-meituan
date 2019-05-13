import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { is, fromJS } from 'immutable';  // 保证数据的不可变
import './shop_list.scss';
import {imgUrl} from '../../config/envconfig';
import {shopList} from "../../assets/data/data";

class ShopList extends Component {
  state = {
    shopListArr: shopList  // 商店列表
  }

  shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
    let refresh = !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    if (refresh) {
      this.getShopList(nextProps)
    }
    return refresh
  }
  // 评价星星
  starCount = (rating) => {
    var items = []
    for ( var i = 0; i < Math.ceil(rating);i++){
      items.push(<div className='icon-wuxing' key={i}></div>)
    }
    return items
  }
  // 折扣图标
  discountIcon (discount) {
    if (discount.info.indexOf('减') !== -1) {
      return 'discount1.png';
    }
    if (discount.info.indexOf('折') !== -1) {
      return 'discount2.png';
    }
    if (discount.info.indexOf('票') !== -1) {
      return 'discount3.png';
    }
    if (discount.info.indexOf('返') !== -1) {
      return 'discount4.png';
    }
    return 'discount4.png';
  }
  render () {
    return (
      <div className='shoplist-container'>
        <ul >
          {
            this.state.shopListArr.map((item, index) => {
              return (
              <Link to={'/shop/?shopInfo=' + JSON.stringify(item)} replace className='shop-item' key={item.mtWmPoiId}>
                <img src={imgUrl + item.picUrl} alt=""/>
                <div className='right'>
                  <div className='name'>{item.shopName}</div>
                  <div className='space-between'>
                    <div className='star-num'>
                      {this.starCount(item.wmPoiScore/10)}
                      <span className='font-l ml-20'>{item.wmPoiScore/10}</span>
                      <span className='font-l ml-20'>{item.monthSalesTip}</span>
                    </div>
                    <div className='font-l'>
                      {item.deliveryTimeTip}|{item.distance}
                    </div>
                  </div>
                  <div className='space-between'>
                    <div className='font-l'>
                      {item.minPriceTip} | {item.shippingFeeTip} | {item.averagePriceTip}
                    </div>
                    <div className='delivery'>
                      {item.deliveryType ? <img className='delivery-img' src={imgUrl + 'zhuansong.png'} alt='' /> : ''}
                    </div>
                  </div>
                  {
                    item.discounts2 ? item.discounts2.map((ite, index) => {
                    return (
                        <div className='discount' key={index}>
                          <img className='dis-img' src={imgUrl + this.discountIcon(ite)} alt='' />
                          <span className='font-l'>{ite.info}</span>
                        </div>)
                  }) : ''}
                </div>
              </Link>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default ShopList
