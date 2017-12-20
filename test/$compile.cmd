set root=d:\muix\test\
set tsc="c:\Program Files (x86)\Microsoft SDKs\TypeScript\2.6\tsc.exe"

d:

call %tsc% --p %root%tsconfig-web.json
call %tsc% --p %root%tsconfig-native.json -d
