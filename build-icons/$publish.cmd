set root=d:\mui-x\build-icons\

d:

rem cd %root%
rem call $build

copy %root%README.md %root%deploy/README.md
cd %root%deploy
cd %root%deploy
call npm.cmd version patch
cd %root%deploy
call npm.cmd publish
cd %root%deploy

rem cd %root%
rem call $refresh
