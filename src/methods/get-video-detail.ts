const getVideoDetail = (videoId: string): GoogleAppsScript.YouTube.Schema.Video => {
    return YouTube.Videos.list("contentDetails", { id: [videoId] }).items?.[0];
}
export { getVideoDetail }