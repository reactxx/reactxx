SystemJS.config({
  browserConfig: {
    "paths": {
      "npm:": "/jspm_packages/npm/",
    }
  },
  nodeConfig: {
    "paths": {
      "npm:": "jspm_packages/npm/"
    }
  },
  packages: {
    "": {
      "defaultExtension": "js"
    },
    "deploy/material-ui/ButtonBase/": {
      "main": "index.js"
    }
  }
 });

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "brcast": "npm:brcast@3.0.1",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
    "classnames": "npm:classnames@2.2.6",
    "constants": "npm:jspm-nodelibs-constants@0.2.1",
    "core-js": "npm:core-js@2.5.7",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
    "csstype": "npm:csstype@2.5.5",
    "debounce": "npm:debounce@1.1.0",
    "deepmerge": "npm:deepmerge@2.1.1",
    "dom-helpers": "npm:dom-helpers@3.3.1",
    "domain": "npm:jspm-nodelibs-domain@0.2.1",
    "events": "npm:jspm-nodelibs-events@0.2.2",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "hoist-non-react-statics": "npm:hoist-non-react-statics@2.5.5",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.2",
    "jss": "npm:jss@9.8.6",
    "jss-camel-case": "npm:jss-camel-case@6.1.0",
    "jss-default-unit": "npm:jss-default-unit@8.0.2",
    "jss-global": "npm:jss-global@3.0.0",
    "jss-nested": "npm:jss-nested@6.0.1",
    "jss-props-sort": "npm:jss-props-sort@6.0.0",
    "jss-vendor-prefixer": "npm:jss-vendor-prefixer@7.0.0",
    "keycode": "npm:keycode@2.2.0",
    "normalize-scroll-left": "npm:normalize-scroll-left@0.1.2",
    "os": "npm:jspm-nodelibs-os@0.2.2",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "prop-types": "npm:prop-types@15.6.2",
    "react": "npm:react@16.4.1",
    "react-dom": "npm:react-dom@16.4.1",
    "react-event-listener": "npm:react-event-listener@0.6.1",
    "react-jss": "npm:react-jss@8.5.1",
    "react-popper": "npm:react-popper@0.10.4",
    "react-transition-group": "npm:react-transition-group@2.3.1",
    "recompose": "npm:recompose@0.27.1",
    "scroll": "npm:scroll@2.0.3",
    "stream": "npm:jspm-nodelibs-stream@0.2.1",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.2",
    "url": "npm:jspm-nodelibs-url@0.2.1",
    "util": "npm:jspm-nodelibs-util@0.2.2",
    "vm": "npm:jspm-nodelibs-vm@0.2.1",
    "warning": "npm:warning@4.0.1",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.3"
  },
  packages: {
    "npm:jss@9.8.6": {
      "map": {
        "warning": "npm:warning@3.0.0",
        "is-in-browser": "npm:is-in-browser@1.1.3",
        "symbol-observable": "npm:symbol-observable@1.2.0"
      }
    },
    "npm:react-jss@8.5.1": {
      "map": {
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.5.5",
        "jss": "npm:jss@9.8.6",
        "prop-types": "npm:prop-types@15.6.2",
        "jss-preset-default": "npm:jss-preset-default@4.5.0",
        "theming": "npm:theming@1.3.0"
      }
    },
    "npm:react-event-listener@0.6.1": {
      "map": {
        "prop-types": "npm:prop-types@15.6.2",
        "warning": "npm:warning@4.0.1",
        "@babel/runtime": "npm:@babel/runtime@7.0.0-beta.51"
      }
    },
    "npm:recompose@0.27.1": {
      "map": {
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.5.5",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "change-emitter": "npm:change-emitter@0.1.6",
        "symbol-observable": "npm:symbol-observable@1.2.0",
        "react-lifecycles-compat": "npm:react-lifecycles-compat@3.0.4",
        "fbjs": "npm:fbjs@0.8.17"
      }
    },
    "npm:jss-nested@6.0.1": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:react-popper@0.10.4": {
      "map": {
        "prop-types": "npm:prop-types@15.6.2",
        "popper.js": "npm:popper.js@1.14.3"
      }
    },
    "npm:react-transition-group@2.3.1": {
      "map": {
        "dom-helpers": "npm:dom-helpers@3.3.1",
        "prop-types": "npm:prop-types@15.6.2",
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:warning@4.0.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:prop-types@15.6.2": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1"
      }
    },
    "npm:warning@3.0.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:react@16.4.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "prop-types": "npm:prop-types@15.6.2",
        "fbjs": "npm:fbjs@0.8.17"
      }
    },
    "npm:scroll@2.0.3": {
      "map": {
        "rafl": "npm:rafl@1.2.2"
      }
    },
    "npm:jss-camel-case@6.1.0": {
      "map": {
        "hyphenate-style-name": "npm:hyphenate-style-name@1.0.2"
      }
    },
    "npm:jss-vendor-prefixer@7.0.0": {
      "map": {
        "css-vendor": "npm:css-vendor@0.3.8"
      }
    },
    "npm:react-dom@16.4.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "prop-types": "npm:prop-types@15.6.2",
        "fbjs": "npm:fbjs@0.8.17"
      }
    },
    "npm:jss-preset-default@4.5.0": {
      "map": {
        "jss-camel-case": "npm:jss-camel-case@6.1.0",
        "jss-default-unit": "npm:jss-default-unit@8.0.2",
        "jss-global": "npm:jss-global@3.0.0",
        "jss-nested": "npm:jss-nested@6.0.1",
        "jss-props-sort": "npm:jss-props-sort@6.0.0",
        "jss-vendor-prefixer": "npm:jss-vendor-prefixer@7.0.0",
        "jss-template": "npm:jss-template@1.0.1",
        "jss-extend": "npm:jss-extend@6.2.0",
        "jss-compose": "npm:jss-compose@5.0.0",
        "jss-expand": "npm:jss-expand@5.3.0"
      }
    },
    "npm:theming@1.3.0": {
      "map": {
        "brcast": "npm:brcast@3.0.1",
        "prop-types": "npm:prop-types@15.6.2",
        "is-plain-object": "npm:is-plain-object@2.0.4",
        "is-function": "npm:is-function@1.0.1"
      }
    },
    "npm:css-vendor@0.3.8": {
      "map": {
        "is-in-browser": "npm:is-in-browser@1.1.3"
      }
    },
    "npm:@babel/runtime@7.0.0-beta.51": {
      "map": {
        "core-js": "npm:core-js@2.5.7",
        "regenerator-runtime": "npm:regenerator-runtime@0.11.1"
      }
    },
    "npm:babel-runtime@6.26.0": {
      "map": {
        "core-js": "npm:core-js@2.5.7",
        "regenerator-runtime": "npm:regenerator-runtime@0.11.1"
      }
    },
    "npm:rafl@1.2.2": {
      "map": {
        "global": "npm:global@4.3.2"
      }
    },
    "npm:loose-envify@1.3.1": {
      "map": {
        "js-tokens": "npm:js-tokens@3.0.2"
      }
    },
    "npm:jss-extend@6.2.0": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:jss-template@1.0.1": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:jss-compose@5.0.0": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:is-plain-object@2.0.4": {
      "map": {
        "isobject": "npm:isobject@3.0.1"
      }
    },
    "npm:global@4.3.2": {
      "map": {
        "process": "npm:process@0.5.2",
        "min-document": "npm:min-document@2.19.0",
        "node-min-document": "npm:min-document@2.19.0"
      }
    },
    "npm:fbjs@0.8.17": {
      "map": {
        "core-js": "npm:core-js@1.2.7",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.18",
        "promise": "npm:promise@7.3.1",
        "setimmediate": "npm:setimmediate@1.0.5",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1"
      }
    },
    "npm:promise@7.3.1": {
      "map": {
        "asap": "npm:asap@2.0.6"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "node-fetch": "npm:node-fetch@1.7.3",
        "whatwg-fetch": "npm:whatwg-fetch@2.0.4"
      }
    },
    "npm:node-fetch@1.7.3": {
      "map": {
        "encoding": "npm:encoding@0.1.12",
        "is-stream": "npm:is-stream@1.1.0"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.1": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:min-document@2.19.0": {
      "map": {
        "dom-walk": "npm:dom-walk@0.1.1"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.6",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.23"
      }
    },
    "npm:readable-stream@2.3.6": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "string_decoder": "npm:string_decoder@1.1.1",
        "isarray": "npm:isarray@1.0.0",
        "core-util-is": "npm:core-util-is@1.0.2",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "process-nextick-args": "npm:process-nextick-args@2.0.0"
      }
    },
    "npm:iconv-lite@0.4.23": {
      "map": {
        "safer-buffer": "npm:safer-buffer@2.1.2"
      }
    },
    "npm:string_decoder@1.1.1": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:jspm-nodelibs-domain@0.2.1": {
      "map": {
        "domain-browser": "npm:domain-browser@1.2.0"
      }
    },
    "npm:jspm-nodelibs-url@0.2.1": {
      "map": {
        "url": "npm:url@0.11.0"
      }
    },
    "npm:jspm-nodelibs-zlib@0.2.3": {
      "map": {
        "browserify-zlib": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.6",
        "pako": "npm:pako@0.2.9"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.8.3"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.2": {
      "map": {
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:stream-http@2.8.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.3.6",
        "builtin-status-codes": "npm:builtin-status-codes@3.0.0",
        "xtend": "npm:xtend@4.0.1",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.3": {
      "map": {
        "buffer": "npm:buffer@5.1.0"
      }
    },
    "npm:buffer@5.1.0": {
      "map": {
        "ieee754": "npm:ieee754@1.1.12",
        "base64-js": "npm:base64-js@1.3.0"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.1": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.12.0"
      }
    },
    "npm:jspm-nodelibs-os@0.2.2": {
      "map": {
        "os-browserify": "npm:os-browserify@0.3.0"
      }
    },
    "npm:crypto-browserify@3.12.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "create-ecdh": "npm:create-ecdh@4.0.3",
        "create-hash": "npm:create-hash@1.2.0",
        "randombytes": "npm:randombytes@2.0.6",
        "pbkdf2": "npm:pbkdf2@3.0.16",
        "create-hmac": "npm:create-hmac@1.1.7",
        "browserify-sign": "npm:browserify-sign@4.0.4",
        "public-encrypt": "npm:public-encrypt@4.0.2",
        "diffie-hellman": "npm:diffie-hellman@5.0.3",
        "randomfill": "npm:randomfill@1.0.4",
        "browserify-cipher": "npm:browserify-cipher@1.0.1"
      }
    },
    "npm:create-hash@1.2.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "md5.js": "npm:md5.js@1.3.4",
        "ripemd160": "npm:ripemd160@2.0.2",
        "cipher-base": "npm:cipher-base@1.0.4",
        "sha.js": "npm:sha.js@2.4.11"
      }
    },
    "npm:browserify-sign@4.0.4": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "create-hmac": "npm:create-hmac@1.1.7",
        "inherits": "npm:inherits@2.0.3",
        "bn.js": "npm:bn.js@4.11.8",
        "elliptic": "npm:elliptic@6.4.0",
        "parse-asn1": "npm:parse-asn1@5.1.1",
        "browserify-rsa": "npm:browserify-rsa@4.0.1"
      }
    },
    "npm:randombytes@2.0.6": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:public-encrypt@4.0.2": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "randombytes": "npm:randombytes@2.0.6",
        "bn.js": "npm:bn.js@4.11.8",
        "parse-asn1": "npm:parse-asn1@5.1.1",
        "browserify-rsa": "npm:browserify-rsa@4.0.1"
      }
    },
    "npm:diffie-hellman@5.0.3": {
      "map": {
        "randombytes": "npm:randombytes@2.0.6",
        "bn.js": "npm:bn.js@4.11.8",
        "miller-rabin": "npm:miller-rabin@4.0.1"
      }
    },
    "npm:create-hmac@1.1.7": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "ripemd160": "npm:ripemd160@2.0.2",
        "cipher-base": "npm:cipher-base@1.0.4",
        "sha.js": "npm:sha.js@2.4.11"
      }
    },
    "npm:pbkdf2@3.0.16": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "create-hmac": "npm:create-hmac@1.1.7",
        "ripemd160": "npm:ripemd160@2.0.2",
        "sha.js": "npm:sha.js@2.4.11"
      }
    },
    "npm:randomfill@1.0.4": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "randombytes": "npm:randombytes@2.0.6"
      }
    },
    "npm:create-ecdh@4.0.3": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "elliptic": "npm:elliptic@6.4.0"
      }
    },
    "npm:elliptic@6.4.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.3",
        "hmac-drbg": "npm:hmac-drbg@1.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1",
        "hash.js": "npm:hash.js@1.1.4",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:md5.js@1.3.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "hash-base": "npm:hash-base@3.0.4"
      }
    },
    "npm:ripemd160@2.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "hash-base": "npm:hash-base@3.0.4"
      }
    },
    "npm:parse-asn1@5.1.1": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "pbkdf2": "npm:pbkdf2@3.0.16",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "browserify-aes": "npm:browserify-aes@1.2.0",
        "asn1.js": "npm:asn1.js@4.10.1"
      }
    },
    "npm:sha.js@2.4.11": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:cipher-base@1.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:browserify-cipher@1.0.1": {
      "map": {
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "browserify-aes": "npm:browserify-aes@1.2.0",
        "browserify-des": "npm:browserify-des@1.0.1"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "randombytes": "npm:randombytes@2.0.6",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:miller-rabin@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:browserify-aes@1.2.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "create-hash": "npm:create-hash@1.2.0",
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:evp_bytestokey@1.0.3": {
      "map": {
        "md5.js": "npm:md5.js@1.3.4",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:browserify-des@1.0.1": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "inherits": "npm:inherits@2.0.3",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:hash.js@1.1.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:hmac-drbg@1.0.1": {
      "map": {
        "hash.js": "npm:hash.js@1.1.4",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:asn1.js@4.10.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:hash-base@3.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    }
  }
});
