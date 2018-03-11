SystemJS.config({
  paths: {
    "reactxx-kitchen-sink/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  packages: {
    "reactxx-kitchen-sink": {
      "main": "reactxx-kitchen-sink.js"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [],
  map: {},
  packages: {}
});
