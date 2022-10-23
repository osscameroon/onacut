/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, {Fragment, lazy, Suspense} from "react";
import {RouteConfig} from "react-router-config";
import {Redirect, Route, Switch} from "react-router-dom";
import {LoadingScreen} from "components";
import {ApplicationLayout, MapLayout} from "layout";

const routesConfig: RouteConfig[] = [
    {
        path: "/",
        exact: true,
        component: () => <Redirect to="/home"/>,
    },
    {
        path: "/home",
        layout: MapLayout,
        routes: [
            {
                path: "/home",
                exact: true,
                component: lazy(() => import("pages/home/Home.page")),
            },
            {
                component: () => <Redirect to="/errors/error-404"/>,
            },
        ],
    },
    {
        path: "/app",
        layout: ApplicationLayout,
        routes: [
            {
                path: "/app/advice",
                exact: true,
                component: lazy(() => import("pages/advices/Advices")),
            },
            {
                path: "/app/list",
                exact: true,
                component: lazy(() => import("pages/list/List.page")),
            },
            {
                path: "/app/add-alert",
                exact: true,
                component: lazy(() => import("pages/addAlert/addAlert")),
            },
            {
                path: "/app/details/:region",
                exact: true,
                component: lazy(() => import("pages/detail/Detail.page")),
            },
            {
                component: () => <Redirect to="/errors/error-404"/>,
            },
        ],
    },
    {
        path: "/errors/error-404",
        exact: true,
        component: lazy(() => import("pages/404")),
    },
    {
        path: "/*",
        component: () => <Redirect to="/errors/error-404"/>,
    },

];

const renderRoutes = (routes: RouteConfig[]) => {

        return routes ? (
            <Suspense fallback={<LoadingScreen/>}>
                <Switch>
                    {
                        routes.map((route, i) => {
                            const Layout = route.layout || Fragment;
                            const Component: any = route.component;
                            return (
                                <Route
                                    key={i}
                                    path={route.path}
                                    exact={route.exact}
                                    render={(props) => (
                                        <Fragment>
                                            <Layout>
                                                {route.routes ? (
                                                    renderRoutes(route.routes)
                                                ) : (
                                                    <Component {...props} />
                                                )}
                                            </Layout>
                                        </Fragment>
                                    )}
                                />
                            );
                        })
                    }
                </Switch>
            </Suspense>
        ) : null
    }
;

function Routes() {
    return renderRoutes(routesConfig);
}

export default Routes;
