set root=d:\muix\build-icons\

d:

copy %root%README.md %root%deploy/README.md

cd %root%deploy
call npm.cmd version patch
call npm.cmd publish

rem cd %root%deploy
rem call yarn link

