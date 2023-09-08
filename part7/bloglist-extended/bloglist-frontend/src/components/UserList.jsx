import { useQuery } from '@tanstack/react-query';
import { useResource } from '../hooks';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const userResource = useResource('users');
    const navigate = useNavigate();
    const result = useQuery({
        queryKey: ['users'],
        queryFn: userResource.getAll,
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

    const users = result.data;

    if (users.length > 0)
        return (
            <Box>
                <Typography variant='h6'>USER LIST</Typography>
                <TableContainer component={Paper}>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Users</TableCell>
                                <TableCell>Blogs created</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow hover key={user.id}>
                                    <TableCell>
                                        <Button
                                            size='small'
                                            onClick={() => navigate(`/users/${user.id}`)}
                                        >
                                            {user.name}
                                        </Button>
                                    </TableCell>
                                    <TableCell>{user.blogs.length}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );

    return <div>No Users</div>;
};

export default UserList;
