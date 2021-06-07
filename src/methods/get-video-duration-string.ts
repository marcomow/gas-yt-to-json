import { parseYoutubeDuration } from "../parse-duration";

const getVideoDurationString = (videoDetail: GoogleAppsScript.YouTube.Schema.Video): string | null => {
    const durationRaw: string = videoDetail?.contentDetails?.duration;
    if (!durationRaw) { return null; }
    const durationObject: YoutubeDuration = parseYoutubeDuration(durationRaw);
    return `${durationObject.hours ? durationObject.hours + ':' : ''}${(durationObject.minutes + '').padStart(2, '0')}:${(durationObject.seconds + '').padStart(2, '0')}`;
}
export { getVideoDurationString }