const getVideoDetail_ = videoIds => {
  var _YouTube$Videos$list;

  return ((_YouTube$Videos$list = YouTube.Videos.list("contentDetails", {
    id: videoIds
  })) === null || _YouTube$Videos$list === void 0 ? void 0 : _YouTube$Videos$list.items) || [];
};

const parseYoutubeDuration_ = youtubeDuration => {
  const regex = /^PT(?:(\d+\.*\d*)H)?(?:(\d+\.*\d*)M)?(?:(\d+\.*\d*)S)?$/;
  const matches = regex.exec(youtubeDuration);
  const hours = Number((matches === null || matches === void 0 ? void 0 : matches[1]) || 0);
  const minutes = Number((matches === null || matches === void 0 ? void 0 : matches[2]) || 0);
  const seconds = Number((matches === null || matches === void 0 ? void 0 : matches[3]) || 0);
  const duration = {
    hours,
    minutes,
    seconds
  };
  return duration;
};

const getVideoDurationString_ = videoDetail => {
  var _videoDetail$contentD;

  const durationRaw = videoDetail === null || videoDetail === void 0 ? void 0 : (_videoDetail$contentD = videoDetail.contentDetails) === null || _videoDetail$contentD === void 0 ? void 0 : _videoDetail$contentD.duration;

  if (!durationRaw) {
    return null;
  }

  const durationObject = parseYoutubeDuration_(durationRaw);
  return `${durationObject.hours ? durationObject.hours + ':' : ''}${(durationObject.minutes + '').padStart(2, '0')}:${(durationObject.seconds + '').padStart(2, '0')}`;
};

const listVideos_ = query => {
  const options = {
    maxResults: 50,
    type: 'video',
    q: query
  };
  const videosRaw = YouTube.Search.list("snippet", options).items;
  const videoIds = videosRaw.map(videoRaw => {
    var _videoRaw$id;

    return (_videoRaw$id = videoRaw.id) === null || _videoRaw$id === void 0 ? void 0 : _videoRaw$id.videoId;
  }).filter(id => !!id);
  const videoDetails = getVideoDetail_(videoIds);
  const videos = (videosRaw === null || videosRaw === void 0 ? void 0 : videosRaw.filter(video => {
    var _video$id;

    return !!((_video$id = video.id) !== null && _video$id !== void 0 && _video$id.videoId);
  }).map(videoRaw => {
    const video = {
      id: videoRaw.id.videoId,
      thumbnailSrc: videoRaw.snippet.thumbnails.default.url,
      title: videoRaw.snippet.title
    };
    const videoDetail = videoDetails.find(videoDetail => {
      var _videoRaw$id2;

      return videoDetail.id === ((_videoRaw$id2 = videoRaw.id) === null || _videoRaw$id2 === void 0 ? void 0 : _videoRaw$id2.videoId);
    });

    if (videoDetail) {
      video.duration = getVideoDurationString_(videoDetail);
    }

    return video;
  })) || [];
  return videos;
};

const doGet = event => {
  const videos = listVideos_(event.parameter['query']);
  return ContentService.createTextOutput(JSON.stringify(videos)).setMimeType(ContentService.MimeType.JSON);
};

const test = () => {
  const videos = doGet({
    parameter: {
      query: '10 hours'
    },
    contentLength: 1,
    contextPath: '',
    queryString: '',
    parameters: {}
  });
};
