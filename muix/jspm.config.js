SystemJS.config({
  browserConfig: {
    "paths": {
      "npm:": "/jspm_packages/npm/"
    }
  },
  packages: {
    "": {
      "defaultExtension": "js"
    }
  },
  map: {
    "reactxx": "deploy/lib/reactxx/web/index",
    "reactxx/web": "deploy/lib/reactxx/web/index",
    "reactxx-stateman": "deploy/lib/stateman/index",
    "reactxx-mui": "deploy/lib/mui/web"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
    "classnames": "npm:classnames@2.2.5",
    "constants": "npm:jspm-nodelibs-constants@0.2.1",
    "core-js": "npm:core-js@2.5.3",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
    "deepmerge": "npm:deepmerge@2.1.0",
    "domain": "npm:jspm-nodelibs-domain@0.2.1",
    "events": "npm:jspm-nodelibs-events@0.2.2",
    "fela": "npm:fela@6.1.4",
    "fela-dom": "npm:fela-dom@7.0.5",
    "fela-plugin-extend": "npm:fela-plugin-extend@6.0.3",
    "fela-plugin-fallback-value": "npm:fela-plugin-fallback-value@5.0.16",
    "fela-plugin-lvha": "npm:fela-plugin-lvha@5.0.15",
    "fela-plugin-prefixer": "npm:fela-plugin-prefixer@5.0.17",
    "fela-plugin-rtl": "npm:fela-plugin-rtl@1.0.6",
    "fela-plugin-unit": "npm:fela-plugin-unit@5.0.15",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "hoist-non-react-statics": "npm:hoist-non-react-statics@2.5.0",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.2",
    "jss": "npm:jss@9.8.0",
    "jss-preset-default": "npm:jss-preset-default@4.3.0",
    "material-ui": "npm:material-ui@next",
    "os": "npm:jspm-nodelibs-os@0.2.2",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "prop-types": "npm:prop-types@15.6.1",
    "react": "npm:react@16.2.0",
    "react-dom": "npm:react-dom@16.2.0",
    "react-jss": "npm:react-jss@8.3.3",
    "reactxx-mdi": "npm:reactxx-mdi@0.1.63",
    "stream": "npm:jspm-nodelibs-stream@0.2.1",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.2",
    "tslib": "npm:tslib@1.9.0",
    "url": "npm:jspm-nodelibs-url@0.2.1",
    "util": "npm:jspm-nodelibs-util@0.2.2",
    "vm": "npm:jspm-nodelibs-vm@0.2.1",
    "warning": "npm:warning@3.0.0",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.3"
  },
  packages: {
    "npm:fela-plugin-prefixer@5.0.17": {
      "map": {
        "fela-plugin-fallback-value": "npm:fela-plugin-fallback-value@5.0.16",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "fast-loops": "npm:fast-loops@1.0.0",
        "inline-style-prefixer": "npm:inline-style-prefixer@4.0.0"
      }
    },
    "npm:react-jss@8.3.3": {
      "map": {
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.5.0",
        "jss-preset-default": "npm:jss-preset-default@4.3.0",
        "prop-types": "npm:prop-types@15.6.1",
        "theming": "npm:theming@1.3.0",
        "jss": "npm:jss@9.8.0"
      }
    },
    "npm:material-ui@next": {
      "map": {
        "classnames": "npm:classnames@2.2.5",
        "deepmerge": "npm:deepmerge@2.1.0",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.5.0",
        "prop-types": "npm:prop-types@15.6.1",
        "react-jss": "npm:react-jss@8.3.3",
        "warning": "npm:warning@3.0.0",
        "jss-default-unit": "npm:jss-default-unit@8.0.2",
        "jss-camel-case": "npm:jss-camel-case@6.1.0",
        "jss": "npm:jss@9.8.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "keycode": "npm:keycode@2.1.9",
        "brcast": "npm:brcast@3.0.1",
        "jss-nested": "npm:jss-nested@6.0.1",
        "jss-props-sort": "npm:jss-props-sort@6.0.0",
        "jss-global": "npm:jss-global@3.0.0",
        "dom-helpers": "npm:dom-helpers@3.3.1",
        "react-popper": "npm:react-popper@0.8.2",
        "jss-vendor-prefixer": "npm:jss-vendor-prefixer@7.0.0",
        "lodash": "npm:lodash@4.17.5",
        "react-scrollbar-size": "npm:react-scrollbar-size@2.1.0",
        "recompose": "npm:recompose@0.26.0",
        "@types/jss": "npm:@types/jss@9.5.0",
        "scroll": "npm:scroll@2.0.3",
        "react-lifecycles-compat": "npm:react-lifecycles-compat@1.0.2",
        "normalize-scroll-left": "npm:normalize-scroll-left@0.1.2",
        "react-transition-group": "npm:react-transition-group@2.2.1",
        "react-event-listener": "npm:react-event-listener@0.5.3",
        "@types/react-transition-group": "npm:@types/react-transition-group@2.0.7"
      }
    },
    "npm:fela-dom@7.0.5": {
      "map": {
        "fela-utils": "npm:fela-utils@8.0.4",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "fast-loops": "npm:fast-loops@1.0.0"
      }
    },
    "npm:prop-types@15.6.1": {
      "map": {
        "fbjs": "npm:fbjs@0.8.16",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1"
      }
    },
    "npm:fela-plugin-rtl@1.0.6": {
      "map": {
        "rtl-css-js": "npm:rtl-css-js@1.8.0"
      }
    },
    "npm:warning@3.0.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:jss-preset-default@4.3.0": {
      "map": {
        "jss-default-unit": "npm:jss-default-unit@8.0.2",
        "jss-camel-case": "npm:jss-camel-case@6.1.0",
        "jss-compose": "npm:jss-compose@5.0.0",
        "jss-extend": "npm:jss-extend@6.2.0",
        "jss-nested": "npm:jss-nested@6.0.1",
        "jss-props-sort": "npm:jss-props-sort@6.0.0",
        "jss-expand": "npm:jss-expand@5.1.0",
        "jss-global": "npm:jss-global@3.0.0",
        "jss-template": "npm:jss-template@1.0.1",
        "jss-vendor-prefixer": "npm:jss-vendor-prefixer@7.0.0"
      }
    },
    "npm:fela-plugin-extend@6.0.3": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "fast-loops": "npm:fast-loops@1.0.0"
      }
    },
    "npm:fela-plugin-unit@5.0.15": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0"
      }
    },
    "npm:fela-plugin-fallback-value@5.0.16": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0"
      }
    },
    "npm:fela-plugin-lvha@5.0.15": {
      "map": {
        "fast-loops": "npm:fast-loops@1.0.0"
      }
    },
    "npm:fbjs@0.8.16": {
      "map": {
        "core-js": "npm:core-js@1.2.7",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "setimmediate": "npm:setimmediate@1.0.5",
        "ua-parser-js": "npm:ua-parser-js@0.7.17",
        "promise": "npm:promise@7.3.1"
      }
    },
    "npm:fela@6.1.4": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "fast-loops": "npm:fast-loops@1.0.0",
        "fela-utils": "npm:fela-utils@8.0.4"
      }
    },
    "npm:theming@1.3.0": {
      "map": {
        "brcast": "npm:brcast@3.0.1",
        "prop-types": "npm:prop-types@15.6.1",
        "is-function": "npm:is-function@1.0.1",
        "is-plain-object": "npm:is-plain-object@2.0.4"
      }
    },
    "npm:react@16.2.0": {
      "map": {
        "fbjs": "npm:fbjs@0.8.16",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "prop-types": "npm:prop-types@15.6.1"
      }
    },
    "npm:jss-compose@5.0.0": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:fela-utils@8.0.4": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "fast-loops": "npm:fast-loops@1.0.0",
        "string-hash": "npm:string-hash@1.1.3"
      }
    },
    "npm:jss@9.8.0": {
      "map": {
        "warning": "npm:warning@3.0.0",
        "symbol-observable": "npm:symbol-observable@1.2.0",
        "is-in-browser": "npm:is-in-browser@1.1.3"
      }
    },
    "npm:jss-extend@6.2.0": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:babel-runtime@6.26.0": {
      "map": {
        "core-js": "npm:core-js@2.5.3",
        "regenerator-runtime": "npm:regenerator-runtime@0.11.1"
      }
    },
    "npm:jss-nested@6.0.1": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:jss-template@1.0.1": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:react-dom@16.2.0": {
      "map": {
        "fbjs": "npm:fbjs@0.8.16",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "prop-types": "npm:prop-types@15.6.1"
      }
    },
    "npm:react-popper@0.8.2": {
      "map": {
        "prop-types": "npm:prop-types@15.6.1",
        "popper.js": "npm:popper.js@1.13.0"
      }
    },
    "npm:react-scrollbar-size@2.1.0": {
      "map": {
        "prop-types": "npm:prop-types@15.6.1",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "react-event-listener": "npm:react-event-listener@0.5.3",
        "stifle": "npm:stifle@1.0.4"
      }
    },
    "npm:inline-style-prefixer@4.0.0": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "bowser": "npm:bowser@1.9.2"
      }
    },
    "npm:recompose@0.26.0": {
      "map": {
        "fbjs": "npm:fbjs@0.8.16",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.5.0",
        "symbol-observable": "npm:symbol-observable@1.2.0",
        "change-emitter": "npm:change-emitter@0.1.6"
      }
    },
    "npm:jss-camel-case@6.1.0": {
      "map": {
        "hyphenate-style-name": "npm:hyphenate-style-name@1.0.2"
      }
    },
    "npm:css-in-js-utils@2.0.0": {
      "map": {
        "hyphenate-style-name": "npm:hyphenate-style-name@1.0.2"
      }
    },
    "npm:jss-vendor-prefixer@7.0.0": {
      "map": {
        "css-vendor": "npm:css-vendor@0.3.8"
      }
    },
    "npm:loose-envify@1.3.1": {
      "map": {
        "js-tokens": "npm:js-tokens@3.0.2"
      }
    },
    "npm:react-transition-group@2.2.1": {
      "map": {
        "classnames": "npm:classnames@2.2.5",
        "dom-helpers": "npm:dom-helpers@3.3.1",
        "loose-envify": "npm:loose-envify@1.3.1",
        "prop-types": "npm:prop-types@15.6.1",
        "warning": "npm:warning@3.0.0",
        "chain-function": "npm:chain-function@1.0.0"
      }
    },
    "npm:react-event-listener@0.5.3": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "fbjs": "npm:fbjs@0.8.16",
        "prop-types": "npm:prop-types@15.6.1",
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:@types/jss@9.5.0": {
      "map": {
        "csstype": "npm:csstype@1.8.2"
      }
    },
    "npm:scroll@2.0.3": {
      "map": {
        "rafl": "npm:rafl@1.2.2"
      }
    },
    "npm:css-vendor@0.3.8": {
      "map": {
        "is-in-browser": "npm:is-in-browser@1.1.3"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.1": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "whatwg-fetch": "npm:whatwg-fetch@2.0.3",
        "node-fetch": "npm:node-fetch@1.7.3"
      }
    },
    "npm:is-plain-object@2.0.4": {
      "map": {
        "isobject": "npm:isobject@3.0.1"
      }
    },
    "npm:promise@7.3.1": {
      "map": {
        "asap": "npm:asap@2.0.6"
      }
    },
    "npm:rafl@1.2.2": {
      "map": {
        "global": "npm:global@4.3.2"
      }
    },
    "npm:node-fetch@1.7.3": {
      "map": {
        "is-stream": "npm:is-stream@1.1.0",
        "encoding": "npm:encoding@0.1.12"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.5",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:readable-stream@2.3.5": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "isarray": "npm:isarray@1.0.0",
        "core-util-is": "npm:core-util-is@1.0.2",
        "string_decoder": "npm:string_decoder@1.0.3",
        "process-nextick-args": "npm:process-nextick-args@2.0.0"
      }
    },
    "npm:global@4.3.2": {
      "map": {
        "min-document": "npm:min-document@2.19.0",
        "node-min-document": "npm:min-document@2.19.0",
        "process": "npm:process@0.5.2"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.19"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.3": {
      "map": {
        "buffer": "npm:buffer@5.1.0"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.8.0"
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
    "npm:jspm-nodelibs-domain@0.2.1": {
      "map": {
        "domain-browser": "npm:domain-browser@1.2.0"
      }
    },
    "npm:stream-http@2.8.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.3.5",
        "builtin-status-codes": "npm:builtin-status-codes@3.0.0",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:string_decoder@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:min-document@2.19.0": {
      "map": {
        "dom-walk": "npm:dom-walk@0.1.1"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.5",
        "pako": "npm:pako@0.2.9"
      }
    },
    "npm:buffer@5.1.0": {
      "map": {
        "base64-js": "npm:base64-js@1.2.3",
        "ieee754": "npm:ieee754@1.1.8"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.2": {
      "map": {
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:@types/react-transition-group@2.0.7": {
      "map": {
        "@types/react": "npm:@types/react@16.0.40"
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
        "browserify-sign": "npm:browserify-sign@4.0.4",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "create-hmac": "npm:create-hmac@1.1.6",
        "create-hash": "npm:create-hash@1.1.3",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.14",
        "randomfill": "npm:randomfill@1.0.4",
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "randombytes": "npm:randombytes@2.0.6"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "randombytes": "npm:randombytes@2.0.6",
        "miller-rabin": "npm:miller-rabin@4.0.1",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:browserify-sign@4.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "create-hash": "npm:create-hash@1.1.3",
        "create-hmac": "npm:create-hmac@1.1.6",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "elliptic": "npm:elliptic@6.4.0",
        "bn.js": "npm:bn.js@4.11.8",
        "parse-asn1": "npm:parse-asn1@5.1.0"
      }
    },
    "npm:create-hmac@1.1.6": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "cipher-base": "npm:cipher-base@1.0.4",
        "ripemd160": "npm:ripemd160@2.0.1",
        "sha.js": "npm:sha.js@2.4.10"
      }
    },
    "npm:create-hash@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.4",
        "ripemd160": "npm:ripemd160@2.0.1",
        "sha.js": "npm:sha.js@2.4.10"
      }
    },
    "npm:randombytes@2.0.6": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:randomfill@1.0.4": {
      "map": {
        "randombytes": "npm:randombytes@2.0.6",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "randombytes": "npm:randombytes@2.0.6",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "bn.js": "npm:bn.js@4.11.8",
        "parse-asn1": "npm:parse-asn1@5.1.0"
      }
    },
    "npm:pbkdf2@3.0.14": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "create-hash": "npm:create-hash@1.1.3",
        "create-hmac": "npm:create-hmac@1.1.6",
        "ripemd160": "npm:ripemd160@2.0.1",
        "sha.js": "npm:sha.js@2.4.10"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "elliptic": "npm:elliptic@6.4.0",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "browserify-aes": "npm:browserify-aes@1.1.1"
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
    "npm:elliptic@6.4.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.3",
        "brorand": "npm:brorand@1.1.0",
        "hmac-drbg": "npm:hmac-drbg@1.0.1",
        "hash.js": "npm:hash.js@1.1.3",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "inherits": "npm:inherits@2.0.3",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:cipher-base@1.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:browserify-aes@1.1.1": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "create-hash": "npm:create-hash@1.1.3",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:evp_bytestokey@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "md5.js": "npm:md5.js@1.3.4"
      }
    },
    "npm:parse-asn1@5.1.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.1.1",
        "create-hash": "npm:create-hash@1.1.3",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "pbkdf2": "npm:pbkdf2@3.0.14",
        "asn1.js": "npm:asn1.js@4.10.1"
      }
    },
    "npm:ripemd160@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "hash-base": "npm:hash-base@2.0.2"
      }
    },
    "npm:sha.js@2.4.10": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:md5.js@1.3.4": {
      "map": {
        "hash-base": "npm:hash-base@3.0.4",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:hmac-drbg@1.0.1": {
      "map": {
        "hash.js": "npm:hash.js@1.1.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
      }
    },
    "npm:hash.js@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:asn1.js@4.10.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:hash-base@2.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:hash-base@3.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    }
  }
});
