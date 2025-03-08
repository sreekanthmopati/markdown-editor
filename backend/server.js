const express = require('express');
const cors = require('cors');
const { marked } = require('marked');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.post('/convert', (req, res) => {
    try {
        const { markdown } = req.body;

        
        if (!markdown || !markdown.trim()) {
            return res.status(400).json({ error: 'Markdown content cannot be empty.' });
        }

        const html = marked(markdown, { breaks: true });
        res.json({ html });
    } catch (error) {
        console.error('Error processing Markdown:', error);
        res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 