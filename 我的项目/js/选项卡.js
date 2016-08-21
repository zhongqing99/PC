/**
 * Created by duan on 2016/7/25.
 */
var hot = document.getElementById('backGround'),
    picture = hot.getElementsByClassName('picture')[0],
    topB = picture.getElementsByClassName('topB')[0],
    oLis = topB.getElementsByTagName('li'),
    imageB = hot.getElementsByClassName('imageB')[0],
    oUl = imageB.getElementsByTagName('ul');

    function choose(ele, box) {
        for (var i = 0; i < ele.length; i++) {
            ele[i].index = i;
            ele[i].onclick = function () {
                for (var j = 0; j < ele.length; j++) {
                    ele[j].className = '';
                    box[j].className = ''
                }
                ele[this.index].className = 'hot';
                box[this.index].className = 'box1'

            }
        }
    };
choose(oLis, oUl);


var box2 = oUl[1],
    btnS = box2.getElementsByTagName('b'),
    Div = document.getElementById('out'),
    oDivS = Div.getElementsByTagName('div');

var box3 = oUl[2],
    oB = box3.getElementsByTagName('b'),
    Div2 = document.getElementById('out1'),
    oDivS2 = Div2.getElementsByTagName('div');

var box4 = oUl[3],
    oB4 = box4.getElementsByTagName('b'),
    Div4 = document.getElementById('out4'),
    oDivS4 = Div4.getElementsByTagName('div');

var box5 = oUl[4],
    oB5 = box5.getElementsByTagName('b'),
    Div5 = document.getElementById('out5'),
    oDivS5 = Div5.getElementsByTagName('div');

//选项卡部分
function chooseGame(curEle, hide) {
    for (var i = 0; i < curEle.length; i++) {
        curEle[i].index = i;
        curEle[i].onclick = function () {
            for (var j = 0; j < curEle.length; j++) {
                curEle[j].className = '';
                hide[j].className = '';
            }
            curEle[this.index].className = 'word';
            hide[this.index].className = 'nav';

        }
    }
};
chooseGame(btnS, oDivS);
chooseGame(oB, oDivS2);
chooseGame(oB4, oDivS4);
chooseGame(oB5, oDivS5);



var content=document.getElementById('content'),
    liS=content.getElementsByTagName('li'),
    context=document.getElementById('context'),
    divS=context.getElementsByTagName('div');

    chooseCon(liS, divS);
function chooseCon(curEle, hide) {
    for (var i = 0; i < curEle.length; i++) {
        curEle[i].index = i;
        curEle[i].onclick = function () {
            for (var j = 0; j < curEle.length; j++) {
                curEle[j].className = '';
                hide[j].className = '';
            }
            curEle[this.index].className = 'recommend1';
            hide[this.index].className = 'care';

        }
    }
};