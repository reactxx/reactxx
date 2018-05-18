set root=D:\reactxx\reactxx-kitchen-sink\
set url=https://cdn.rawgit.com/reactxx/reactxx/6054b9d3/types/

d:

rem cd %root%\jspm_packages
rem rmdir npm /s /q
set npm=%root%jspm_packages\npm\
forfiles /P %npm% /M reactxx-mdi* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"
forfiles /P %npm% /M reactxx* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"
rem forfiles /P %npm% /M reactxx-activable* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"
forfiles /P %npm% /M reactxx-basic* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"
forfiles /P %npm% /M reactxx-fela* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"
forfiles /P %npm% /M reactxx-mui* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"
forfiles /P %npm% /M reactxx-animation* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"
forfiles /P %npm% /M reactxx-mediaq* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"
forfiles /P %npm% /M reactxx-primitives* /C "cmd /c if @isdir==TRUE rmdir /s /q @file"


set npm=%root%node_modules\
rmdir %npm%@types\expo /s /q
rmdir %npm%reactxx-mdi /s /q
rem rmdir %npm%reactxx-activable /s /q
rmdir %npm%reactxx /s /q
rmdir %npm%reactxx-basic /s /q
rmdir %npm%reactxx-fela /s /q
rmdir %npm%reactxx-mui /s /q
rmdir %npm%reactxx-animation /s /q
rmdir %npm%reactxx-mediaq /s /q
rmdir %npm%reactxx-primitives /s /q

cd %root%

call npm install --save-dev reactxx-basic reactxx-mdi reactxx-animation reactxx-primitives reactxx-mediaq reactxx-activable reactxx reactxx-mui %url%expo/types-expo-0.1.1.tgz
call jspm install npm:reactxx-mdi npm:reactxx-activable npm:reactxx-basic npm:reactxx-primitives npm:reactxx-fela npm:reactxx-animation npm:reactxx-mediaq npm:reactxx npm:reactxx-mui

rmdir %root%node_modules\@types\react-dom\node_modules  /s /q
rmdir %root%node_modules\@types\react-transition-group\node_modules  /s /q

copy %root%$blacklist.js %root%node_modules\metro\src\blacklist.js /y

rem call %root%$compile

rem %url%react/types-react-0.1.1.tgz