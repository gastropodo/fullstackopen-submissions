import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useResource } from '../hooks';
import { Box, Typography } from '@mui/material';
import { ItemList } from './styles';

const User = () => {
    const { id } = useParams();
    const userResource = useResource('users');
    const result = useQuery({
        queryKey: ['users', id],
        queryFn: () => userResource.get(id),
        retry: 1,
    });

    if (result.isLoading) return <div>loading data...</div>;

    if (result.isError) return <div>No user</div>;

    const user = result.data;

    return (
        <Box>
            <Typography variant='h5'>{user.name}</Typography>
            <ItemList
                items={user.blogs}
                title='BLOGS CREATED'
                itemName='blogs'
                itemProperty='title'
                isLink
            />
        </Box>
    );
};

export default User;
