import { Navigate } from "react-router-dom";
import Registration from "../components/Auth/Registration";
import Login from "../components/Auth/Login";
import Posts from "../pages/Posts"
import Users from "../pages/Users"
import UserPage from "../pages/UserPage"

export const publicRouters = [
    {path: '/login', component: <Login/>},
    {path: '/registration', component: <Registration/>},
    {path: '*', component: <Navigate to="/login"/>},
]

export const privateRouters = [
    {path: '/', component: <Posts/>},
    {path: '/users', component: <Users/>},
    {path: '/users/:username', component: <UserPage/>},
    // {path: '/about', component: <About/>},
    {path: '/login', component: <Navigate to="/"/>},
    {path: '*', component: <Posts/>},
]