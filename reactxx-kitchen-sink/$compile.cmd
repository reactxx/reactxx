set root=d:\reactxx\reactxx-kitchen-sink\
set tsc="c:\Program Files (x86)\Microsoft SDKs\TypeScript\2.8\tsc.exe"

d:

call %tsc% --p %root%tsconfig-web.json
call %tsc% --p %root%tsconfig-native.json
