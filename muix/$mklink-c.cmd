set drive=c:

set muix=%drive%\reactxx\muix\src\

rem --------------
set src=%drive%\reactxx\muix\src\basic\typings\types.ts

set dest=%muix%mediaq\typings\types.ts
del %dest% /q
mklink %dest% %src%

set dest=%muix%animation\typings\types.ts
del %dest% /q
mklink %dest% %src%

rem --------------
set src=%drive%\reactxx\muix\src\typings.d.ts

set dest=%muix%animation\typings.d.ts
del %dest% /q
mklink %dest% %src%

set dest=%muix%basic\typings.d.ts
del %dest% /q
mklink %dest% %src%

set dest=%muix%fela\typings.d.ts
del %dest% /q
mklink %dest% %src%

set dest=%muix%icons\typings.d.ts
del %dest% /q
mklink %dest% %src%

set dest=%muix%mediaq\typings.d.ts
del %dest% /q
mklink %dest% %src%

set dest=%muix%mui-web\typings.d.ts
del %dest% /q
mklink %dest% %src%

set dest=%muix%muix\typings.d.ts
del %dest% /q
mklink %dest% %src%

set dest=%muix%primitives\typings.d.ts
del %dest% /q
mklink %dest% %src%

set dest=%muix%sheeter\typings.d.ts
del %dest% /q
mklink %dest% %src%

set dest=%drive%\reactxx\reactxx-kitchen-sink\src\typings.d.ts
del %dest% /q
mklink %dest% %src%

rem --------------
rmdir %drive%\reactxx\muix\src\ks 
mklink %drive%\reactxx\muix\src\ks %drive%\reactxx\reactxx-kitchen-sink\src /d

