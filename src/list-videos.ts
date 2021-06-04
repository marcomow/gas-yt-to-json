import { parseYoutubeDuration } from "./parse-duration";

const listVideos = (query: string): YoutubeVideo[] => {
    const options: object = {
        maxResults: 50,
        type: 'video',
        q: query
    }
    const videosRaw: GoogleAppsScript.YouTube.Schema.SearchResult[] = YouTube.Search.list("snippet", options).items;
    const videos: YoutubeVideo[] = videosRaw?.filter((video: GoogleAppsScript.YouTube.Schema.SearchResult): boolean => !!video.id?.videoId)
        .map((videoRaw: GoogleAppsScript.YouTube.Schema.SearchResult) => {
            const videoDetail: GoogleAppsScript.YouTube.Schema.Video = YouTube.Videos.list("contentDetails", { id: [videoRaw.id.videoId] }).items?.[0];
            const durationRaw: string = videoDetail?.contentDetails?.duration || '';
            const durationObject: YoutubeDuration = parseYoutubeDuration(durationRaw);
            const durationString: string = `${durationObject.hours ? durationObject.hours + ':' : ''}${(durationObject.minutes + '').padStart(2, '0')}:${(durationObject.seconds + '').padStart(2, '0')}`;
            const video: YoutubeVideo = {
                id: videoRaw.id.videoId,
                thumbnail_src: videoRaw.snippet.thumbnails.default.url,
                title: videoRaw.snippet.title,
                duration: durationString
            }
            return video;
        }) || [];
    return videos;
}
export { listVideos }