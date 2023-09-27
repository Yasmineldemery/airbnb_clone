import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert('Registered successfully');
        } catch (error) {
            alert('Registeration Failed. Please try again.');
        }
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-60">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input
                        type="text"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                        placeholder={'Yasmine Eldemery'}
                    />
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
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500 ">
                        Already a member?{' '}
                        <Link className="underline text-black" to={'/login'}>
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
