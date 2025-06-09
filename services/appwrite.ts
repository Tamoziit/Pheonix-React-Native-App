import { Client, Databases, ID, Query } from "react-native-appwrite";

// APPWRITE CONFIG
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

// Appwrite client
const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

// Appwrite database
const database = new Databases(client);


// Tracking the searches made by the user
export const updateSearchCount = async (query: string, movie: Movie) => {
    // Checking if a record of that search has already been stored --> if found, increment the searchCount --> if not, create a new record

    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query)
        ]);

        if (result.documents.length > 0) { // if record exists
            const existingMovie = result.documents[0];

            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1,
                }
            );
        } else { // if record does not exist
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm: query,
                    movie_id: movie.id,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    title: movie.title
                }
            );
        }
    } catch (error) {
        console.error("Error updating search count:", error);
        throw error;
    }
}

// fetch trending movies from the database
export const getTrendingMovies = async(): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count') // top 5 most searched movies
        ]);

        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.log("Error fetching trending movies:", error);
        return undefined;
    }
}