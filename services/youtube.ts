const YOUTUBE_API_KEY = 'AIzaSyBlWcylvkOEJB-kv7wZkzdBiExrYh5TOTw';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const searchYouTubeVideo = async (query: string): Promise<string | null> => {
  try {
    // We search for "Recipe Name + recipe" to get relevant cooking videos
    const searchQuery = `${query} recipe cooking`;
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`
    );
    
    if (!response.ok) {
        console.warn('YouTube API request failed');
        return null;
    }

    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].id.videoId;
    }
    return null;
  } catch (error) {
    console.error('Error searching YouTube:', error);
    return null;
  }
};