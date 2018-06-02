set drive=c:

del %drive%\reactxx\muix\src\reactxx\typings\types.ts /q
del %drive%\reactxx\muix\src\mediaq\typings\types.ts  /q
del %drive%\reactxx\muix\src\animation\typings\types.ts  /q
rmdir %drive%\reactxx\muix\src\ks 

mklink %drive%\reactxx\muix\src\reactxx\typings\types.ts %drive%\reactxx\muix\src\basic\typings\types.ts
mklink %drive%\reactxx\muix\src\mediaq\typings\types.ts %drive%\reactxx\muix\src\basic\typings\types.ts
mklink %drive%\reactxx\muix\src\animation\typings\types.ts %drive%\reactxx\muix\src\basic\typings\types.ts
mklink %drive%\reactxx\muix\src\ks %drive%\reactxx\reactxx-kitchen-sink\src /d