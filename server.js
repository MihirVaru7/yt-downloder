const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.get('/download', (req, res) => {
    const url = req.query.url; // Get the URL parameter from the request

    if (!url) {
        return res.status(400).send('URL parameter is required');
    }

    // Use yt-dlp to download the video
    exec(`yt-dlp ${url}`, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).send(`Error: ${stderr || err.message}`);
        }
        res.send(`Download completed: ${stdout}`);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
