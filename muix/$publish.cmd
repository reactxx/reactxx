set root=d:\muix\muix\

d:

rem *** delete 
cd %root%deploy
rmdir lib /s /q
rmdir es /s /q

rem *** TS compilation
call "c:\Program Files (x86)\Microsoft SDKs\TypeScript\2.6\tsc.exe" --p d:\muix\muix\tsconfig-web.json
call "c:\Program Files (x86)\Microsoft SDKs\TypeScript\2.6\tsc.exe" --p d:\muix\muix\tsconfig-native.json -d

rem publish packages
call %root%$publish_ styles
