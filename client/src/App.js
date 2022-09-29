import { BrowserRouter } from 'react-router-dom'
import './App.css'
import MyNavbar from './components/Navbar/MyNavbar'
import { useAuth } from './hooks/auth.hook'
import { createContext, useEffect, useState } from 'react'
import { useFetching } from './hooks/fetch.hook'
import AuthService from "./API/AuthService"
import AppRouter from './components/AppRouter'

export const AuthContext = createContext(null)

function App() {

  const { login, logout, token, userId, isAuth, username } = useAuth()
  const [loadingPage, setLoadingPage] = useState(true)
  const [authFetching, isLoadingAuth, errorAuth] = useFetching(async () => {
    if (localStorage.getItem("crystalgram_userData")) {
      const response = await AuthService.auth(JSON.parse(localStorage.getItem("crystalgram_userData")).jwtToken)
      if (response.token) {
        login(response.token, response.user.id, response.user.username)
      } else {
        logout()
      }
    }
    setLoadingPage(false)
  })

  useEffect(() => {
    authFetching()
  }, [])

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      token,
      userId,
      username,
      isAuth,
      loadingPage
    }}>
      <BrowserRouter>
        <div className="app">
          <MyNavbar />
          <AppRouter />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
