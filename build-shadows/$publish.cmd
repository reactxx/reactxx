set root=d:\muix\build-shadows\
set tsc="c:\Program Files (x86)\Microsoft SDKs\TypeScript\2.6\tsc.exe"

d:

call %tsc% --p %root%tsconfig-web.json
call %tsc% --p %root%tsconfig-native.json -d

copy %root%README.md %root%deploy\README.md

pause

cd %root%deploy
call npm.cmd version patch
call npm.cmd publish
