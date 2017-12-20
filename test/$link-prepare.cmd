set root=d:\muix\

d:

cd %root%muix\deploy\styles
call yarn link

cd %root%muix\deploy\primitives
call yarn link

cd %root%muix\deploy\components
call yarn link

cd %root%build-icons\deploy
call yarn link

cd %root%types-expo
call yarn link

cd %root%types-react
call yarn link

cd %root%types-react-native
call yarn link
