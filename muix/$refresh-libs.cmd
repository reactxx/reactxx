set root=D:\muix\muix\

d:

cd %root%\jspm_packages
rmdir npm /s /q
cd %root%
call jspm install npm:muix-icons

cd %root%

call npm update muix-icons 

cd %root%node_modules\@types
rmdir node /s /q

call %root%$compile

