set root=d:\muix\muix\
set package=%1
set webroot=%2


rem *** prepare package
cd %root%deploy/%package%
rmdir es /s /q
md es
del *.js *.ts /s /q

xcopy /s /q %root%deploy\es\%package%\*.* %root%deploy\%package%\es\

IF "%webroot%"=="true" (
xcopy /s /q %root%deploy\lib\%package%\web\*.* %root%deploy\%package%\ 
echo 1 "%webroot%"
) ELSE (
xcopy /s /q %root%deploy\lib\%package%\*.* %root%deploy\%package%\
echo 2 "%webroot%"
)

rmdir %root%deploy\%package%\native /s /q
del %root%deploy\%package%\es\web\*.js /s /q

rem *** publish
call npm.cmd version patch
call npm.cmd publish

cd %root%deploy/%package%
call yarn link
