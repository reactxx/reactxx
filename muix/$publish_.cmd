set root=d:\reactxx\muix\
set package=%1
set webroot=%2


rem *** prepare package
cd %root%deploy/%package%
rmdir es /s /q
md es
del *.js *.ts /s /q

xcopy /s /q %root%deploy\es\%package%\*.* %root%deploy\%package%\es\
xcopy /s /q %root%deploy\lib\%package%\*.* %root%deploy\%package%\

IF "%package%"=="mui" (
rmdir %root%deploy\%package%\es\Button /s /q
rmdir %root%deploy\%package%\es\ButtonBase /s /q
cd %root%deploy\%package%\es
del *.js *.ts /q
echo 1 "%package%"
)

cd %root%deploy/%package%

rmdir %root%deploy\%package%\native /s /q
del %root%deploy\%package%\es\web\*.js /s /q

rem rmdir %root%deploy\%package%\typings /s /q
rem xcopy %root%src\%package%\typings %root%deploy\%package%\typings /s /q /i 
rem rmdir %root%deploy\%package%\es\typings /s /q
rem xcopy %root%src\%package%\typings %root%deploy\%package%\es\typings /s /q /i 

copy %root%src\%package%\README.md %root%deploy\%package%\README.md

rem *** publish
call npm.cmd version patch
call npm.cmd publish
