import {RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../components/Layout.tsx";
import {Listings} from "./listings/Listings.tsx";
import {ListingForm} from "./listings/ListingForm.tsx";
import {ErrorPage} from "./error/ErrorPage.tsx";

const routes: RouteObject[] = [
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
    return useRoutes(routes);
}