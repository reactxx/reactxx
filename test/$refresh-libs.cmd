set root=D:\muix\test\
set url=https://github.com/mui-x/muix/blob/master/types/

d:

cd %root%\jspm_packages
rmdir npm /s /q
cd %root%
call jspm install npm:muix-icons npm:muix-styles npm:muix-primitives npm:muix-components npm:muix 

cd %root%

call npm update muix-icons muix-styles muix-primitives muix-components muix 
call npm update %url%expo/types-expo-0.1.1.tgz?raw=true %url%react/types-react-0.1.1.tgz?raw=true %url%react-native/types-react-native-0.1.1.tgz?raw=true 

cd %root%node_modules\@types
rmdir node /s /q

cd %root%node_modules\@types\react-dom
rmdir node_modules  /s /q

copy D:\muix\test\$blacklist.js d:\muix\test\node_modules\metro-bundler\src\blacklist.js /y

