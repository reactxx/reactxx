set drive=c

set root=%drive%:\muix\build-types-material-ui\

%drive%:
cd %drive%:\temp

pause

rmdir material-ui /s /q

call git clone -b v1-beta --single-branch https://github.com/mui-org/material-ui.git

cd %drive%:\temp\material-ui

rename src material-ui

cd %drive%:\temp\material-ui\material-ui

del *.js /s /q
del *.spec.* /s /q

rmdir %root%material-ui /s /q

cd %root%

move %drive%:\temp\material-ui\material-ui %root%material-ui
pause
rmdir %drive%:\temp\material-ui /s /q

cd %root%
rmdir node_modules /s /q
call npm install

call generate.cmd