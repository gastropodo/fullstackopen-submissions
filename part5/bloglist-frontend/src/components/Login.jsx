import { useState } from 'react';

const Login = ({ login }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const clearValues = () => {
        setUsername('');
        setPassword('');
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        await login({ username, password });
        clearValues();
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    id='login-username'
                    type='text'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    id='login-password'
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id='login-button' type='submit'>login</button>
        </form>
    );
};

export default Login;