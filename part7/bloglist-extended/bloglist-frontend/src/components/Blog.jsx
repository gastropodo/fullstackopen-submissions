import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNotify } from '../contexts/notificationContext';
import { useComment, useResource } from '../hooks';
import { useUserValue } from '../contexts/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentForm, Toggable } from '.';
import { Button, ItemList } from './styles';
import { useRef } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import ConfirmDialog from './styles/ConfirmDialog';

const Blog = () => {
    const { id } = useParams();
    const blogResource = useResource('blogs');
    const comment = useComment();
    const result = useQuery({
        queryKey: ['blogs', id],
        queryFn: () => blogResource.get(id),
    });
    const commentFormRef = useRef();
    const user = useUserValue();
    const queryClient = useQueryClient();
    const notify = useNotify();
    const navigate = useNavigate();

    const updateBlogMutation = useMutation(blogResource.update, {
        onSuccess: (data) => {
            queryClient.setQueryData(['blogs', id], data);
            notify({
                type: 'success',
                text: `Blog '${data.title}' liked successfuly.`,
            });
        },
        onError: (error) => {
            notify({ type: 'error', text: error.response.data.error });
        },
    });

    const deleteBlogMutation = useMutation({
        mutationFn: (variables) => blogResource.remove(variables.id),
        onSuccess: (data, variables) => {
            notify({
                type: 'success',
                text: `Blog '${variables.title}' deleted successfuly.`,
            });
            navigate('/');
        },
        onError: (error) => {
            notify({ type: 'error', text: error.response.data.error });
        },
    });

    const commentMutation = useMutation(comment, {
        onSuccess: (data, variables) => {
            queryClient.setQueryData(['blogs', id], data);
            notify({
                type: 'success',
                text: `Comment '${variables.text}' added successfuly.`,
            });
        },
        onError: (error) => {
            notify({ type: 'error', text: error.response.data.error });
        },
    });

    const handleLike = (blog) => {
        updateBlogMutation.mutate({
            ...blog,
            user: blog.user.id,
            likes: blog.likes + 1,
            comments: blog.comments.map((c) => c.id),
        });
    };

    const handleRemove = (blog) => {
        deleteBlogMutation.mutate({ id: blog.id, title: blog.title });
    };

    const handleComment = (blog) => {
        return (text) => commentMutation.mutate({ id: blog.id, text });
    };

    if (result.isLoading) return <div>loading data...</div>;

    if (result.isError) return <div>No blog</div>;

    const blog = result.data;

    return (
        <Box>
            <Typography variant='h5'>{blog.title}</Typography>
            <TableContainer component={Paper}>
                <Table size='small'>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ width: 100 }}>URL</TableCell>
                            <TableCell sx={{ width: 50 }}></TableCell>
                            <TableCell>
                                <a href={blog.url}>{blog.url}</a>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Likes</TableCell>
                            <TableCell>
                                <Button onClick={() => handleLike(blog)}>
                                    LIKE
                                </Button>
                            </TableCell>
                            <TableCell>{blog.likes}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Added By</TableCell>
                            <TableCell></TableCell>
                            <TableCell>{blog.user.name}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {user.username === blog.user.username && (
                <ConfirmDialog
                    buttonLabel='REMOVE'
                    buttonColor='error'
                    title='REMOVE BLOG'
                    text={`Are you sure you want to remove '${blog.title}' by ${blog.author}?`}
                    onCofirm={() => handleRemove(blog)}
                />
            )}
            <Box marginTop={2}>
                <Toggable buttonLabel='new comment' ref={commentFormRef}>
                    <CommentForm
                        handleComment={handleComment(blog)}
                        close={() => commentFormRef.current.toggleVisibility()}
                    />
                </Toggable>
            </Box>
            <ItemList
                items={blog.comments}
                itemName='comments'
                itemProperty='text'
            />
        </Box>
    );
};

export default Blog;
