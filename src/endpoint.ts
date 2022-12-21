import { listVideos } from "./methods/list-videos";
import { YoutubeVideo } from "./types/models";

const doGet = (event: GoogleAppsScript.Events.DoGet): GoogleAppsScript.Content.TextOutput => {
    const videos: YoutubeVideo[] = listVideos(event.parameter['query']);
    return ContentService.createTextOutput(JSON.stringify(videos)).setMimeType(ContentService.MimeType.JSON);
}

const test = () => {
    const event: GoogleAppsScript.Events.DoGet = {
        parameter: {
            query: '10 hours'
        },
        contentLength: 1,
        contextPath: '',
        queryString: '',
        parameters: {},
        pathInfo: '',
    }
    const videos = doGet(event);
}
