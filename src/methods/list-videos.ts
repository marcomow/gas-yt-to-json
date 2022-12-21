import { YoutubeVideo } from "../types/models";
import { getVideoDetail_ } from "./get-video-detail";
import { getVideoDurationString_ } from "./get-video-duration-string";

export const listVideos = (query: string): YoutubeVideo[] => {
    const options: object = {
        maxResults: 50,
        type: 'video',
        q: query
    }
    const videosRaw: GoogleAppsScript.YouTube.Schema.SearchResult[] = YouTube.Search!.list("snippet", options).items || [];
    const videoIds: string[] = videosRaw
        .map((videoRaw: GoogleAppsScript.YouTube.Schema.SearchResult): string => videoRaw.id?.videoId || '')
        .filter((id: string): boolean => !!id);
    const videoDetails: GoogleAppsScript.YouTube.Schema.Video[] = getVideoDetail_(videoIds);
    const videos: YoutubeVideo[] = videosRaw
        ?.filter((video: GoogleAppsScript.YouTube.Schema.SearchResult): boolean => !!video.id?.videoId)
        .map((videoRaw: GoogleAppsScript.YouTube.Schema.SearchResult) => {
            const video: YoutubeVideo = {
                id: videoRaw.id?.videoId || '',
                thumbnailSrc: videoRaw.snippet?.thumbnails?.default?.url || '',
                title: videoRaw.snippet?.title || '',
            }
            const videoDetail: GoogleAppsScript.YouTube.Schema.Video | undefined = videoDetails
                .find((videoDetail: GoogleAppsScript.YouTube.Schema.Video): boolean => videoDetail.id === videoRaw.id?.videoId);
            if (videoDetail) { video.duration = getVideoDurationString_(videoDetail) || ''; }
            const isDurationZero = video.duration?.split(':').every((time: string): boolean => time === '00');
            if (isDurationZero) { return null; }
            return video;
        })
        .filter((video: YoutubeVideo | null): boolean => !!video) as YoutubeVideo[] 
        || [];
    return videos;
}