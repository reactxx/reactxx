set root=D:\muix\test\
set url=https://github.com/mui-x/muix/blob/master/types/

d:

rem cd %root%\jspm_packages
rem rmdir npm /s /q
set npm=%root%jspm_packages\npm\
forfiles /P %npm% /M muix-icons* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"
forfiles /P %npm% /M muix-styles* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"
forfiles /P %npm% /M muix-primitives* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"
forfiles /P %npm% /M muix-components* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"
cd %root%
call jspm install npm:muix-icons npm:muix-styles npm:muix-primitives npm:muix-components npm:muix 


set npm=%root%node_modules\
rmdir %npm%@types\expo /s /q
rmdir %npm%@types\react /s /q
rmdir %npm%@types\react-native /s /q
rmdir %npm%muix-icons /s /q
rmdir %npm%muix-styles /s /q
rmdir %npm%muix-primitives /s /q
rmdir %npm%muix-components /s /q

cd %root%
call npm install muix-icons muix-styles muix-primitives muix-components muix %url%expo/types-expo-0.1.1.tgz?raw=true %url%react/types-react-0.1.1.tgz?raw=true %url%react-native/types-react-native-0.1.1.tgz?raw=true 

cd %root%node_modules\@types
rmdir node /s /q

copy D:\muix\test\$blacklist.js d:\muix\test\node_modules\metro-bundler\src\blacklist.js /y

