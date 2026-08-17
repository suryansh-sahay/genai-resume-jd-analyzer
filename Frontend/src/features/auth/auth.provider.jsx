import { useEffect, useState } from 'react'
import { AuthContext } from "./auth.context"
import { getMe } from "./services/auth.api"

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAndSetUser = async () => {
            setLoading(true)

            try{
                const data = await getMe()
                setUser(data.user)
            } catch (err) {
                console.error("Auth initialization failed:", err)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()
    }, [setLoading, setUser])

    return (
        <AuthContext.Provider 
            value={{user, setUser, loading, setLoading}}
        >
            {children}
        </AuthContext.Provider>
    )

}