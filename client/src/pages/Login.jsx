import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    async function loginUser(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', {
                email,
                password,
            });
            setUser(data);
            alert('Logged in successfully');
            navigate('/');
        } catch (error) {
            console.log('error', error);
            alert('Login Failed. Please try again.');
        }
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-60">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={loginUser}>
                    <input
                        type="email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                        placeholder={'your@email.com'}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                        placeholder={'password'}
                    />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500 ">
                        Do not have an account?{' '}
                        <Link className="underline text-black" to={'/register'}>
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
