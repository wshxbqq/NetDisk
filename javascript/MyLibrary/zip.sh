#压缩js
node r.js -o baseUrl=./ name=main out=built.js mainConfigFile=main.js #optimize=none 不压缩仅仅合并
#--------------------------------------------------------------------------------------- 
# 修改main.js 的 data-main="built"
#-o         表示优化，该参数是固定的，必选。
#baseUrl  指存放模块的根目录，这里是r4/js，因为cd到r4中了，只需设置为js。可选，如果没有设置将从r4中查找main.js。
#name     模块的入口文件，这里设置成“main”，那么r.js会从baseUrl+main去查找。这里实际是r4/js/main.js。r.js会分析main.js，找出其所依赖的所有其它模块，然后合并压缩。
#out        指合并压缩后输出的文件路径，这里直接是built.js，那么将输出到根目录r4下。
#
#
####################################################################################################
#
#压缩css
node r.js -o cssIn=css/main.css out=css/built.css optimizeCss=standard
#---------------------------------------------------------------------------------------
#还可以使用optimizeCss参数设置来配置是否压缩及压缩选项。optimizeCss的取值有standard/none/standard.keepLines/standard.keepComments/standard.keepComments.keepLines。
#
#none  不压缩，仅合并
#standard  标准压缩 去换行、空格、注释
#standard.keepLines  除标准压缩外，保留换行
#standard.keepComments  除标准压缩外，保留注释
#standard.keepComments.keepLines  除标准压缩外，保留换行和注释

