SystemJS.config({
  browserConfig: {
    "paths": {
      "npm:": "/jspm_packages/npm/"
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
    "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
    "constants": "npm:jspm-nodelibs-constants@0.2.1",
    "core-js": "npm:core-js@2.5.3",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
    "domain": "npm:jspm-nodelibs-domain@0.2.1",
    "events": "npm:jspm-nodelibs-events@0.2.2",
    "fela": "npm:fela@6.1.5",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.2",
    "jss": "npm:jss@9.8.0",
    "os": "npm:jspm-nodelibs-os@0.2.2",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "react": "npm:react@16.2.0",
    "react-dom": "npm:react-dom@16.2.0",
    "reactxx": "npm:reactxx@0.1.36",
    "reactxx-mdi": "npm:reactxx-mdi@0.1.63",
    "reactxx-stateman": "npm:reactxx-stateman@0.1.49",
    "stream": "npm:jspm-nodelibs-stream@0.2.1",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.2",
    "tslib": "npm:tslib@1.9.0",
    "url": "npm:jspm-nodelibs-url@0.2.1",
    "util": "npm:jspm-nodelibs-util@0.2.2",
    "vm": "npm:jspm-nodelibs-vm@0.2.1",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.3"
  },
  packages: {
    "npm:react-dom@16.2.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1",
        "fbjs": "npm:fbjs@0.8.16",
        "object-assign": "npm:object-assign@4.1.1",
        "prop-types": "npm:prop-types@15.6.1"
      }
    },
    "npm:fbjs@0.8.16": {
      "map": {
        "core-js": "npm:core-js@1.2.7",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.17",
        "promise": "npm:promise@7.3.1",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "setimmediate": "npm:setimmediate@1.0.5"
      }
    },
    "npm:react@16.2.0": {
      "map": {
        "object-assign": "npm:object-assign@4.1.1",
        "prop-types": "npm:prop-types@15.6.1",
        "fbjs": "npm:fbjs@0.8.16",
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:prop-types@15.6.1": {
      "map": {
        "object-assign": "npm:object-assign@4.1.1",
        "fbjs": "npm:fbjs@0.8.16",
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:warning@3.0.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:fela-plugin-lvha@5.0.15": {
      "map": {
        "fast-loops": "npm:fast-loops@1.0.0"
      }
    },
    "npm:jss-preset-default@4.3.0": {
      "map": {
        "jss-extend": "npm:jss-extend@6.2.0",
        "jss-global": "npm:jss-global@3.0.0",
        "jss-compose": "npm:jss-compose@5.0.0",
        "jss-template": "npm:jss-template@1.0.1",
        "jss-expand": "npm:jss-expand@5.1.0",
        "jss-default-unit": "npm:jss-default-unit@8.0.2",
        "jss-camel-case": "npm:jss-camel-case@6.1.0",
        "jss-nested": "npm:jss-nested@6.0.1",
        "jss-props-sort": "npm:jss-props-sort@6.0.0",
        "jss-vendor-prefixer": "npm:jss-vendor-prefixer@7.0.0"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.1": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:fela-plugin-rtl@1.0.6": {
      "map": {
        "rtl-css-js": "npm:rtl-css-js@1.8.0"
      }
    },
    "npm:loose-envify@1.3.1": {
      "map": {
        "js-tokens": "npm:js-tokens@3.0.2"
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
    },
    "npm:inline-style-prefixer@4.0.0": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "bowser": "npm:bowser@1.9.3"
      }
    },
    "npm:jss@9.8.0": {
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
    "npm:promise@7.3.1": {
      "map": {
        "asap": "npm:asap@2.0.6"
      }
    },
    "npm:css-in-js-utils@2.0.0": {
      "map": {
        "hyphenate-style-name": "npm:hyphenate-style-name@1.0.2"
      }
    },
    "npm:jss-camel-case@6.1.0": {
      "map": {
        "hyphenate-style-name": "npm:hyphenate-style-name@1.0.2"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "node-fetch": "npm:node-fetch@1.7.3",
        "whatwg-fetch": "npm:whatwg-fetch@2.0.3"
      }
    },
    "npm:jss-vendor-prefixer@7.0.0": {
      "map": {
        "css-vendor": "npm:css-vendor@0.3.8"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.5",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:css-vendor@0.3.8": {
      "map": {
        "is-in-browser": "npm:is-in-browser@1.1.3"
      }
    },
    "npm:readable-stream@2.3.5": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "isarray": "npm:isarray@1.0.0",
        "process-nextick-args": "npm:process-nextick-args@2.0.0",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "string_decoder": "npm:string_decoder@1.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "core-util-is": "npm:core-util-is@1.0.2"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.3": {
      "map": {
        "buffer": "npm:buffer@5.1.0"
      }
    },
    "npm:node-fetch@1.7.3": {
      "map": {
        "encoding": "npm:encoding@0.1.12",
        "is-stream": "npm:is-stream@1.1.0"
      }
    },
    "npm:string_decoder@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:jspm-nodelibs-url@0.2.1": {
      "map": {
        "url": "npm:url@0.11.0"
      }
    },
    "npm:buffer@5.1.0": {
      "map": {
        "base64-js": "npm:base64-js@1.2.3",
        "ieee754": "npm:ieee754@1.1.8"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.8.0"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.19"
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
        "xtend": "npm:xtend@4.0.1",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.5",
        "pako": "npm:pako@0.2.9"
      }
    },
    "npm:jspm-nodelibs-os@0.2.2": {
      "map": {
        "os-browserify": "npm:os-browserify@0.3.0"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
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
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "randombytes": "npm:randombytes@2.0.6",
        "browserify-sign": "npm:browserify-sign@4.0.4",
        "create-hash": "npm:create-hash@1.1.3",
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.14",
        "randomfill": "npm:randomfill@1.0.4",
        "create-hmac": "npm:create-hmac@1.1.6",
        "diffie-hellman": "npm:diffie-hellman@5.0.2"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.2": {
      "map": {
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:create-hash@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "ripemd160": "npm:ripemd160@2.0.1",
        "cipher-base": "npm:cipher-base@1.0.4",
        "sha.js": "npm:sha.js@2.4.10"
      }
    },
    "npm:browserify-sign@4.0.4": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "inherits": "npm:inherits@2.0.3",
        "create-hmac": "npm:create-hmac@1.1.6",
        "bn.js": "npm:bn.js@4.11.8",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.1.0",
        "elliptic": "npm:elliptic@6.4.0"
      }
    },
    "npm:randombytes@2.0.6": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "randombytes": "npm:randombytes@2.0.6",
        "bn.js": "npm:bn.js@4.11.8",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.1.0"
      }
    },
    "npm:randomfill@1.0.4": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "randombytes": "npm:randombytes@2.0.6"
      }
    },
    "npm:create-hmac@1.1.6": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "create-hash": "npm:create-hash@1.1.3",
        "ripemd160": "npm:ripemd160@2.0.1",
        "cipher-base": "npm:cipher-base@1.0.4",
        "sha.js": "npm:sha.js@2.4.10"
      }
    },
    "npm:pbkdf2@3.0.14": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "create-hmac": "npm:create-hmac@1.1.6",
        "ripemd160": "npm:ripemd160@2.0.1",
        "sha.js": "npm:sha.js@2.4.10"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "randombytes": "npm:randombytes@2.0.6",
        "bn.js": "npm:bn.js@4.11.8",
        "miller-rabin": "npm:miller-rabin@4.0.1"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "elliptic": "npm:elliptic@6.4.0"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.1.1",
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "randombytes": "npm:randombytes@2.0.6"
      }
    },
    "npm:parse-asn1@5.1.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.1.1",
        "create-hash": "npm:create-hash@1.1.3",
        "pbkdf2": "npm:pbkdf2@3.0.14",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "asn1.js": "npm:asn1.js@4.10.1"
      }
    },
    "npm:elliptic@6.4.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.3",
        "hmac-drbg": "npm:hmac-drbg@1.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
        "brorand": "npm:brorand@1.1.0",
        "hash.js": "npm:hash.js@1.1.3"
      }
    },
    "npm:browserify-aes@1.1.1": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "create-hash": "npm:create-hash@1.1.3",
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:cipher-base@1.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:ripemd160@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "hash-base": "npm:hash-base@2.0.2"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.4",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:sha.js@2.4.10": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:evp_bytestokey@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "md5.js": "npm:md5.js@1.3.4"
      }
    },
    "npm:miller-rabin@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:hmac-drbg@1.0.1": {
      "map": {
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
        "hash.js": "npm:hash.js@1.1.3"
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
    "npm:md5.js@1.3.4": {
      "map": {
        "hash-base": "npm:hash-base@3.0.4",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:hash.js@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:hash-base@3.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:reactxx@0.1.36": {
      "map": {
        "reactxx-mdi": "npm:reactxx-mdi@0.1.63",
        "reactxx-stateman": "npm:reactxx-stateman@0.1.49",
        "warning": "npm:warning@3.0.0",
        "prop-types": "npm:prop-types@15.6.1",
        "tslib": "npm:tslib@1.9.0",
        "jss-preset-default": "npm:jss-preset-default@4.3.0",
        "fela-plugin-prefixer": "npm:fela-plugin-prefixer@5.0.18",
        "fela-plugin-lvha": "npm:fela-plugin-lvha@5.0.15",
        "fela-plugin-rtl": "npm:fela-plugin-rtl@1.0.6",
        "fela-dom": "npm:fela-dom@7.0.6",
        "fela-plugin-unit": "npm:fela-plugin-unit@5.0.16",
        "fela-plugin-fallback-value": "npm:fela-plugin-fallback-value@5.0.17",
        "fela": "npm:fela@6.1.5",
        "fela-plugin-extend": "npm:fela-plugin-extend@6.0.4"
      }
    },
    "npm:reactxx-stateman@0.1.49": {
      "map": {
        "warning": "npm:warning@3.0.0",
        "prop-types": "npm:prop-types@15.6.1",
        "tslib": "npm:tslib@1.9.0"
      }
    },
    "npm:fela-plugin-prefixer@5.0.18": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "fela-plugin-fallback-value": "npm:fela-plugin-fallback-value@5.0.17",
        "isobject": "npm:isobject@3.0.1",
        "inline-style-prefixer": "npm:inline-style-prefixer@4.0.0",
        "fast-loops": "npm:fast-loops@1.0.0"
      }
    },
    "npm:fela-dom@7.0.6": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "fast-loops": "npm:fast-loops@1.0.0",
        "fela-utils": "npm:fela-utils@8.0.5"
      }
    },
    "npm:fela-plugin-unit@5.0.16": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "isobject": "npm:isobject@3.0.1"
      }
    },
    "npm:fela-plugin-fallback-value@5.0.17": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "isobject": "npm:isobject@3.0.1"
      }
    },
    "npm:fela@6.1.5": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "isobject": "npm:isobject@3.0.1",
        "fast-loops": "npm:fast-loops@1.0.0",
        "fela-utils": "npm:fela-utils@8.0.5"
      }
    },
    "npm:fela-plugin-extend@6.0.4": {
      "map": {
        "isobject": "npm:isobject@3.0.1",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "fast-loops": "npm:fast-loops@1.0.0",
        "fela-plugin-remove-undefined": "npm:fela-plugin-remove-undefined@5.0.19"
      }
    },
    "npm:fela-utils@8.0.5": {
      "map": {
        "fast-loops": "npm:fast-loops@1.0.0",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "string-hash": "npm:string-hash@1.1.3"
      }
    },
    "npm:fela-plugin-remove-undefined@5.0.19": {
      "map": {
        "fela-utils": "npm:fela-utils@8.0.5",
        "isobject": "npm:isobject@3.0.1"
      }
    }
  }
});
