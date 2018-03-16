set root=d:\reactxx\reactxx-kitchen-sink\

d:

cd %root%

jspm bundle deploy/lib/web/index.js bundle/index.js --inject --minify --skip-source-maps