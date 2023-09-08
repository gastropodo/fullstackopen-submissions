import { Route, Routes } from 'react-router-dom';
import { Login, Blogs, UserView, BlogView } from './pages';
import { Users } from './pages';
import { ProtectedRoute } from './utils';
import { Container } from '@mui/material';

const App = () => {
    const pages = [
        { key: 'blog', route: '/blogs/:id', element: <BlogView /> },
        { key: 'user', route: '/users/:id', element: <UserView /> },
        { key: 'users', route: '/users', element: <Users /> },
        { key: 'blogs', route: '/blogs', element: <Blogs /> },
        { key: 'home', route: '/', element: <Blogs /> },
    ];

    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoute />}>
                {pages.map((page) => {
                    return (
                        <Route
                            key={page.key}
                            path={page.route}
                            element={page.element}
                        />
                    );
                })}
            </Route>
        </Routes>
    );
};

export default App;
