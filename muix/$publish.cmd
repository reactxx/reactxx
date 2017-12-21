set root=d:\muix\muix\
set tsc="c:\Program Files (x86)\Microsoft SDKs\TypeScript\2.6\tsc.exe"

d:

rem *** delete .js, generated by TS transpiler
cd %root%deploy
rmdir lib /s /q
rmdir es /s /q

rem *** TS compilation
call %tsc% --p %root%tsconfig-web.json
call %tsc% --p %root%tsconfig-native.json -d

rem *** npm package publishing
call %root%$publish_ styles
call %root%$publish_ primitives
call %root%$publish_ components
call %root%$publish_ test

