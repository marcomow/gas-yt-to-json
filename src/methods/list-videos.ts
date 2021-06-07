import { getVideoDetail } from "./get-video-detail";
import { getVideoDurationString } from "./get-video-duration-string";

const listVideos = (query: string): YoutubeVideo[] => {
    const options: object = {
        maxResults: 50,
        type: 'video',
        q: query
    }
    const videosRaw: GoogleAppsScript.YouTube.Schema.SearchResult[] = YouTube.Search.list("snippet", options).items;
    const videoIds: string[] = videosRaw.map((videoRaw: GoogleAppsScript.YouTube.Schema.SearchResult): string => videoRaw.id?.videoId).filter((id: string): boolean => !!id);
    const videoDetails: GoogleAppsScript.YouTube.Schema.Video[] = getVideoDetail(videoIds);
    const videos: YoutubeVideo[] = videosRaw?.filter((video: GoogleAppsScript.YouTube.Schema.SearchResult): boolean => !!video.id?.videoId)
        .map((videoRaw: GoogleAppsScript.YouTube.Schema.SearchResult) => {
            const video: YoutubeVideo = {
                id: videoRaw.id.videoId,
                thumbnail_src: videoRaw.snippet.thumbnails.default.url,
                title: videoRaw.snippet.title
            }
            const videoDetail: GoogleAppsScript.YouTube.Schema.Video = videoDetails.find((videoDetail: GoogleAppsScript.YouTube.Schema.Video): boolean => videoDetail.id === videoRaw.id?.videoId);
            if (videoDetail) { video.duration = getVideoDurationString(videoDetail); }
            return video;
        }) || [];
    return videos;
}
export { listVideos }