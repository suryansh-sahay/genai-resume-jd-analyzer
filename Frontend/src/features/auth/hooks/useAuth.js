import { useContext } from 'react'
import { AuthContext } from "../auth.context"
import { login, register, logout} from "../services/auth.api"

export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {

        setLoading(true)
        try{
            const data = await login({ email, password })
            setUser(data.user)
            return true
        } catch(err) {
            console.error("Login failed:", err)
            return false
        } finally{
            setLoading(false)
        }
    }

    const handleRegister = async({ username, email, password }) => {
        
        setLoading(true)
        try{
            const data = await register({ username, email, password})
            setUser(data.user)
            return true
        } catch(err){
            console.error("Registration failed:", err)
            return false
        } finally{
            setLoading(false)
        }
    }

    const handleLogout = async() => {
        
        setLoading(true)
        try{
            await logout()
            setUser(null)
            return true
        } catch (err){
            console.error("Logout failed:", err)
            return false
        } finally{
            setLoading(false)
        }
    }

    return {
        user, 
        loading, 
        handleRegister, 
        handleLogin, 
        handleLogout
    };
}