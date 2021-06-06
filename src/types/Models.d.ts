type YoutubeVideo = {
    id: string;
    title: string;
    duration?: string;
    thumbnail_src: string;
}
type YoutubeDuration = {
    hours: string | number,
    minutes: string | number,
    seconds: string | number
};