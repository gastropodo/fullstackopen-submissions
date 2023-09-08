import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ItemLink = ({ item, itemProperty, route }) => {
    const navigate = useNavigate();
    return (
        <ListItem>
            <ListItemButton onClick={() => navigate(route)}>
                <ListItemText primary={item[itemProperty]}></ListItemText>
            </ListItemButton>
        </ListItem>
    );
};

const Item = ({ item, itemProperty }) => {
    return (
        <ListItem>
            <ListItemText primary={item[itemProperty]}></ListItemText>
        </ListItem>
    );
};

const ItemList = ({ items, title, itemName, itemProperty, isLink }) => {
    if (items.length > 0)
        return (
            <Box marginY={3}>
                {title && <Typography variant='h6'>{title}</Typography>}
                <List dense>
                    {items.map((item) =>
                        isLink ? (
                            <ItemLink
                                key={item.id}
                                item={item}
                                itemProperty={itemProperty}
                                route={`/${itemName}/${item.id}`}
                            />
                        ) : (
                            <Item
                                key={item.id}
                                item={item}
                                itemProperty={itemProperty}
                            />
                        ),
                    )}
                </List>
            </Box>
        );

    return <Typography marginY={2}>No {itemName}</Typography>;
};

export default ItemList;
