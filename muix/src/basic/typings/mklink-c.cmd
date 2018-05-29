set drive=c:

del %drive%\reactxx\muix\src\reactxx\typings\types.ts /q
del %drive%\reactxx\muix\src\mediaq\typings\types.ts  /q
del %drive%\reactxx\muix\src\animation\typings\types.ts  /q

mklink %drive%\reactxx\muix\src\reactxx\typings\types.ts D:\reactxx\muix\src\basic\typings\types.ts
mklink %drive%\reactxx\muix\src\mediaq\typings\types.ts D:\reactxx\muix\src\basic\typings\types.ts
mklink %drive%\reactxx\muix\src\animation\typings\types.ts D:\reactxx\muix\src\basic\typings\types.ts