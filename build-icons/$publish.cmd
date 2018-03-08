set root=d:\reactxx\build-icons\

d:

cd %root%deploy
call npm.cmd version patch
call npm.cmd publish
