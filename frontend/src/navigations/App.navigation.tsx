import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Conseils from "../pages/conseils/Conseils.pages";
import Home from "../pages/home/Home.pages";
import List from "../pages/list/List.pages";
export const AppNavigation = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/conseils" component={Conseils} />
                <Route exact path="/lists" component={List} />
            </Switch>
        </BrowserRouter>
    );
};
