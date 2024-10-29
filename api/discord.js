const axios = require('axios');

// Main handler function
module.exports = async (req, res) => {
    if (req.query.action === 'login') {
        // Redirect to Discord OAuth2 login
        const redirectUri = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&response_type=code&scope=identify`;
        res.redirect(redirectUri);
        return;
    }

    if (req.query.action === 'callback' && req.query.code) {
        const code = req.query.code;
        const tokenUrl = 'https://discord.com/api/oauth2/token';
        const userUrl = 'https://discord.com/api/users/@me';

        try {
            // Exchange code for access token
            const { data: tokenData } = await axios.post(tokenUrl, new URLSearchParams({
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.REDIRECT_URI,
            }), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });

            // Fetch user details with access token
            const { data: userData } = await axios.get(userUrl, {
                headers: { Authorization: `Bearer ${tokenData.access_token}` },
            });

            const avatarUrl = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
            res.json({ avatarUrl });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching Discord data' });
        }
        return;
    }

    // Fallback response if no valid action is specified
    res.status(400).json({ error: 'Invalid request' });
};

