set root=D:\muix\build-types-material-ui\
d:

cd %root%
copy %root%\node_modules$dts-generator$index.js %root%\node_modules\dts-generator\index.js /y
node dts-generator.js
