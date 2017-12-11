set root=d:\muix\muix\

d:

cd %root%
rmdir node_modules /s /q
cd %root%\jspm_packages
rmdir npm /s /q

cd %root%
call npm install
call jspm update

rmdir %root%\node_modules\@types\node /s /q

copy D:\muix\test\$blacklist.js d:\muix\muix\node_modules\metro-bundler\src\blacklist.js /y

call npm link gulp

