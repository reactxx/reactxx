set root=d:\muix\muix\
set tsc="c:\Program Files (x86)\Microsoft SDKs\TypeScript\2.7\tsc.exe"

d:

call %tsc% --p %root%tsconfig-web.json
rem call %tsc% --p %root%tsconfig-native.json -d

rem rmdir %root%deploy\es\styles\native\fonts /s /q
rem xcopy %root%src\styles\native\fonts %root%deploy\es\styles\native\fonts /s /q /i 