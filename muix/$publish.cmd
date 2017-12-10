set root=d:\muix\muix\

d:

call "c:\Program Files (x86)\Microsoft SDKs\TypeScript\2.6\tsc.exe" --p d:\muix\muix\tsconfig-web.json -d
call "c:\Program Files (x86)\Microsoft SDKs\TypeScript\2.6\tsc.exe" --p d:\muix\muix\tsconfig-native.json -d

copy %root%README.md %root%deploy\README.md
cd %root%deploy/styles
rmdir es /s /q
md es
rmdir lib /s /q
md lib
xcopy /s /q %root%deploy\es\styles\*.* %root%deploy\styles\es
xcopy /s /q %root%deploy\lib\styles\*.* %root%deploy\styles\lib
call npm.cmd version patch
call npm.cmd publish
