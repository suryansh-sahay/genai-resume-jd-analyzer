import {useState} from 'react'
import "../auth.form.scss";
import {useNavigate, Link} from 'react-router'
import {useAuth} from '../hooks/useAuth'

const Login = () => {

    const navigate = useNavigate()
    
    const {loading, handleLogin} = useAuth()
    const [ error, setError ] = useState("")

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")

        if(!email.trim()){
            setError("Email is required.")
            return;
        }

        if(!password.trim()){
            setError("Password is required.")
            return;
        }

        const success = await handleLogin({
            email,
            password,
        })

        if(success) 
            navigate("/")
        else 
            setError("Invalid email or password.")
    }

    if (loading) {
        return (
            <main>
                <div className="loader-content">
                    <div className="loader"></div>
                    <p>Signing you in...</p>
                </div>
            </main>
        );
    }

    return (
    <main>
        <div className="form-container">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setError("")
                        }}
                        type="email" id="email" name="email" placeholder="id@email.com"
                    />
                </div>
                
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setError("")
                        }}
                        type="password" id="password" name="password" placeholder="********"
                    />
                </div>

                {error && <p className="form-error">{error}</p>}

                <button className='button primary-button' type="submit" disabled={loading}>Login</button>
            </form>
            <p>Don't have an account? <Link to={"/register"}>Register</Link> </p>
        </div>
    </main>
    )
}   

export default Login
