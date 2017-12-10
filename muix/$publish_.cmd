set root=d:\muix\muix\
set package=%1

rem *** prepare package
cd %root%deploy/%package%
rmdir es /s /q
md es
rmdir lib /s /q
md lib
xcopy /s /q %root%deploy\es\%package%\*.* %root%deploy\%package%\es
xcopy /s /q %root%deploy\lib\%package%\*.* %root%deploy\%package%\lib
rmdir %root%deploy\%package%\lib\native /s /q
del %root%deploy\%package%\es\web\*.js /s /q

rem *** publish
call npm.cmd version patch
call npm.cmd publish
