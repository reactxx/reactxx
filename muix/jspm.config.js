SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "muix/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  packages: {
    "": {
      "defaultExtension": "js"
    }
  },
  map: {
    "muix-icons-web": "npm:muix-icons@0.1.27"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "muix-icons": "npm:muix-icons@0.1.37"
  },
  packages: {}
});
