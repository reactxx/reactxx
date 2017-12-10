set root=d:\mui-x\muix\

d:

call "c:\Program Files (x86)\Microsoft SDKs\TypeScript\2.6\tsc.exe" --p d:\mui-x\muix\tsconfig-web.json -d
call "c:\Program Files (x86)\Microsoft SDKs\TypeScript\2.6\tsc.exe" --p d:\mui-x\muix\tsconfig-native.json -d

pause

copy %root%README.md %root%deploy/README.md
cd %root%deploy/styles
call npm.cmd version patch
call npm.cmd publish
