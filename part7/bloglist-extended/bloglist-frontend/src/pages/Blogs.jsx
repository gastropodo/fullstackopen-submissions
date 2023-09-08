import { useRef } from 'react';
import { BlogList, Toggable, BlogForm, Page } from '../components';

const Blogs = () => {
    const blogFormRef = useRef();

    return (
        <Page title='Blogs'>
            <Toggable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm
                    close={() => blogFormRef.current.toggleVisibility()}
                />
            </Toggable>
            <BlogList />
        </Page>
    );
};

export default Blogs;
