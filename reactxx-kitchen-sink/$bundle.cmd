set root=d:\reactxx\reactxx-kitchen-sink\

d:

cd %root%

jspm bundle deploy/lib/web/index.js bundle/index.js --inject --minify --skip-source-maps
copy D:\reactxx\reactxx-kitchen-sink\jspm.config.js D:\reactxx\docs\jspm.config.js /y
copy D:\reactxx\reactxx-kitchen-sink\bundle\index.js D:\reactxx\docs\bundle\index.js /y