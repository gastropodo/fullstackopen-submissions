import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider, NotificationContextProvider } from './context-providers';

const queryClient = new QueryClient();

const Providers = (props) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <NotificationContextProvider>
                    {props.children}
                </NotificationContextProvider>
            </AuthContextProvider>
        </QueryClientProvider>
    );
};

export default Providers;
