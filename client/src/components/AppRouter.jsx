import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from '../App';
import { privateRouters, publicRouters } from '../router'
import { Preloader } from 'react-materialize'

const AppRouter = () => {
    const { loadingPage, isAuth } = useContext(AuthContext)

    if (loadingPage) {
        return <Preloader active color="blue" flashing />
    }

    return (
        <div>
            {
                isAuth ?
                    <Routes>
                        {
                            privateRouters.map(route => <Route key={route.path} path={route.path} element={route.component} />)
                        }
                    </Routes>
                    :
                    <Routes>
                        {
                            publicRouters.map(route => <Route key={route.path} path={route.path} element={route.component} />)
                        }
                    </Routes>
            }
        </div>
    );
}

export default AppRouter;
