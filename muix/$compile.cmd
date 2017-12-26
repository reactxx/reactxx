set root=d:\muix\muix\
set tsc="c:\Program Files (x86)\Microsoft SDKs\TypeScript\2.6\tsc.exe"

d:

rem *** TS compilation
call %tsc% --p %root%tsconfig-web.json
call %tsc% --p %root%tsconfig-native.json -d

rmdir %root%deploy\es\styles\native\fonts /s /q
xcopy %root%src\styles\native\fonts %root%deploy\es\styles\native\fonts /s /q /i 