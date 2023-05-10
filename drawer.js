import React from "react"
import Home from "../screens/home"
import Profile from "../screens/profile"
import Logout from '../screens/logout'
import CustomSidebarMenu from "../screens/customSideBar";

import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer=createDrawerNavigator()

export default class DrawerNavigator extends React.Component{
  render(){
    return(
      <Drawer.Navigator
        drawerContent={props => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen name='Home' component={Home}/>
        <Drawer.Screen name='Profile' component={Profile}/>
        <Drawer.Screen name='Logout' component={Logout}/>
      </Drawer.Navigator> 
    )
  }

}

