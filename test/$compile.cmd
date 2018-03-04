set root=d:\reactxx\test\
set tsc="c:\Program Files (x86)\Microsoft SDKs\TypeScript\2.6\tsc.exe"

d:

call %tsc% --p %root%tsconfig-web.json
rem call %tsc% --p %root%tsconfig-native.json -d
