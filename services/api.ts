export const API_CONFIG = {
    PROXY_BASE_URL: process.env.EXPO_PUBLIC_PROXY_BASE_URL,
    TMDB_BASE_URL: "https://api.themoviedb.org/3",
    TMDB_API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    USE_PROXY: true,
};

export const fetchMovies = async ({
    query,
}: {
    query: string;
}): Promise<Movie[]> => {
    const endpoint = query
        ? `${API_CONFIG.PROXY_BASE_URL}/movies/search?query=${encodeURIComponent(query)}`
        : `${API_CONFIG.PROXY_BASE_URL}/movies/discover`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
};

export const fetchMovieDetails = async (movieId: string): Promise<Movie> => {
    try {
        const response = await fetch(`${API_CONFIG.PROXY_BASE_URL}/movies/${movieId}`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch movie details: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching movie details for ID ${movieId}:`, error);
        throw error;
    }
}