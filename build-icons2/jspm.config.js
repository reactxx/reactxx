SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "build-icons2/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  packages: {
    "build-icons2": {
      "main": "build-icons2.js"
    },
    "": {
      "defaultExtension": "js"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "@material-ui/core": "npm:@material-ui/core@1.4.3",
    "@material-ui/icons": "npm:@material-ui/icons@2.0.1",
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
    "change-case": "npm:change-case@3.0.2",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
    "constants": "npm:jspm-nodelibs-constants@0.2.1",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
    "domain": "npm:jspm-nodelibs-domain@0.2.1",
    "events": "npm:jspm-nodelibs-events@0.2.2",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.2",
    "jss": "npm:jss@9.8.7",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "react": "npm:react@16.4.2",
    "react-dom": "npm:react-dom@16.4.2",
    "stream": "npm:jspm-nodelibs-stream@0.2.1",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.2",
    "tslib": "npm:tslib@1.9.3",
    "url": "npm:jspm-nodelibs-url@0.2.1",
    "util": "npm:jspm-nodelibs-util@0.2.2",
    "vm": "npm:jspm-nodelibs-vm@0.2.1",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.3"
  },
  packages: {
    "npm:change-case@3.0.2": {
      "map": {
        "camel-case": "npm:camel-case@3.0.0",
        "lower-case-first": "npm:lower-case-first@1.0.2",
        "header-case": "npm:header-case@1.0.1",
        "is-upper-case": "npm:is-upper-case@1.1.2",
        "no-case": "npm:no-case@2.3.2",
        "constant-case": "npm:constant-case@2.0.0",
        "path-case": "npm:path-case@2.1.1",
        "is-lower-case": "npm:is-lower-case@1.1.3",
        "dot-case": "npm:dot-case@2.1.1",
        "param-case": "npm:param-case@2.1.1",
        "lower-case": "npm:lower-case@1.1.4",
        "swap-case": "npm:swap-case@1.1.2",
        "title-case": "npm:title-case@2.1.1",
        "pascal-case": "npm:pascal-case@2.0.1",
        "upper-case": "npm:upper-case@1.1.3",
        "upper-case-first": "npm:upper-case-first@1.1.2",
        "snake-case": "npm:snake-case@2.1.0",
        "sentence-case": "npm:sentence-case@2.1.1"
      }
    },
    "npm:camel-case@3.0.0": {
      "map": {
        "no-case": "npm:no-case@2.3.2",
        "upper-case": "npm:upper-case@1.1.3"
      }
    },
    "npm:react-dom@16.4.2": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0",
        "prop-types": "npm:prop-types@15.6.2",
        "object-assign": "npm:object-assign@4.1.1",
        "fbjs": "npm:fbjs@0.8.17"
      }
    },
    "npm:react@16.4.2": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0",
        "prop-types": "npm:prop-types@15.6.2",
        "object-assign": "npm:object-assign@4.1.1",
        "fbjs": "npm:fbjs@0.8.17"
      }
    },
    "npm:lower-case-first@1.0.2": {
      "map": {
        "lower-case": "npm:lower-case@1.1.4"
      }
    },
    "npm:header-case@1.0.1": {
      "map": {
        "no-case": "npm:no-case@2.3.2",
        "upper-case": "npm:upper-case@1.1.3"
      }
    },
    "npm:no-case@2.3.2": {
      "map": {
        "lower-case": "npm:lower-case@1.1.4"
      }
    },
    "npm:constant-case@2.0.0": {
      "map": {
        "snake-case": "npm:snake-case@2.1.0",
        "upper-case": "npm:upper-case@1.1.3"
      }
    },
    "npm:path-case@2.1.1": {
      "map": {
        "no-case": "npm:no-case@2.3.2"
      }
    },
    "npm:is-lower-case@1.1.3": {
      "map": {
        "lower-case": "npm:lower-case@1.1.4"
      }
    },
    "npm:param-case@2.1.1": {
      "map": {
        "no-case": "npm:no-case@2.3.2"
      }
    },
    "npm:dot-case@2.1.1": {
      "map": {
        "no-case": "npm:no-case@2.3.2"
      }
    },
    "npm:is-upper-case@1.1.2": {
      "map": {
        "upper-case": "npm:upper-case@1.1.3"
      }
    },
    "npm:swap-case@1.1.2": {
      "map": {
        "lower-case": "npm:lower-case@1.1.4",
        "upper-case": "npm:upper-case@1.1.3"
      }
    },
    "npm:title-case@2.1.1": {
      "map": {
        "upper-case": "npm:upper-case@1.1.3",
        "no-case": "npm:no-case@2.3.2"
      }
    },
    "npm:pascal-case@2.0.1": {
      "map": {
        "camel-case": "npm:camel-case@3.0.0",
        "upper-case-first": "npm:upper-case-first@1.1.2"
      }
    },
    "npm:upper-case-first@1.1.2": {
      "map": {
        "upper-case": "npm:upper-case@1.1.3"
      }
    },
    "npm:prop-types@15.6.2": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0",
        "object-assign": "npm:object-assign@4.1.1"
      }
    },
    "npm:snake-case@2.1.0": {
      "map": {
        "no-case": "npm:no-case@2.3.2"
      }
    },
    "npm:fbjs@0.8.17": {
      "map": {
        "object-assign": "npm:object-assign@4.1.1",
        "loose-envify": "npm:loose-envify@1.4.0",
        "core-js": "npm:core-js@1.2.7",
        "setimmediate": "npm:setimmediate@1.0.5",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "promise": "npm:promise@7.3.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.18"
      }
    },
    "npm:sentence-case@2.1.1": {
      "map": {
        "no-case": "npm:no-case@2.3.2",
        "upper-case-first": "npm:upper-case-first@1.1.2"
      }
    },
    "npm:loose-envify@1.4.0": {
      "map": {
        "js-tokens": "npm:js-tokens@4.0.0"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.1": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "whatwg-fetch": "npm:whatwg-fetch@2.0.4",
        "node-fetch": "npm:node-fetch@1.7.3"
      }
    },
    "npm:promise@7.3.1": {
      "map": {
        "asap": "npm:asap@2.0.6"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.3.6"
      }
    },
    "npm:node-fetch@1.7.3": {
      "map": {
        "is-stream": "npm:is-stream@1.1.0",
        "encoding": "npm:encoding@0.1.12"
      }
    },
    "npm:readable-stream@2.3.6": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "process-nextick-args": "npm:process-nextick-args@2.0.0",
        "isarray": "npm:isarray@1.0.0",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "string_decoder": "npm:string_decoder@1.1.1",
        "core-util-is": "npm:core-util-is@1.0.2"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.3": {
      "map": {
        "buffer": "npm:buffer@5.2.0"
      }
    },
    "npm:jspm-nodelibs-url@0.2.1": {
      "map": {
        "url": "npm:url@0.11.0"
      }
    },
    "npm:jspm-nodelibs-domain@0.2.1": {
      "map": {
        "domain-browser": "npm:domain-browser@1.2.0"
      }
    },
    "npm:string_decoder@1.1.1": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:jspm-nodelibs-zlib@0.2.3": {
      "map": {
        "browserify-zlib": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.23"
      }
    },
    "npm:buffer@5.2.0": {
      "map": {
        "ieee754": "npm:ieee754@1.1.12",
        "base64-js": "npm:base64-js@1.3.0"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.6",
        "pako": "npm:pako@0.2.9"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:iconv-lite@0.4.23": {
      "map": {
        "safer-buffer": "npm:safer-buffer@2.1.2"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.2": {
      "map": {
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.1": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.12.0"
      }
    },
    "npm:crypto-browserify@3.12.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "create-hash": "npm:create-hash@1.2.0",
        "browserify-sign": "npm:browserify-sign@4.0.4",
        "browserify-cipher": "npm:browserify-cipher@1.0.1",
        "create-ecdh": "npm:create-ecdh@4.0.3",
        "diffie-hellman": "npm:diffie-hellman@5.0.3",
        "public-encrypt": "npm:public-encrypt@4.0.2",
        "create-hmac": "npm:create-hmac@1.1.7",
        "pbkdf2": "npm:pbkdf2@3.0.16",
        "randomfill": "npm:randomfill@1.0.4",
        "randombytes": "npm:randombytes@2.0.6"
      }
    },
    "npm:create-hash@1.2.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "md5.js": "npm:md5.js@1.3.4",
        "cipher-base": "npm:cipher-base@1.0.4",
        "ripemd160": "npm:ripemd160@2.0.2",
        "sha.js": "npm:sha.js@2.4.11"
      }
    },
    "npm:browserify-sign@4.0.4": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "inherits": "npm:inherits@2.0.3",
        "create-hmac": "npm:create-hmac@1.1.7",
        "parse-asn1": "npm:parse-asn1@5.1.1",
        "bn.js": "npm:bn.js@4.11.8",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "elliptic": "npm:elliptic@6.4.0"
      }
    },
    "npm:create-hmac@1.1.7": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "create-hash": "npm:create-hash@1.2.0",
        "cipher-base": "npm:cipher-base@1.0.4",
        "ripemd160": "npm:ripemd160@2.0.2",
        "sha.js": "npm:sha.js@2.4.11"
      }
    },
    "npm:diffie-hellman@5.0.3": {
      "map": {
        "randombytes": "npm:randombytes@2.0.6",
        "bn.js": "npm:bn.js@4.11.8",
        "miller-rabin": "npm:miller-rabin@4.0.1"
      }
    },
    "npm:public-encrypt@4.0.2": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "randombytes": "npm:randombytes@2.0.6",
        "parse-asn1": "npm:parse-asn1@5.1.1",
        "bn.js": "npm:bn.js@4.11.8",
        "browserify-rsa": "npm:browserify-rsa@4.0.1"
      }
    },
    "npm:randomfill@1.0.4": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "randombytes": "npm:randombytes@2.0.6"
      }
    },
    "npm:pbkdf2@3.0.16": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "create-hmac": "npm:create-hmac@1.1.7",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "ripemd160": "npm:ripemd160@2.0.2",
        "sha.js": "npm:sha.js@2.4.11"
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
        "browserify-des": "npm:browserify-des@1.0.2",
        "browserify-aes": "npm:browserify-aes@1.2.0"
      }
    },
    "npm:create-ecdh@4.0.3": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "elliptic": "npm:elliptic@6.4.0"
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
    "npm:cipher-base@1.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:evp_bytestokey@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "md5.js": "npm:md5.js@1.3.4"
      }
    },
    "npm:sha.js@2.4.11": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:parse-asn1@5.1.1": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "pbkdf2": "npm:pbkdf2@3.0.16",
        "browserify-aes": "npm:browserify-aes@1.2.0",
        "asn1.js": "npm:asn1.js@4.10.1"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "randombytes": "npm:randombytes@2.0.6"
      }
    },
    "npm:elliptic@6.4.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.3",
        "brorand": "npm:brorand@1.1.0",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1",
        "hash.js": "npm:hash.js@1.1.5",
        "hmac-drbg": "npm:hmac-drbg@1.0.1",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.8.3"
      }
    },
    "npm:browserify-des@1.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "cipher-base": "npm:cipher-base@1.0.4",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:browserify-aes@1.2.0": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "cipher-base": "npm:cipher-base@1.0.4",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:miller-rabin@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:stream-http@2.8.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.3.6",
        "xtend": "npm:xtend@4.0.1",
        "builtin-status-codes": "npm:builtin-status-codes@3.0.0",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1"
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
    "npm:hash.js@1.1.5": {
      "map": {
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
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:@material-ui/icons@2.0.1": {
      "map": {
        "recompose": "npm:recompose@0.28.2",
        "@babel/runtime": "npm:@babel/runtime@7.0.0-beta.42"
      }
    },
    "npm:recompose@0.28.2": {
      "map": {
        "@babel/runtime": "npm:@babel/runtime@7.0.0-beta.56",
        "fbjs": "npm:fbjs@0.8.17",
        "change-emitter": "npm:change-emitter@0.1.6",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.5.5",
        "symbol-observable": "npm:symbol-observable@1.2.0",
        "react-lifecycles-compat": "npm:react-lifecycles-compat@3.0.4"
      }
    },
    "npm:@material-ui/core@1.4.3": {
      "map": {
        "@babel/runtime": "npm:@babel/runtime@7.0.0-beta.42",
        "recompose": "npm:recompose@0.28.2",
        "prop-types": "npm:prop-types@15.6.2",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.5.5",
        "brcast": "npm:brcast@3.0.1",
        "csstype": "npm:csstype@2.5.6",
        "is-plain-object": "npm:is-plain-object@2.0.4",
        "deepmerge": "npm:deepmerge@2.1.1",
        "dom-helpers": "npm:dom-helpers@3.3.1",
        "jss-camel-case": "npm:jss-camel-case@6.1.0",
        "@types/jss": "npm:@types/jss@9.5.4",
        "debounce": "npm:debounce@1.1.0",
        "jss": "npm:jss@9.8.7",
        "classnames": "npm:classnames@2.2.6",
        "keycode": "npm:keycode@2.2.0",
        "jss-nested": "npm:jss-nested@6.0.1",
        "jss-default-unit": "npm:jss-default-unit@8.0.2",
        "normalize-scroll-left": "npm:normalize-scroll-left@0.1.2",
        "@types/react-transition-group": "npm:@types/react-transition-group@2.0.13",
        "jss-vendor-prefixer": "npm:jss-vendor-prefixer@7.0.0",
        "jss-props-sort": "npm:jss-props-sort@6.0.0",
        "jss-global": "npm:jss-global@3.0.0",
        "warning": "npm:warning@4.0.1",
        "popper.js": "npm:popper.js@1.14.4",
        "react-transition-group": "npm:react-transition-group@2.4.0",
        "react-event-listener": "npm:react-event-listener@0.6.2",
        "react-jss": "npm:react-jss@8.6.1"
      }
    },
    "npm:@babel/runtime@7.0.0-beta.42": {
      "map": {
        "regenerator-runtime": "npm:regenerator-runtime@0.11.1",
        "core-js": "npm:core-js@2.5.7"
      }
    },
    "npm:@babel/runtime@7.0.0-beta.56": {
      "map": {
        "regenerator-runtime": "npm:regenerator-runtime@0.12.1"
      }
    },
    "npm:jss@9.8.7": {
      "map": {
        "warning": "npm:warning@3.0.0",
        "symbol-observable": "npm:symbol-observable@1.2.0",
        "is-in-browser": "npm:is-in-browser@1.1.3"
      }
    },
    "npm:jss-nested@6.0.1": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:@types/jss@9.5.4": {
      "map": {
        "csstype": "npm:csstype@2.5.6",
        "indefinite-observable": "npm:indefinite-observable@1.0.1"
      }
    },
    "npm:react-transition-group@2.4.0": {
      "map": {
        "dom-helpers": "npm:dom-helpers@3.3.1",
        "prop-types": "npm:prop-types@15.6.2",
        "react-lifecycles-compat": "npm:react-lifecycles-compat@3.0.4",
        "loose-envify": "npm:loose-envify@1.4.0"
      }
    },
    "npm:react-event-listener@0.6.2": {
      "map": {
        "prop-types": "npm:prop-types@15.6.2",
        "warning": "npm:warning@4.0.1",
        "@babel/runtime": "npm:@babel/runtime@7.0.0-beta.42"
      }
    },
    "npm:react-jss@8.6.1": {
      "map": {
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.5.5",
        "jss": "npm:jss@9.8.7",
        "prop-types": "npm:prop-types@15.6.2",
        "jss-preset-default": "npm:jss-preset-default@4.5.0",
        "theming": "npm:theming@1.3.0"
      }
    },
    "npm:warning@4.0.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0"
      }
    },
    "npm:is-plain-object@2.0.4": {
      "map": {
        "isobject": "npm:isobject@3.0.1"
      }
    },
    "npm:jss-vendor-prefixer@7.0.0": {
      "map": {
        "css-vendor": "npm:css-vendor@0.3.8"
      }
    },
    "npm:@types/react-transition-group@2.0.13": {
      "map": {
        "@types/react": "npm:@types/react@16.4.8"
      }
    },
    "npm:jss-camel-case@6.1.0": {
      "map": {
        "hyphenate-style-name": "npm:hyphenate-style-name@1.0.2"
      }
    },
    "npm:warning@3.0.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0"
      }
    },
    "npm:indefinite-observable@1.0.1": {
      "map": {
        "symbol-observable": "npm:symbol-observable@1.0.4"
      }
    },
    "npm:@types/react@16.4.8": {
      "map": {
        "csstype": "npm:csstype@2.5.6",
        "@types/prop-types": "npm:@types/prop-types@15.5.4"
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
    "npm:css-vendor@0.3.8": {
      "map": {
        "is-in-browser": "npm:is-in-browser@1.1.3"
      }
    },
    "npm:jss-preset-default@4.5.0": {
      "map": {
        "jss-camel-case": "npm:jss-camel-case@6.1.0",
        "jss-global": "npm:jss-global@3.0.0",
        "jss-default-unit": "npm:jss-default-unit@8.0.2",
        "jss-nested": "npm:jss-nested@6.0.1",
        "jss-props-sort": "npm:jss-props-sort@6.0.0",
        "jss-vendor-prefixer": "npm:jss-vendor-prefixer@7.0.0",
        "jss-template": "npm:jss-template@1.0.1",
        "jss-compose": "npm:jss-compose@5.0.0",
        "jss-extend": "npm:jss-extend@6.2.0",
        "jss-expand": "npm:jss-expand@5.3.0"
      }
    },
    "npm:@types/prop-types@15.5.4": {
      "map": {
        "@types/react": "npm:@types/react@16.4.8"
      }
    },
    "npm:jss-compose@5.0.0": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:jss-template@1.0.1": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:jss-extend@6.2.0": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    }
  }
});
