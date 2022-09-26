import { BrowserRouter, Routes, Route, Navigate, Router } from 'react-router-dom'
import './App.css'
import MyNavbar from './components/Navbar/MyNavbar'
import { Preloader } from 'react-materialize'
import { useAuth } from './hooks/auth.hook'
import { privateRouters, publicRouters } from './router'
import { createContext, useEffect, useState } from 'react'
import { useFetching } from './hooks/fetch.hook'
import AuthService from "./API/AuthService"

export const AuthContext = createContext(null)

function App() {

  const { login, logout, token, userId, isAuth, username } = useAuth()
  const [indicatorLoadPage, setIndicatorLoadPage] = useState(true)

  const [authFetching, isLoadingAuth, errorAuth] = useFetching(async () => {
    const response = await AuthService.auth(JSON.parse(localStorage.getItem("crystalgram_userData")).jwtToken)
    if (response.token) {
      login(response.token, response.user.id, response.user.username)
      setIndicatorLoadPage(false)
    } else {
      logout()
    }
  })

  useEffect(() => {
    authFetching()
  }, [])

  if (indicatorLoadPage) {
    return <Preloader
      active
      color="blue"
      flashing
    />
  }

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      token,
      userId,
      username,
      isAuth
    }}>
      <BrowserRouter>
        <div className="app">
          <MyNavbar />
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
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
