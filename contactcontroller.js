const sendContactMessage = (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    console.log(`New contact message from ${name} (${email}): ${message}`);
    res.json({ message: 'Message sent successfully' });
};

module.exports = { sendContactMessage };
