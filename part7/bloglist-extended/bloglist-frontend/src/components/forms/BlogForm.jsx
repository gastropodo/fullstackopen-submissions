import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useField, useFieldCollection, useResource } from '../../hooks';
import { useNotify } from '../../contexts/notificationContext';
import { Form } from '../styles';

const BlogForm = ({ close }) => {
    const notify = useNotify();
    const queryClient = useQueryClient();
    const blogResource = useResource('blogs');

    const title = useField('text', 'title');
    const author = useField('text', 'author');
    const url = useField('text', 'url');
    const fields = useFieldCollection([title, author, url]);

    const newBlogMutation = useMutation(blogResource.add, {
        onSuccess: (data) => {
            queryClient.setQueryData(
                ['blogs'],
                queryClient.getQueryData(['blogs']).concat(data),
            );
            notify({
                type: 'success',
                text: `A new blog: ${data.title}, by ${data.author} added.`,
            });
            fields.reset();
            close();
        },
        onError: (error) => {
            notify({ type: 'error', text: error.response.data.error });
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        newBlogMutation.mutate(fields.values());
    };

    return (
        <Form fields={fields} onSubmit={handleSubmit} title='CREATE NEW BLOG' submitLabel='CREATE' />
    );
};

export default BlogForm;
