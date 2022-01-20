import { YoutubeDuration } from "../types/models";
import { parseYoutubeDuration_ } from "../parse-duration";

export const getVideoDurationString_ = (videoDetail: GoogleAppsScript.YouTube.Schema.Video): string | null => {
    const durationRaw: string = videoDetail?.contentDetails?.duration;
    if (!durationRaw) { return null; }
    const durationObject: YoutubeDuration = parseYoutubeDuration_(durationRaw);
    return `${durationObject.hours ? durationObject.hours + ':' : ''}${(durationObject.minutes + '').padStart(2, '0')}:${(durationObject.seconds + '').padStart(2, '0')}`;
}