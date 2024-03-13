@REM pnpm build
cd packages\theme
del *.tgz
pnpm pack
cd ..\search-pro
del *.tgz
pnpm pack
cd ..\..