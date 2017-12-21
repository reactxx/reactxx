set root=D:\muix\test\

d:

yarn upgrade muix-styles --latest
yarn upgrade muix-primitives --latest
yarn upgrade muix-components --latest

cd %root%
rmdir node_modules /s /q
cd %root%\jspm_packages
rmdir npm /s /q

cd %root%
call npm install
call jspm update

rmdir %root%\node_modules\@types\node /s /q

copy D:\muix\test\$blacklist.js d:\muix\test\node_modules\metro-bundler\src\blacklist.js /y

call npm link gulp

call npm link 

