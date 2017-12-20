set root=d:\muix\build-icons\

d:

copy %root%README.md %root%deploy/README.md
cd %root%deploy
cd %root%deploy

call npm.cmd version patch
cd %root%deploy

rem call npm.cmd publish
rem cd %root%deploy

call yarn link

