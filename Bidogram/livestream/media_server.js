const axios = require("./config/api");

const NodeMediaServer = require("node-media-server"),
  config = require("./config/default").rtmp_server;

nms = new NodeMediaServer(config);

nms.on("prePublish", async (id, StreamPath, args) => {
  let stream_key = getStreamKeyFromStreamPath(StreamPath);
  console.log("[NodeEvent on prePublish]", "Attempting publishing.");
  axios.post(
    "/api/livestreams/start/",
    {
      headers: { "Access-Control-Allow-Origin": "*" },
      data: { streamKey: stream_key },
    },
    (err, res) => {
      if (err || !res.data.valid) {
        let session = nms.getSession(id);
        session.reject();
      }
      console.log(
        "[NodeEvent on prePublish]",
        `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
      );
    }
  );
});

nms.on("donePublish", (id, StreamPath, args) => {
  console.log(
    "[NodeEvent on donePublish]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );

  let stream_key = getStreamKeyFromStreamPath(StreamPath);
  axios.post(
    "/api/livestreams/end/",
    {
      headers: { "Access-Control-Allow-Origin": "*" },
      data: { streamKey: stream_key },
    },
    (err, res) => {
      if (err) console.log("CRITICAL FAILURE");
      if (res.data.valid) {
        console.log("Good post publish.");
      } else {
        console.log("CRITICAL FAILURE2");
      }
    }
  );
});

const getStreamKeyFromStreamPath = (path) => {
  let parts = path.split("/");
  return parts[parts.length - 1];
};

module.exports = nms;
