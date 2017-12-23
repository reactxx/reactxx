set root=D:\muix\test\

d:

cd %root%
rmdir node_modules /s /q
cd %root%\jspm_packages
rmdir npm /s /q

cd %root%
call yarn upgrade
call jspm install

rmdir %root%node_modules\@types\node /s /q
rmdir %root%node_modules\@types\react-dom\node_modules  /s /q

copy D:\muix\test\$blacklist.js d:\muix\test\node_modules\metro-bundler\src\blacklist.js /y

rem call npm link gulp

rem call npm link 

