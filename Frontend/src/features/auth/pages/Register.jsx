import {useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
 
    const navigate = useNavigate();

    const {loading, handleRegister} = useAuth();
    const [error, setError] = useState("")

    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if(!username.trim()){
            setError("Username is required.")
            return;
        }

        if(!email.trim()){
            setError("Email is required.")
            return;
        }

        if(!password.trim()){
            setError("Password is required.")
            return;
        }

        const success = await handleRegister({
            username,
            email,
            password,
        })

        if(success) 
            navigate("/")
        else 
            setError("Unable to create account. Please try again.")
    }

    if (loading) {
        return (
            <main>
                <div className="loader-content">
                    <div className="loader"></div>
                    <p>Creating your account...</p>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                                setError("")
                            }}
                            type="text" id="username" name="username" placeholder="Enter Username"
                        />
                    </div>

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
                            type="password" id="password" name="password" placeholder="************"
                        />
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <button className='button primary-button' type="submit">Register</button>
                </form>

                <p>Already have an account? <Link to={"/login"}>Login</Link> </p>
            </div>
        </main>
    )
}   

export default Register
