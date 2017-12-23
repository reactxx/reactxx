set root=d:\muix\muix\
set package=%1

rem *** prepare package
cd %root%deploy/%package%
rmdir es /s /q
md es
del *.js *.ts /s /q

xcopy /s /q %root%deploy\es\%package%\*.* %root%deploy\%package%\es\
xcopy /s /q %root%deploy\lib\%package%\*.* %root%deploy\%package%\

rmdir %root%deploy\%package%\native /s /q
del %root%deploy\%package%\es\web\*.js /s /q

rem *** publish
call npm.cmd version patch
call npm.cmd publish

cd %root%deploy/%package%
call yarn link
