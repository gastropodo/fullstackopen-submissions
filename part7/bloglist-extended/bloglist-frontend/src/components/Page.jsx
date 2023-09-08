import { Container, Box, Typography, Card, CardContent } from '@mui/material';
import { Notification, Navigation } from '.';

const Page = (props) => {
    const { title, children } = props;

    return (
        <Box>
            <Navigation />
            <Container sx={{ my: 3 }}>
                <Card component={Container} elevation={4} sx={{minHeight: '84vh'}}>
                    <CardContent>
                        <Typography
                            variant='h4'
                            sx={{ textTransform: 'uppercase', my: 2 }}
                        >
                            {title}
                        </Typography>
                        {children}
                    </CardContent>
                </Card>
            </Container>
            <Notification />
        </Box>
    );
};

export default Page;
