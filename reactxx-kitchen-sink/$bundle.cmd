set root=d:\reactxx\reactxx-kitchen-sink\

d:

cd %root%

copy D:\reactxx\reactxx-kitchen-sink\jspm.config.js D:\reactxx\reactxx-kitchen-sink\jspm.config.js_ /y

call jspm bundle deploy/lib/web/index.js bundle/index.js --inject --minify --skip-source-maps

copy D:\reactxx\reactxx-kitchen-sink\jspm.config.js D:\reactxx\docs\jspm.config.js /y
copy D:\reactxx\reactxx-kitchen-sink\bundle\index.js D:\reactxx\docs\bundle\index.js /y
del D:\reactxx\reactxx-kitchen-sink\jspm.config.js
copy D:\reactxx\reactxx-kitchen-sink\jspm.config.js_ D:\reactxx\reactxx-kitchen-sink\jspm.config.js /y
del D:\reactxx\reactxx-kitchen-sink\jspm.config.js_

rem !!!!!!!!!!!!!!!!!!!!!
rem in D:\reactxx\docs\jspm.config.js change "npm:": "/jspm_packages/npm/" to "npm:": "/reactxx/jspm_packages/npm/"