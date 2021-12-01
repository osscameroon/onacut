import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Conseils } from "../../pages/conseils/Conseils.pages";
import { Detail } from "../../pages/detail/Detail.page";
import { Home } from "../../pages/home/Home.pages";
import { List } from "../../pages/list/List.pages";

export const AppNavigation = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/conseils" component={Conseils} />
        <Route exact path="/lists" component={List} />
        <Route exact path="/details/:region" component={Detail} />
      </Switch>
    </BrowserRouter>
  );
};
