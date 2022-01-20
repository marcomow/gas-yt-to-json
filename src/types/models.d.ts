export type YoutubeVideo = {
    id: string;
    title: string;
    duration?: string;
    thumbnailSrc: string;
}
export type YoutubeDuration = {
    hours: string | number,
    minutes: string | number,
    seconds: string | number
};