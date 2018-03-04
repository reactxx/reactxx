set drive=d:
set root=%drive%\reactxx\types\
%drive%
cd %root%react-native
call npm pack

cd %root%react
call npm pack

cd %root%expo
call npm pack

rem cd %root%reactxx
rem call npm pack
