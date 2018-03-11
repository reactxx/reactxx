set root=d:\reactxx\reactxx-kitchen-sink\

d:

cd %root%
rem call yarn upgrade
rem call yarn install

rmdir %root%node_modules\@types\react-dom\node_modules /s /q

cd %root%jspm_packages
rmdir npm /s /q
cd %root%
call jspm install

rem copy %root%$blacklist.js %root%node_modules\metro\src\blacklist.js /y