set root=d:\reactxx\muix\
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

rmdir %root%deploy\%package%\typings /s /q
xcopy %root%src\%package%\typings %root%deploy\%package%\typings /s /q /i 
rmdir %root%deploy\%package%\es\typings /s /q
xcopy %root%src\%package%\typings %root%deploy\%package%\es\typings /s /q /i 

copy %root%src\%package%\README.md %root%deploy\%package%\README.md


rem *** publish
call npm.cmd version patch
call npm.cmd publish

rem cd %root%deploy/%package%
rem call yarn link
