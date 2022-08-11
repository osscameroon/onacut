import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Conseils from "../../pages/advices/Advices";
import Detail from "../../pages/detail/Detail.page";
import { NotFound } from '../../components/notFound/NotFound.component';
import Home from "../../pages/home/Home.pages";
import List from "../../pages/list/List.pages";
import {AddAlert} from "../../pages/addAlert/addAlert";

export const AppNavigation = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/conseils" component={Conseils} />
                <Route exact path="/lists" component={List} />
                <Route exact path="/add-alert" component={AddAlert} />
                <Route exact path="/details/:region" component={Detail} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};
