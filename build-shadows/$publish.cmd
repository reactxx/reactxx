set root=d:\reactxx\build-shadows\
set tsc="c:\Program Files (x86)\Microsoft SDKs\TypeScript\2.9\tsc.exe"

d:

call %tsc% --p %root%tsconfig-web.json -d
call %tsc% --p %root%tsconfig-native.json 

copy %root%README.md %root%deploy\README.md

cd %root%deploy
call npm.cmd version patch
call npm.cmd publish
