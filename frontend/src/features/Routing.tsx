import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../components/Layout.tsx";
import {Listings} from "./listings/Listings.tsx";
import {ListingForm} from "./listings/ListingForm.tsx";
import {ErrorPage} from "./error/ErrorPage.tsx";
import {LoginPage} from "./login/LoginPage.tsx";
import {useIsLogged} from "../hooks/useIsLogged.ts";
import {RegisterPage} from "./register/RegisterPage.tsx";

const publicRoutes: RouteObject[] = [
    {
        path: "/",
        children: [
            {
                path: "/login",
                element: <LoginPage/>,
            },
            {
                path: "/register",
                element: <RegisterPage/>,
            },
            {
                path: "*",
                element: <Navigate to="/login" replace/>,
            }
        ]
    }
]


const privateRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/listings",
                element: <Listings/>,
            },
            {
                path: "/listings/new",
                element: <ListingForm/>
            },
            {
                path: "/listings/:id",
                element: <ListingForm/>
            },
            {
                path: "*",
                element: <ErrorPage/>
            }

        ]
    }
]

export const Routing = () => {
    const isLogged = useIsLogged();
    const routes = isLogged ? privateRoutes : publicRoutes;
    return useRoutes(routes);
}