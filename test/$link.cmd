set root=d:\muix\

d:

cd %root%test

call yarn link "@types/react-native"
call yarn link "@types/react"
call yarn link "@types/expo"

call jspm link %root%muix\deploy\styles -y
call jspm link %root%muix\deploy\primitives -y
call jspm link %root%muix\deploy\components -y
call jspm link %root%build-icons\deploy -y


