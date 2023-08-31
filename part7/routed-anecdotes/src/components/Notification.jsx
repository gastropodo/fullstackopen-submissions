const Notification = ({ text }) => {
    if (!text) return null;
    return (
        <p>{text}</p>
    );
};

export default Notification;