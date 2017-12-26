set root=D:\muix\build-types-material-ui\
d:
cd d:\temp

rmdir material-ui /s /q

call git clone -b v1-beta --single-branch https://github.com/mui-org/material-ui.git

cd d:\temp\material-ui

rename src material-ui

cd d:\temp\material-ui\material-ui

del *.js /s /q
del *.spec.* /s /q

rmdir %root%material-ui /s /q

cd %root%

move d:\temp\material-ui\material-ui %root%material-ui
pause
rmdir d:\temp\material-ui /s /q

cd %root%
rmdir node_modules /s /q
call npm install

call generate.cmd