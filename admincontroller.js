const loginAdmin = (req, res) => {
    const { username, password } = req.body;

    // Replace with real authentication later
    if (username === 'admin' && password === 'password') {
        return res.json({ message: 'Login successful', token: 'fake-jwt-token' });
    }

    res.status(401).json({ message: 'Invalid username or password' });
};

module.exports = { loginAdmin };

