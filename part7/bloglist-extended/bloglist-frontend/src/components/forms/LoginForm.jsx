import { useNotify } from '../../contexts/notificationContext';
import { useLogin } from '../../contexts/authContext';
import { useField, useFieldCollection } from '../../hooks';
import { Form } from '../styles';

const LoginForm = () => {
    const username = useField('text', 'username');
    const password = useField('password', 'password');
    const fields = useFieldCollection([username, password]);

    const notify = useNotify();
    const login = useLogin();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await login(fields.values());
            notify({ type: 'success', text: 'Logged in successfuly.' });
            fields.reset();
        } catch (error) {
            notify({ type: 'error', text: 'Invalid username or password.' });
        }
    };

    return <Form fields={fields} onSubmit={handleLogin} submitLabel='LOGIN' />;
};

export default LoginForm;
