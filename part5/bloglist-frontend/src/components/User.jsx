const User = ({ user, logout }) => {

    const handleLogout = () => {
        logout();
    };

    if (user) return (
        <p>
            {user.name} logged in
            <button onClick={handleLogout} style={{ marginLeft: 5 }}>logout</button>
        </p>
    );
    return (
        <p>
            No user logged in
        </p>
    );
};

export default User;