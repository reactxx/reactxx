set root=D:\muix\muix\
set url=https://github.com/mui-x/muix/blob/master/types/

d:

cd %root%

call npm update muix-icons %url%expo/types-expo-0.1.1.tgz?raw=true %url%types/react/types-react-0.1.1.tgz?raw=true %url%types/react-native/types-react-native-0.1.1.tgz?raw=true --latest
call jspm install npm:muix-icons

cd %root%node_modules\@types
rmdir node /s /q

cd %root%node_modules\@types\react-dom
rmdir node_modules  /s /q
