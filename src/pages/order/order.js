import React, {Component} from 'react'
import {connect} from 'react-redux'
import './order.scss'
import {orderList} from "../../assets/data/data";
import Footer from '@/components/footer/footer'
import {imgUrl} from '../../config/envconfig';
class Order extends Component {
  state = {
    orderList: orderList
  };

  render () {
    return (
        <div className='order-wrap'>
          <div className='scroller'>
            {this.state.orderList.map((item) => {
              return (
                  <div className='order' key={item.id}>
                    <div className='item'>
                      <div className='img-name border-b'>
                        <div>
                          <img className='img-icon' src={`${imgUrl}res${Math.ceil(Math.random()*8)}.png`} alt=''/>
                          <div className='title-name'>{item.restaurant_name}</div>
                        </div>
                        <div className='icon-arrow-right'></div>
                      </div>
                      <div className='flex-space'>
                        <div className='food-info'>{item.basket.group[0].map(ite => ite.name).join('')}</div>
                        <span>x{item.basket.group[0].length}</span>
                      </div>
                      <div className='flex-space border-b'>
                        <span className='font-9'>{item.formatted_created_at}</span>
                        <span>实付{item.total_amount}</span>
                      </div>
                      <div className='flex-space'>
                        <span className='font-9'>{item.status_bar.title}</span>
                        <div className='buttons'>
                          <div>删除</div>
                          <div>再来一单</div>
                        </div>
                      </div>
                    </div>
                  </div>
              )
            })}
          </div>
          <Footer/>
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
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Order)
