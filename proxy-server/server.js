require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

const corOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PATCH',
        'DELETE'
    ],
    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ],
    credentials: true
};

app.use(cors(corOpts));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TMDB Configuration
const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.TMDB_API_KEY,
    headers: {
        accept: "application/json",
        'Content-Type': "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
};

// Proxy route for discover movies
app.get('/api/movies/discover', async (req, res) => {
    try {
        const endpoint = `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await fetch(endpoint, {
            method: "GET",
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Error fetching discover movies:', error);
        res.status(500).json({
            error: 'Failed to fetch movies',
            message: error.message
        });
    }
});

// Proxy route for search movies
app.get('/api/movies/search', async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        const endpoint = `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;

        const response = await fetch(endpoint, {
            method: "GET",
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({
            error: 'Failed to search movies',
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
    console.log(`📡 TMDB API Key configured: ${!!process.env.TMDB_API_KEY}`);
});