set root=D:\reactxx\muix\
set url=https://cdn.rawgit.com/reactxx/reactxx/6054b9d3/types/

d:

cd %root%

set npm=%root%node_modules\
rmdir %npm%@types\expo /s /q
rmdir %npm%@types\react /s /q
rmdir %npm%@types\react-native /s /q
rem rmdir %npm%@types\reactxx /s /q
rmdir %npm%reactxx-mdi /s /q
rmdir %npm%reactxx-shadows /s /q
rem call npm install reactxx-mdi reactxx-shadows %url%expo/types-expo-0.1.1.tgz %url%react/types-react-0.1.1.tgz %url%react-native/types-react-native-0.1.1.tgz %url%reactxx/types-reactxx-0.1.1.tgz
call npm install reactxx-mdi reactxx-shadows %url%expo/types-expo-0.1.1.tgz %url%react/types-react-0.1.1.tgz %url%react-native/types-react-native-0.1.1.tgz

cd %root%node_modules\@types
rmdir node /s /q


rem %root%\jspm_packages
rem rmdir npm /s /q
rem https://superuser.com/questions/764348/using-wildcards-with-the-rmdir-or-rd-command
set npm=%root%jspm_packages\npm\
forfiles /P %npm% /M reactxx-mdi* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"
forfiles /P %npm% /M reactxx-shadows* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"

cd %root%
call jspm install npm:reactxx-shadows npm:reactxx-mdi

rem call %root%$compile
