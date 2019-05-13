import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick'; // 延迟300ms再响应点击，目的是在移动端设备上检测用户是否在做双击
import Route from './router'
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'
import store from '@/store'
import * as serviceWorker from './serviceWorker';
import './config/rem'
import './style/base.scss'
import "antd/dist/antd.css";
FastClick.attach(document.body)

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component/>
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  )
}

render(Route)


serviceWorker.unregister();
