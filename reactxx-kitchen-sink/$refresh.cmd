set root=d:\reactxx\reactxx-kitchen-sink\

d:

cd %root%
call yarn upgrade
call yarn install

rmdir %root%node_modules\@types\react-dom\node_modules /s /q