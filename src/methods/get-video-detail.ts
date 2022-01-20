export const getVideoDetail_ = (videoIds: string[]): GoogleAppsScript.YouTube.Schema.Video[] => {
    return YouTube.Videos.list("contentDetails", { id: videoIds })?.items || [];
}