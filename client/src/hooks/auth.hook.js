import { useCallback, useState } from "react"

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [username, setUsername] = useState(null)
    const [isAuth, setIsAuth] = useState(false)

    const login = useCallback((jwtToken, id, username) => {
        setToken(jwtToken)
        setUserId(id)
        setUsername(username)
        setIsAuth(true)
        localStorage.setItem("crystalgram_userData", JSON.stringify({
            id, jwtToken, username
        }))
    }, [])

    const logout = () => {
        setToken(null)
        setUserId(null)
        setUsername(null)
        setIsAuth(false)
        localStorage.removeItem("crystalgram_userData")
    }

    return { login, logout, token, userId, isAuth, username }
}