const style = {
    background: 'lightgrey',
    fontSize: 15,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
};

const Notification = ({ type, message }) => {
    if (message === null) return null;
    return (
        <div className={type} style={style}>
            {message}
        </div>
    );
};

export default Notification;