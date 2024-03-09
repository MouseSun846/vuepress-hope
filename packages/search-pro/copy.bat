cd /d D:\Code\document-manager\vuepress-document\node_modules\vuepress-plugin-search-pro
del /S /Q *
cd /d D:\Code\document-manager\vuepress-theme-hope\packages\search-pro
xcopy /E /Y .\lib D:\Code\document-manager\vuepress-document\node_modules\vuepress-plugin-search-pro\lib
xcopy /E /Y .\node_modules D:\Code\document-manager\vuepress-document\node_modules\vuepress-plugin-search-pro\node_modules
copy /Y .\package.json D:\Code\document-manager\vuepress-document\node_modules\vuepress-plugin-search-pro
copy /Y .\README.md D:\Code\document-manager\vuepress-document\node_modules\vuepress-plugin-search-pro
copy /Y .\LICENSE D:\Code\document-manager\vuepress-document\node_modules\vuepress-plugin-search-pro
