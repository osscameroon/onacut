import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Advices from "../pages/advices/Advices";
import Home from "../pages/home/Home.pages";
import List from "../pages/list/List.pages";
export const AppNavigation = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/advices" component={Advices} />
                <Route exact path="/lists" component={List} />
            </Switch>
        </BrowserRouter>
    );
};
