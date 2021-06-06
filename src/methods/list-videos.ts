const listVideos = (query: string): YoutubeVideo[] => {
    const options: object = {
        maxResults: 50,
        type: 'video',
        q: query
    }
    const videosRaw: GoogleAppsScript.YouTube.Schema.SearchResult[] = YouTube.Search.list("snippet", options).items;
    const videos: YoutubeVideo[] = videosRaw?.filter((video: GoogleAppsScript.YouTube.Schema.SearchResult): boolean => !!video.id?.videoId)
        .map((videoRaw: GoogleAppsScript.YouTube.Schema.SearchResult) => {
            const video: YoutubeVideo = {
                id: videoRaw.id.videoId,
                thumbnail_src: videoRaw.snippet.thumbnails.default.url,
                title: videoRaw.snippet.title
            }
            return video;
        }) || [];
    return videos;
}
export { listVideos }