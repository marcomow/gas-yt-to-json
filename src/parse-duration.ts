const parseYoutubeDuration = (youtubeDuration: string): YoutubeDuration => {
    const regex = /^PT(?:(\d+\.*\d*)H)?(?:(\d+\.*\d*)M)?(?:(\d+\.*\d*)S)?$/;
    const matches = regex.exec(youtubeDuration);
    const hours = Number(matches?.[1] || 0);
    const minutes = Number(matches?.[2] || 0);
    const seconds = Number(matches?.[3] || 0);
    const duration: YoutubeDuration = {
        hours, minutes, seconds
    }
    return duration;
}
export { parseYoutubeDuration }