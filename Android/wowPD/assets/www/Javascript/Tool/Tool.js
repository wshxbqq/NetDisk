(function () {
    var t = window.Common = {};
    var RT=window.RunTime;
    t.toInt = function (str) {
        return window.parseInt(str);
    }

    t.createDom = function (trg, prop, css) {
        var dom = document.createElement(trg);
        if (prop) {
            $(dom).attr(prop);
        };
        if (css) {
            $(dom).css(css);
        };

        return dom;


    };

    t.swap = function (ico1, ico2) {


        var array1 = ico1.parent.icoArray;
        var index1;
        for (var i = 0; i < array1.length; i++) {
            if (array1[i] == ico1) {
                index1 = i;
                break;
            }
        }


        var array2 = ico2.parent.icoArray;
        var index2;
        for (var j = 0; j < array2.length; j++) {
            if (array2[j] == ico2) {
                index2 = j;
                break;
            }
        };


        var swaperParent = array1[index1].parent;
        array1[index1].parent = array2[index2].parent;
        array2[index2].parent = swaperParent;

        var swaper = array1[index1];
        array1[index1] = array2[index2];
        array2[index2] = swaper;

    }
    t.getOneFromArray = function (array) {
        var result;
        var ran = t.toInt(Math.random() * array.length);
        result = array[ran];
        return result;

    };

    t.getOneFromObj = function (obj) {
        var array = [];
        var result;
        for (var i in obj) {
            array.push(i);
        };
        if (array.length > 0) {
            var ran = t.toInt(Math.random() * array.length);
            result = obj[array[ran]]
        }
        else {
            result = null;
        }
        return result;
    };


    t.ansyBingo=function(){
        var newBingoArray=[];
        var addToNewBingoArray=function(bingo){
            var flag=false;
            var current;
            for (var i = 0; i < newBingoArray.length; i++) {
                var b=newBingoArray[i];
                for (var j = 0; j < b.bingoArray.length; j++) {
                    var ico=b.bingoArray[j];
                    for (var k = 0; k < bingo.bingoArray.length; k++) {
                        var _ico=bingo.bingoArray[k];
                        if (ico==_ico) {
                            flag=true;
                            current=b;
                        };
                    };
                };
            };
            if (!flag) {
                newBingoArray.push(bingo);
                console.log(bingo);
            }else{
                for (var k = 0; k < bingo.bingoArray.length; k++) {
                    var innerFalg=false;
                    var innerIco=bingo.bingoArray[k];
                    for (var l = 0; l < current.bingoArray.length; l++) {
                       var _innerBingo= current.bingoArray[l];
                       if(innerIco==_innerBingo){
                        innerFalg=true;
                       };
                    };
                    if (!innerFalg) {
                        current.bingoArray.push(innerIco);
                    };
                    
                };
            }

            console.log(current);
        }
            var bArray=RT.binggoArray;
            for (var z = 0; z < bArray.length; z++) {
                addToNewBingoArray(bArray[z]);
            };

            RT.binggoArray=newBingoArray;
        };
    

})()