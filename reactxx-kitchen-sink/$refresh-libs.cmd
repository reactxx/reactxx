set root=D:\reactxx\reactxx-kitchen-sink\
set url=https://cdn.rawgit.com/reactxx/reactxx/6054b9d3/types/

d:

rem cd %root%\jspm_packages
rem rmdir npm /s /q
set npm=%root%jspm_packages\npm\
forfiles /P %npm% /M reactxx-mdi* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"
forfiles /P %npm% /M reactxx* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"
forfiles /P %npm% /M reactxx-stateman* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"


set npm=%root%node_modules\
rmdir %npm%@types\expo /s /q
rmdir %npm%@types\react /s /q
rmdir %npm%@types\react-native /s /q
rmdir %npm%reactxx-mdi /s /q
rmdir %npm%reactxx-stateman /s /q
rmdir %npm%reactxx /s /q

cd %root%

pause

call yarn add reactxx reactxx-mdi reactxx-stateman %url%expo/types-expo-0.1.1.tgz %url%react/types-react-0.1.1.tgz %url%react-native/types-react-native-0.1.1.tgz
call jspm install npm:reactxx-mdi npm:reactxx-stateman npm:reactxx 


rmdir %root%node_modules\@types\node /s /q
rmdir %root%node_modules\@types\react-dom\node_modules  /s /q
copy %root%$blacklist.js %root%node_modules\metro\src\blacklist.js /y

call %root%$compile