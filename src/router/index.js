import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import asyncComponent from '@/utils/asyncComponent'
const login = asyncComponent(() => import("@/pages/login/login"))
const profile = asyncComponent(() => import("@/pages/profile/profile"))
const msite = asyncComponent(() => import("@/pages/msite/msite"))
const shop = asyncComponent(() => import("@/pages/shop/shop"))
const order = asyncComponent(() => import("@/pages/order/order"))

export default class RouteConfig extends Component {
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route path="/msite" component= {msite}/>
          <Route path="/profile" exact component= {profile}/>
          <Route path="/login" component= {login}/>
          <Route path="/shop"  component= {shop}/>
          <Route path="/order" component= {order}/>
          <Redirect exact from='/' to='/profile'/>
          <Route component= {profile}/>
        </Switch>
      </HashRouter>
    )
  }
}
