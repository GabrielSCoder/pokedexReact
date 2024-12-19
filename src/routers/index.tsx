import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import View from "../pages/View";
import HomeLayout from "../components/Layout/Home";
import Panel from "../pages/Panel";

export default function AppRouter() {

    const router = createBrowserRouter([
        {
            path : "/",
            element : <HomeLayout />,
            errorElement : "",
            children: [
                {
                    path: "",
                    element: <Home />,
                    errorElement: ""
                },
                {
                    path: "/view",
                    element: <View />,
                    errorElement: ""
                },
                {
                    path: "/panel",
                    element: <Panel />,
                    errorElement: ""
                }
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}