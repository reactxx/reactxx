set root=d:\muix\build-icons\

d:
cd %root%
rmdir node_modules /s /q
cd %root%\jspm_packages
rmdir npm /s /q

cd %root%
call npm install
call jspm update

rmdir %root%\node_modules\@types\node /s /q

