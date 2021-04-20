import React,{useState} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import OrgLogin from "../screens/Login";
import Landing from "../screens/Landing";
import AdminPanel from "../screens/AdminPanel";
import UserInfo from "../screens/userInfo";
import ProtectedRoute from "./Protectedroute";



const AppRouting = () => {
  return (
    <BrowserRouter >
    <Switch>
    <Route path="/" exact component={Landing} />
        <Route path="/login" component={OrgLogin} />
        <ProtectedRoute  path="/admin" component={AdminPanel} />
        <ProtectedRoute  path="/users" component={UserInfo} />

       
        
    </Switch>
    </BrowserRouter>
  );
};

export default AppRouting;


