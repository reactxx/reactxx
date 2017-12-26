set root=D:\muix\muix\
set url=https://github.com/mui-x/muix/blob/master/types/

d:

cd %root%

set npm=%root%node_modules\
rmdir %npm%@types\expo /s /q
rmdir %npm%@types\react /s /q
rmdir %npm%@types\react-native /s /q
rmdir %npm%muix-icons /s /q
call npm install muix-icons %url%expo/types-expo-0.1.1.tgz?raw=true %url%react/types-react-0.1.1.tgz?raw=true %url%react-native/types-react-native-0.1.1.tgz?raw=true 

cd %root%node_modules\@types
rmdir node /s /q


rem %root%\jspm_packages
rem rmdir npm /s /q
rem https://superuser.com/questions/764348/using-wildcards-with-the-rmdir-or-rd-command
set npm=%root%jspm_packages\npm\
forfiles /P %npm% /M muix-icons* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"

cd %root%
call jspm install 

call %root%$compile
