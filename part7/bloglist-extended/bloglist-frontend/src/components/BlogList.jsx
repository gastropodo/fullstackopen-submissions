import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { useResource } from '../hooks';
import { ItemList } from './styles';
import { Typography } from '@mui/material';

const BlogList = () => {
    const blogResource = useResource('blogs');
    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: blogResource.getAll,
        retry: 1,
    });

    if (result.isLoading)
        return <Typography marginY={2}>LOADING DATA...</Typography>;

    if (result.isError)
        return (
            <Typography marginY={2} color='error'>
                SERVICE UNAVAILABLE
            </Typography>
        );

    const blogs = result.data;

    return (
        <ItemList items={blogs} title='BLOG LIST' itemName='blogs' itemProperty='title' isLink />
    );
};

BlogList.propTypes = {
    blogs: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            author: PropTypes.string,
            url: PropTypes.string,
            likes: PropTypes.number,
            user: PropTypes.exact({
                id: PropTypes.string,
                username: PropTypes.string,
                name: PropTypes.string,
            }),
            id: PropTypes.string,
        }),
    ),
};

export default BlogList;
