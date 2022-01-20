import { YoutubeVideo } from "./types/models";
import { listVideos_ } from "./methods/list-videos";

const doGet = (event: GoogleAppsScript.Events.DoGet): GoogleAppsScript.Content.TextOutput => { 
    const videos: YoutubeVideo[] = listVideos_(event.parameter['query']);
    return ContentService.createTextOutput(JSON.stringify(videos)).setMimeType(ContentService.MimeType.JSON);
}

const test = () => {
    const videos = doGet({ parameter: { query: '10 hours' }, contentLength: 1, contextPath: '', queryString: '', parameters: {} })
}