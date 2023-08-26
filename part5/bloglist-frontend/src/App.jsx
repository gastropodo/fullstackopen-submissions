import { useState, useEffect, useRef } from 'react';
import { Login, User, BlogList, AddBlog, Notification, Toggable } from './components';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [notification, setNotification] = useState({ type: null, message: null });

    const blogFormRef = useRef();

    const raiseNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => {
            setNotification({ type: null, message: null });
        }, 5000);
    };

    const login = async (credentials) => {
        try {
            const user = await loginService.login(credentials);
            setUser(user);
            window.localStorage.setItem('user', JSON.stringify(user));
            blogService.setToken(user.token);
            raiseNotification('success', 'Logged in successfuly.');
        } catch (error) {
            raiseNotification('error', 'Invalid username or password.');
        }
    };

    const logout = () => {
        setUser(null);
        window.localStorage.removeItem('user');
        blogService.setToken(null);
        raiseNotification('success', 'Logged out successfuly.');
    };

    const addBlog = async (blog) => {
        try {
            const newBlog = await blogService.add(blog);
            raiseNotification('success', `A new blog: ${newBlog.title}, by ${newBlog.author} added.`);
            blogFormRef.current.toggleVisibility();
            await loadBlogs();
        } catch (error) {
            raiseNotification('error', error.response.data.error);
        }
    };

    const likeBlog = async (id, data) => {
        try {
            await blogService.update(id, data);
            raiseNotification('success', 'Blog liked successfuly.');
            await loadBlogs();
        } catch (error) {
            raiseNotification('error', error.response.data.error);
        }
    };

    const removeBlog = async (id) => {
        try {
            await blogService.remove(id);
            raiseNotification('success', 'Blog deleted successfuly.');
            await loadBlogs();
        } catch (error) {
            raiseNotification('error', error.response.data.error);
        }
    };

    const loadBlogs = async () => {
        const blogs = await blogService.getAll();
        setBlogs(blogs.sort((a, b) => -(a.likes - b.likes)));
    };

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('user');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    return (
        <div>
            {
                !user ? <>
                    <h1>Log in</h1>
                    <Notification type={notification.type} message={notification.message} />
                    <Login login={login} />
                </> : <>
                    <h1>Blogs</h1>
                    <Notification type={notification.type} message={notification.message} />
                    <User user={user} logout={logout} />
                    <Toggable buttonLabel='new blog' ref={blogFormRef}>
                        <AddBlog addBlog={addBlog} />
                    </Toggable>
                    <BlogList
                        blogs={blogs}
                        user={user}
                        loadBlogs={loadBlogs}
                        likeBlog={likeBlog}
                        removeBlog={removeBlog}
                    />
                </>
            }
        </div>
    );
};

export default App;