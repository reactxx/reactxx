set root=d:\reactxx\muix\

d:

cd %root%
rmdir node_modules /s /q
cd %root%jspm_packages
rmdir npm /s /q

cd %root%
call npm install
call jspm install

rmdir %root%node_modules\@types\node /s /q
rmdir %root%node_modules\@types\react-dom\node_modules  /s /q

copy %root%$blacklist.js %root%node_modules\metro\src\blacklist.js /y

rem call npm link gulp

