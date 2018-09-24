SystemJS.config({
  browserConfig: {
    "paths": {
      "npm:": "/jspm_packages/npm/"
    }
  },
  packages: {
    "": {
      "defaultExtension": "js"
    },
  },
  map: {
    "reactxx-fela": "deploy/lib/fela/index",

    "reactxx-core/tests/index": "deploy/lib/core/tests/index",
    "reactxx-core": "deploy/lib/core/index",

    "reactxx-primitives": "deploy/lib/primitives/index",
    "reactxx-primitives/tests/index": "deploy/lib/primitives/tests/index",

    // "reactxx-sheeter": "deploy/lib/sheeter/index",
    // "reactxx-basic": "deploy/lib/basic/index",
    // "reactxx-animation": "deploy/lib/animation/index",
    // "reactxx-mediaq": "deploy/lib/mediaq/index",
    // "reactxx": "deploy/lib/reactxx/index",
    // "reactxx-mui-web": "deploy/lib/mui-web",
    // "reactxx-icons": "deploy/lib/icons",
    // "reactxx-muix": "deploy/lib/muix"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "css-in-js-utils": "npm:css-in-js-utils@2.0.1",
    "isobject": "npm:isobject@3.0.1",
    "fela-utils": "npm:fela-utils@8.1.0",
    "lodash": "npm:lodash@4.17.10",
    "dns": "npm:jspm-nodelibs-dns@0.2.1",
    "hast-util-sanitize": "npm:hast-util-sanitize@1.2.0",
    "net": "npm:jspm-nodelibs-net@0.2.1",
    "react-swipeable-views": "npm:react-swipeable-views@0.12.16",
    "@types/react": "npm:@types/react@16.4.7",
    "react-number-format": "npm:react-number-format@3.5.0",
    "react-text-mask": "npm:react-text-mask@5.4.3",
    "classnames": "npm:classnames@2.2.6",
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "brcast": "npm:brcast@3.0.1",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
    "constants": "npm:jspm-nodelibs-constants@0.2.1",
    "core-js": "npm:core-js@2.5.7",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
    "csstype": "npm:csstype@2.5.6",
    "debounce": "npm:debounce@1.1.0",
    "deepmerge": "npm:deepmerge@2.1.1",
    "dom-helpers": "npm:dom-helpers@3.3.1",
    "domain": "npm:jspm-nodelibs-domain@0.2.1",
    "events": "npm:jspm-nodelibs-events@0.2.2",
    "fela": "npm:fela@6.1.9",
    "fela-dom": "npm:fela-dom@7.0.9",
    "fela-plugin-extend": "npm:fela-plugin-extend@6.0.7",
    "fela-plugin-fallback-value": "npm:fela-plugin-fallback-value@5.0.18",
    "fela-plugin-lvha": "npm:fela-plugin-lvha@5.0.15",
    "fela-plugin-prefixer": "npm:fela-plugin-prefixer@5.0.19",
    "fela-plugin-rtl": "npm:fela-plugin-rtl@1.0.6",
    "fela-plugin-unit": "npm:fela-plugin-unit@5.1.0",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "hoist-non-react-statics": "npm:hoist-non-react-statics@2.5.5",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.2",
    "is-plain-object": "npm:is-plain-object@2.0.4",
    "jss": "npm:jss@9.8.7",
    "jss-camel-case": "npm:jss-camel-case@6.1.0",
    "jss-default-unit": "npm:jss-default-unit@8.0.2",
    "jss-global": "npm:jss-global@3.0.0",
    "jss-nested": "npm:jss-nested@6.0.1",
    "jss-preset-default": "npm:jss-preset-default@4.5.0",
    "jss-props-sort": "npm:jss-props-sort@6.0.0",
    "jss-vendor-prefixer": "npm:jss-vendor-prefixer@7.0.0",
    "keycode": "npm:keycode@2.2.0",
    "normalize-scroll-left": "npm:normalize-scroll-left@0.1.2",
    "os": "npm:jspm-nodelibs-os@0.2.2",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "popper.js": "npm:popper.js@1.14.3",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "prop-types": "npm:prop-types@15.6.2",
    "react": "npm:react@16.4.1",
    "react-dom": "npm:react-dom@16.4.1",
    "react-event-listener": "npm:react-event-listener@0.6.2",
    "react-jss": "npm:react-jss@8.6.1",
    "react-popper": "npm:react-popper@0.10.4",
    "react-transition-group": "npm:react-transition-group@2.4.0",
    "reactxx-mdi": "npm:reactxx-mdi@0.1.67",
    "downshift": "npm:downshift@2.0.19",
    "recompose": "npm:recompose@0.29.0",
    "remark": "npm:remark@9.0.0",
    "remark-generic-extensions": "npm:remark-generic-extensions@1.3.0",
    "remark-react": "npm:remark-react@4.0.3",
    "scroll": "npm:scroll@2.0.3",
    "stream": "npm:jspm-nodelibs-stream@0.2.1",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.2",
    "tslib": "npm:tslib@1.9.3",
    "url": "npm:jspm-nodelibs-url@0.2.1",
    "util": "npm:jspm-nodelibs-util@0.2.2",
    "vm": "npm:jspm-nodelibs-vm@0.2.1",
    "warning": "npm:warning@3.0.0",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.3"
  },
  packages: {
    "npm:react-transition-group@2.4.0": {
      "map": {
        "dom-helpers": "npm:dom-helpers@3.3.1",
        "prop-types": "npm:prop-types@15.6.2",
        "loose-envify": "npm:loose-envify@1.4.0",
        "react-lifecycles-compat": "npm:react-lifecycles-compat@3.0.4"
      }
    },
    "npm:react-jss@8.6.1": {
      "map": {
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.5.5",
        "jss": "npm:jss@9.8.7",
        "jss-preset-default": "npm:jss-preset-default@4.5.0",
        "prop-types": "npm:prop-types@15.6.2",
        "theming": "npm:theming@1.3.0"
      }
    },
    "npm:jss@9.8.7": {
      "map": {
        "warning": "npm:warning@3.0.0",
        "symbol-observable": "npm:symbol-observable@1.2.0",
        "is-in-browser": "npm:is-in-browser@1.1.3"
      }
    },
    "npm:fela-plugin-prefixer@5.0.19": {
      "map": {
        "fela-plugin-fallback-value": "npm:fela-plugin-fallback-value@5.0.18",
        "isobject": "npm:isobject@3.0.1",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.1",
        "inline-style-prefixer": "npm:inline-style-prefixer@4.0.2",
        "fast-loops": "npm:fast-loops@1.0.1"
      }
    },
    "npm:jss-nested@6.0.1": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:react-popper@0.10.4": {
      "map": {
        "popper.js": "npm:popper.js@1.14.3",
        "prop-types": "npm:prop-types@15.6.2"
      }
    },
    "npm:jss-preset-default@4.5.0": {
      "map": {
        "jss-default-unit": "npm:jss-default-unit@8.0.2",
        "jss-global": "npm:jss-global@3.0.0",
        "jss-nested": "npm:jss-nested@6.0.1",
        "jss-props-sort": "npm:jss-props-sort@6.0.0",
        "jss-vendor-prefixer": "npm:jss-vendor-prefixer@7.0.0",
        "jss-camel-case": "npm:jss-camel-case@6.1.0",
        "jss-extend": "npm:jss-extend@6.2.0",
        "jss-expand": "npm:jss-expand@5.3.0",
        "jss-template": "npm:jss-template@1.0.1",
        "jss-compose": "npm:jss-compose@5.0.0"
      }
    },
    "npm:react@16.4.1": {
      "map": {
        "prop-types": "npm:prop-types@15.6.2",
        "loose-envify": "npm:loose-envify@1.4.0",
        "fbjs": "npm:fbjs@0.8.17",
        "object-assign": "npm:object-assign@4.1.1"
      }
    },
    "npm:react-dom@16.4.1": {
      "map": {
        "prop-types": "npm:prop-types@15.6.2",
        "loose-envify": "npm:loose-envify@1.4.0",
        "fbjs": "npm:fbjs@0.8.17",
        "object-assign": "npm:object-assign@4.1.1"
      }
    },
    "npm:warning@3.0.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0"
      }
    },
    "npm:prop-types@15.6.2": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0",
        "object-assign": "npm:object-assign@4.1.1"
      }
    },
    "npm:fela-plugin-fallback-value@5.0.18": {
      "map": {
        "isobject": "npm:isobject@3.0.1",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.1"
      }
    },
    "npm:is-plain-object@2.0.4": {
      "map": {
        "isobject": "npm:isobject@3.0.1"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.2": {
      "map": {
        "string_decoder": "npm:string_decoder@0.10.31"
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
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.8.3"
      }
    },
    "npm:jspm-nodelibs-os@0.2.2": {
      "map": {
        "os-browserify": "npm:os-browserify@0.3.0"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.1": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.3": {
      "map": {
        "buffer": "npm:buffer@5.2.0"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.1": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.12.0"
      }
    },
    "npm:jspm-nodelibs-domain@0.2.1": {
      "map": {
        "domain-browser": "npm:domain-browser@1.2.0"
      }
    },
    "npm:jss-camel-case@6.1.0": {
      "map": {
        "hyphenate-style-name": "npm:hyphenate-style-name@1.0.2"
      }
    },
    "npm:css-in-js-utils@2.0.1": {
      "map": {
        "hyphenate-style-name": "npm:hyphenate-style-name@1.0.2",
        "isobject": "npm:isobject@3.0.1"
      }
    },
    "npm:downshift@2.0.19": {
      "map": {
        "prop-types": "npm:prop-types@15.6.2",
        "compute-scroll-into-view": "npm:compute-scroll-into-view@1.0.7"
      }
    },
    "npm:warning@4.0.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0"
      }
    },
    "npm:scroll@2.0.3": {
      "map": {
        "rafl": "npm:rafl@1.2.2"
      }
    },
    "npm:fela-plugin-rtl@1.0.6": {
      "map": {
        "rtl-css-js": "npm:rtl-css-js@1.10.0"
      }
    },
    "npm:theming@1.3.0": {
      "map": {
        "brcast": "npm:brcast@3.0.1",
        "is-plain-object": "npm:is-plain-object@2.0.4",
        "prop-types": "npm:prop-types@15.6.2",
        "is-function": "npm:is-function@1.0.1"
      }
    },
    "npm:fbjs@0.8.17": {
      "map": {
        "core-js": "npm:core-js@1.2.7",
        "object-assign": "npm:object-assign@4.1.1",
        "loose-envify": "npm:loose-envify@1.4.0",
        "promise": "npm:promise@7.3.1",
        "setimmediate": "npm:setimmediate@1.0.5",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.18"
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
    "npm:babel-runtime@6.26.0": {
      "map": {
        "core-js": "npm:core-js@2.5.7",
        "regenerator-runtime": "npm:regenerator-runtime@0.11.1"
      }
    },
    "npm:inline-style-prefixer@4.0.2": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.1",
        "bowser": "npm:bowser@1.9.4"
      }
    },
    "npm:loose-envify@1.4.0": {
      "map": {
        "js-tokens": "npm:js-tokens@4.0.0"
      }
    },
    "npm:fela-plugin-lvha@5.0.15": {
      "map": {
        "fast-loops": "npm:fast-loops@1.0.1"
      }
    },
    "npm:jss-vendor-prefixer@7.0.0": {
      "map": {
        "css-vendor": "npm:css-vendor@0.3.8"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.6",
        "pako": "npm:pako@0.2.9"
      }
    },
    "npm:stream-http@2.8.3": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.6",
        "builtin-status-codes": "npm:builtin-status-codes@3.0.0",
        "inherits": "npm:inherits@2.0.3",
        "xtend": "npm:xtend@4.0.1",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.6",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:crypto-browserify@3.12.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "browserify-cipher": "npm:browserify-cipher@1.0.1",
        "randomfill": "npm:randomfill@1.0.4",
        "create-hash": "npm:create-hash@1.2.0",
        "create-hmac": "npm:create-hmac@1.1.7",
        "diffie-hellman": "npm:diffie-hellman@5.0.3",
        "browserify-sign": "npm:browserify-sign@4.0.4",
        "randombytes": "npm:randombytes@2.0.6",
        "public-encrypt": "npm:public-encrypt@4.0.2",
        "create-ecdh": "npm:create-ecdh@4.0.3",
        "pbkdf2": "npm:pbkdf2@3.0.16"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:fela-plugin-extend@6.0.7": {
      "map": {
        "isobject": "npm:isobject@3.0.1",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.1",
        "fast-loops": "npm:fast-loops@1.0.1",
        "fela-plugin-remove-undefined": "npm:fela-plugin-remove-undefined@5.0.21"
      }
    },
    "npm:fela-dom@7.0.9": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.1",
        "fast-loops": "npm:fast-loops@1.0.1",
        "fela-utils": "npm:fela-utils@8.0.8"
      }
    },
    "npm:fela-plugin-unit@5.1.0": {
      "map": {
        "isobject": "npm:isobject@3.0.1",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.1"
      }
    },
    "npm:fela-utils@8.0.8": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.1",
        "fast-loops": "npm:fast-loops@1.0.1",
        "string-hash": "npm:string-hash@1.1.3"
      }
    },
    "npm:rafl@1.2.2": {
      "map": {
        "global": "npm:global@4.3.2"
      }
    },
    "npm:readable-stream@2.3.6": {
      "map": {
        "string_decoder": "npm:string_decoder@1.1.1",
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "core-util-is": "npm:core-util-is@1.0.2",
        "isarray": "npm:isarray@1.0.0",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "process-nextick-args": "npm:process-nextick-args@2.0.0"
      }
    },
    "npm:css-vendor@0.3.8": {
      "map": {
        "is-in-browser": "npm:is-in-browser@1.1.3"
      }
    },
    "npm:pbkdf2@3.0.16": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "create-hmac": "npm:create-hmac@1.1.7",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "sha.js": "npm:sha.js@2.4.11",
        "ripemd160": "npm:ripemd160@2.0.2"
      }
    },
    "npm:create-hmac@1.1.7": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "sha.js": "npm:sha.js@2.4.11",
        "ripemd160": "npm:ripemd160@2.0.2",
        "cipher-base": "npm:cipher-base@1.0.4"
      }
    },
    "npm:randomfill@1.0.4": {
      "map": {
        "randombytes": "npm:randombytes@2.0.6",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:diffie-hellman@5.0.3": {
      "map": {
        "randombytes": "npm:randombytes@2.0.6",
        "miller-rabin": "npm:miller-rabin@4.0.1",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:browserify-sign@4.0.4": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "create-hmac": "npm:create-hmac@1.1.7",
        "inherits": "npm:inherits@2.0.3",
        "elliptic": "npm:elliptic@6.4.1",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.1.1",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:public-encrypt@4.0.2": {
      "map": {
        "randombytes": "npm:randombytes@2.0.6",
        "create-hash": "npm:create-hash@1.2.0",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.1.1",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:create-hash@1.2.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "sha.js": "npm:sha.js@2.4.11",
        "md5.js": "npm:md5.js@1.3.4",
        "ripemd160": "npm:ripemd160@2.0.2",
        "cipher-base": "npm:cipher-base@1.0.4"
      }
    },
    "npm:randombytes@2.0.6": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:browserify-cipher@1.0.1": {
      "map": {
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "browserify-aes": "npm:browserify-aes@1.2.0",
        "browserify-des": "npm:browserify-des@1.0.2"
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
    "npm:create-ecdh@4.0.3": {
      "map": {
        "elliptic": "npm:elliptic@6.4.1",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:string_decoder@1.1.1": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:global@4.3.2": {
      "map": {
        "min-document": "npm:min-document@2.19.0",
        "node-min-document": "npm:min-document@2.19.0",
        "process": "npm:process@0.5.2"
      }
    },
    "npm:browserify-aes@1.2.0": {
      "map": {
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "inherits": "npm:inherits@2.0.3",
        "create-hash": "npm:create-hash@1.2.0",
        "cipher-base": "npm:cipher-base@1.0.4",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:browserify-des@1.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.4",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:evp_bytestokey@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "md5.js": "npm:md5.js@1.3.4"
      }
    },
    "npm:parse-asn1@5.1.1": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.2.0",
        "create-hash": "npm:create-hash@1.2.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "pbkdf2": "npm:pbkdf2@3.0.16",
        "asn1.js": "npm:asn1.js@4.10.1"
      }
    },
    "npm:ripemd160@2.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "hash-base": "npm:hash-base@3.0.4"
      }
    },
    "npm:md5.js@1.3.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "hash-base": "npm:hash-base@3.0.4"
      }
    },
    "npm:cipher-base@1.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "randombytes": "npm:randombytes@2.0.6",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:sha.js@2.4.11": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:miller-rabin@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:node-fetch@1.7.3": {
      "map": {
        "encoding": "npm:encoding@0.1.12",
        "is-stream": "npm:is-stream@1.1.0"
      }
    },
    "npm:min-document@2.19.0": {
      "map": {
        "dom-walk": "npm:dom-walk@0.1.1"
      }
    },
    "npm:fela-plugin-remove-undefined@5.0.21": {
      "map": {
        "isobject": "npm:isobject@3.0.1",
        "fela-utils": "npm:fela-utils@8.0.8"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:hash.js@1.1.5": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
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
    "npm:hmac-drbg@1.0.1": {
      "map": {
        "hash.js": "npm:hash.js@1.1.5",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
      }
    },
    "npm:hash-base@3.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.24"
      }
    },
    "npm:fela@6.1.9": {
      "map": {
        "fast-loops": "npm:fast-loops@1.0.1",
        "fela-utils": "npm:fela-utils@8.0.8",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.1",
        "isobject": "npm:isobject@3.0.1"
      }
    },
    "npm:react-number-format@3.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "prop-types": "npm:prop-types@15.6.2"
      }
    },
    "npm:react-text-mask@5.4.3": {
      "map": {
        "prop-types": "npm:prop-types@15.6.2"
      }
    },
    "npm:@types/react@16.4.7": {
      "map": {
        "csstype": "npm:csstype@2.5.6"
      }
    },
    "npm:buffer@5.2.0": {
      "map": {
        "base64-js": "npm:base64-js@1.3.0",
        "ieee754": "npm:ieee754@1.1.12"
      }
    },
    "npm:react-swipeable-views@0.12.16": {
      "map": {
        "dom-helpers": "npm:dom-helpers@3.3.1",
        "warning": "npm:warning@4.0.1",
        "prop-types": "npm:prop-types@15.6.2",
        "@babel/runtime": "npm:@babel/runtime@7.0.0-beta.42",
        "react-swipeable-views-core": "npm:react-swipeable-views-core@0.12.16",
        "react-swipeable-views-utils": "npm:react-swipeable-views-utils@0.12.16"
      }
    },
    "npm:@babel/runtime@7.0.0-beta.42": {
      "map": {
        "regenerator-runtime": "npm:regenerator-runtime@0.11.1",
        "core-js": "npm:core-js@2.5.7"
      }
    },
    "npm:react-swipeable-views-core@0.12.16": {
      "map": {
        "@babel/runtime": "npm:@babel/runtime@7.0.0-beta.42",
        "warning": "npm:warning@4.0.1"
      }
    },
    "npm:react-swipeable-views-utils@0.12.16": {
      "map": {
        "@babel/runtime": "npm:@babel/runtime@7.0.0-beta.42",
        "fbjs": "npm:fbjs@0.8.17",
        "prop-types": "npm:prop-types@15.6.2",
        "react-swipeable-views-core": "npm:react-swipeable-views-core@0.12.16",
        "keycode": "npm:keycode@2.2.0",
        "react-event-listener": "npm:react-event-listener@0.6.2"
      }
    },
    "npm:react-event-listener@0.6.2": {
      "map": {
        "@babel/runtime": "npm:@babel/runtime@7.0.0-beta.42",
        "prop-types": "npm:prop-types@15.6.2",
        "warning": "npm:warning@4.0.1"
      }
    },
    "npm:elliptic@6.4.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.3",
        "brorand": "npm:brorand@1.1.0",
        "hash.js": "npm:hash.js@1.1.5",
        "hmac-drbg": "npm:hmac-drbg@1.0.1",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:remark-generic-extensions@1.3.0": {
      "map": {
        "deepmerge": "npm:deepmerge@1.5.2",
        "core-js": "npm:core-js@2.5.7",
        "joi-browser": "npm:joi-browser@10.6.1",
        "joi": "npm:joi@10.6.0",
        "node-joi": "npm:joi@10.6.0"
      }
    },
    "npm:remark-react@4.0.3": {
      "map": {
        "hast-util-sanitize": "npm:hast-util-sanitize@1.2.0",
        "hast-to-hyperscript": "npm:hast-to-hyperscript@4.0.0",
        "mdast-util-to-hast": "npm:mdast-util-to-hast@3.0.2",
        "@mapbox/hast-util-table-cell-style": "npm:@mapbox/hast-util-table-cell-style@0.1.3"
      }
    },
    "npm:remark@9.0.0": {
      "map": {
        "remark-parse": "npm:remark-parse@5.0.0",
        "remark-stringify": "npm:remark-stringify@5.0.0",
        "unified": "npm:unified@6.2.0"
      }
    },
    "npm:hast-util-sanitize@1.2.0": {
      "map": {
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:remark-parse@5.0.0": {
      "map": {
        "xtend": "npm:xtend@4.0.1",
        "trim": "npm:trim@0.0.1",
        "is-decimal": "npm:is-decimal@1.0.2",
        "is-alphabetical": "npm:is-alphabetical@1.0.2",
        "is-word-character": "npm:is-word-character@1.0.2",
        "markdown-escapes": "npm:markdown-escapes@1.0.2",
        "collapse-white-space": "npm:collapse-white-space@1.0.4",
        "unherit": "npm:unherit@1.1.1",
        "is-whitespace-character": "npm:is-whitespace-character@1.0.2",
        "vfile-location": "npm:vfile-location@2.0.3",
        "state-toggle": "npm:state-toggle@1.0.1",
        "unist-util-remove-position": "npm:unist-util-remove-position@1.1.2",
        "parse-entities": "npm:parse-entities@1.1.2",
        "repeat-string": "npm:repeat-string@1.6.1",
        "trim-trailing-lines": "npm:trim-trailing-lines@1.1.1"
      }
    },
    "npm:remark-stringify@5.0.0": {
      "map": {
        "xtend": "npm:xtend@4.0.1",
        "is-decimal": "npm:is-decimal@1.0.2",
        "markdown-escapes": "npm:markdown-escapes@1.0.2",
        "unherit": "npm:unherit@1.1.1",
        "is-whitespace-character": "npm:is-whitespace-character@1.0.2",
        "state-toggle": "npm:state-toggle@1.0.1",
        "parse-entities": "npm:parse-entities@1.1.2",
        "repeat-string": "npm:repeat-string@1.6.1",
        "is-alphanumeric": "npm:is-alphanumeric@1.0.0",
        "longest-streak": "npm:longest-streak@2.0.2",
        "ccount": "npm:ccount@1.0.3",
        "mdast-util-compact": "npm:mdast-util-compact@1.0.2",
        "stringify-entities": "npm:stringify-entities@1.3.2",
        "markdown-table": "npm:markdown-table@1.1.2"
      }
    },
    "npm:mdast-util-to-hast@3.0.2": {
      "map": {
        "xtend": "npm:xtend@4.0.1",
        "trim": "npm:trim@0.0.1",
        "collapse-white-space": "npm:collapse-white-space@1.0.4",
        "trim-lines": "npm:trim-lines@1.1.1",
        "unist-util-position": "npm:unist-util-position@3.0.1",
        "mdurl": "npm:mdurl@1.0.1",
        "unist-util-generated": "npm:unist-util-generated@1.1.2",
        "detab": "npm:detab@2.0.1",
        "unist-builder": "npm:unist-builder@1.0.3",
        "mdast-util-definitions": "npm:mdast-util-definitions@1.2.3",
        "unist-util-visit": "npm:unist-util-visit@1.4.0"
      }
    },
    "npm:hast-to-hyperscript@4.0.0": {
      "map": {
        "trim": "npm:trim@0.0.1",
        "is-nan": "npm:is-nan@1.2.1",
        "kebab-case": "npm:kebab-case@1.0.0",
        "comma-separated-tokens": "npm:comma-separated-tokens@1.0.5",
        "space-separated-tokens": "npm:space-separated-tokens@1.1.2",
        "unist-util-is": "npm:unist-util-is@2.1.2",
        "property-information": "npm:property-information@3.2.0"
      }
    },
    "npm:unherit@1.1.1": {
      "map": {
        "xtend": "npm:xtend@4.0.1",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:parse-entities@1.1.2": {
      "map": {
        "is-decimal": "npm:is-decimal@1.0.2",
        "character-entities-legacy": "npm:character-entities-legacy@1.1.2",
        "character-entities": "npm:character-entities@1.2.2",
        "character-reference-invalid": "npm:character-reference-invalid@1.1.2",
        "is-hexadecimal": "npm:is-hexadecimal@1.0.2",
        "is-alphanumerical": "npm:is-alphanumerical@1.0.2"
      }
    },
    "npm:unified@6.2.0": {
      "map": {
        "is-plain-obj": "npm:is-plain-obj@1.1.0",
        "x-is-string": "npm:x-is-string@0.1.0",
        "bail": "npm:bail@1.0.3",
        "trough": "npm:trough@1.0.3",
        "extend": "npm:extend@3.0.2",
        "vfile": "npm:vfile@2.3.0"
      }
    },
    "npm:unist-util-remove-position@1.1.2": {
      "map": {
        "unist-util-visit": "npm:unist-util-visit@1.4.0"
      }
    },
    "npm:mdast-util-compact@1.0.2": {
      "map": {
        "unist-util-visit": "npm:unist-util-visit@1.4.0"
      }
    },
    "npm:comma-separated-tokens@1.0.5": {
      "map": {
        "trim": "npm:trim@0.0.1"
      }
    },
    "npm:detab@2.0.1": {
      "map": {
        "repeat-string": "npm:repeat-string@1.6.1"
      }
    },
    "npm:space-separated-tokens@1.1.2": {
      "map": {
        "trim": "npm:trim@0.0.1"
      }
    },
    "npm:mdast-util-definitions@1.2.3": {
      "map": {
        "unist-util-visit": "npm:unist-util-visit@1.4.0"
      }
    },
    "npm:@mapbox/hast-util-table-cell-style@0.1.3": {
      "map": {
        "unist-util-visit": "npm:unist-util-visit@1.4.0"
      }
    },
    "npm:stringify-entities@1.3.2": {
      "map": {
        "character-entities-legacy": "npm:character-entities-legacy@1.1.2",
        "is-hexadecimal": "npm:is-hexadecimal@1.0.2",
        "is-alphanumerical": "npm:is-alphanumerical@1.0.2",
        "character-entities-html4": "npm:character-entities-html4@1.1.2"
      }
    },
    "npm:unist-builder@1.0.3": {
      "map": {
        "object-assign": "npm:object-assign@4.1.1"
      }
    },
    "npm:is-alphanumerical@1.0.2": {
      "map": {
        "is-alphabetical": "npm:is-alphabetical@1.0.2",
        "is-decimal": "npm:is-decimal@1.0.2"
      }
    },
    "npm:is-nan@1.2.1": {
      "map": {
        "define-properties": "npm:define-properties@1.1.3"
      }
    },
    "npm:joi@10.6.0": {
      "map": {
        "items": "npm:items@2.1.1",
        "topo": "npm:topo@2.0.2",
        "isemail": "npm:isemail@2.2.1",
        "hoek": "npm:hoek@4.2.1"
      }
    },
    "npm:unist-util-visit@1.4.0": {
      "map": {
        "unist-util-visit-parents": "npm:unist-util-visit-parents@2.0.1"
      }
    },
    "npm:vfile@2.3.0": {
      "map": {
        "replace-ext": "npm:replace-ext@1.0.0",
        "unist-util-stringify-position": "npm:unist-util-stringify-position@1.1.2",
        "is-buffer": "npm:is-buffer@1.1.6",
        "vfile-message": "npm:vfile-message@1.0.1"
      }
    },
    "npm:unist-util-visit-parents@2.0.1": {
      "map": {
        "unist-util-is": "npm:unist-util-is@2.1.2"
      }
    },
    "npm:vfile-message@1.0.1": {
      "map": {
        "unist-util-stringify-position": "npm:unist-util-stringify-position@1.1.2"
      }
    },
    "npm:topo@2.0.2": {
      "map": {
        "hoek": "npm:hoek@4.2.1"
      }
    },
    "npm:define-properties@1.1.3": {
      "map": {
        "object-keys": "npm:object-keys@1.0.12"
      }
    },
    "npm:recompose@0.29.0": {
      "map": {
        "@babel/runtime": "npm:@babel/runtime@7.0.0",
        "fbjs": "npm:fbjs@0.8.17",
        "symbol-observable": "npm:symbol-observable@1.2.0",
        "react-lifecycles-compat": "npm:react-lifecycles-compat@3.0.4",
        "change-emitter": "npm:change-emitter@0.1.6",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.5.5"
      }
    },
    "npm:@babel/runtime@7.0.0": {
      "map": {
        "regenerator-runtime": "npm:regenerator-runtime@0.12.1"
      }
    },
    "npm:iconv-lite@0.4.24": {
      "map": {
        "safer-buffer": "npm:safer-buffer@2.1.2"
      }
    },
    "npm:fela-utils@8.1.0": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.1",
        "string-hash": "npm:string-hash@1.1.3",
        "fast-loops": "npm:fast-loops@1.0.1"
      }
    }
  }
});
