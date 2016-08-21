/**
 * Created by duan on 2016/7/25.
 */
//轮播图

var  skin=document.getElementsByClassName('skin'),
    backGround=document.getElementById('backGround');

       skin.onclick=function(){
           backGround.style.display="block";
       };


var out = document.getElementsByClassName('out');
var oDiv = out[0].getElementsByTagName('div');
var focus = document.getElementsByClassName('focus');
var em = focus[0].getElementsByTagName('em');
var spanS = focus[0].getElementsByTagName('span');
var step = null;

var oDivT = out[5].getElementsByTagName('div');
var emT = focus[1].getElementsByTagName('em');
var spanST = focus[1].getElementsByTagName('span');

var oDivA = out[6].getElementsByTagName('div');
var emA = focus[2].getElementsByTagName('em');
var spanSA = focus[2].getElementsByTagName('span');

var oDivB = out[7].getElementsByTagName('div');
var emB= focus[3].getElementsByTagName('em');
var spanSB = focus[3].getElementsByTagName('span');

banner(oDivT,spanST,emT);
banner(oDivA,spanSA,emA);
banner(oDivB,spanSB,emB);
banner(oDiv,spanS,em);

function banner(oDiv,spanS,em) {

    function bannerTip() {
        for (var i = 0; i < oDiv.length; i++) {
            if (i === step) {
                utils.css(oDiv[i], 'z-Index', 1)
                zhufengAnimate(oDiv[i], {opacity: 1}, 500, function () {
                    var siblings = utils.siblings(this);
                    for (var j = 0; j < siblings.length; j++) {
                        zhufengAnimate(siblings[j], {opacity: 0}, 500);
                    }
                })
            } else {
                utils.css(oDiv[i], 'z-Index', 0)
            }
        }
        setBanner();
    }
    function setBanner() {
        for (var i = 0; i < spanS.length; i++) {
            spanS[i].className = i === step ? 'span1' : '';
        }
    }
    handChange();
    function handChange() {
        for (var i = 0; i < spanS.length; i++) {
            (function (index) {
                spanS[index].onclick = function () {
                    step = index;
                    bannerTip();
                }
            })(i)
        }
    }

       em[0].onclick = function () {
           if (step <= 0) {
               step = oDiv.length;
           }
           step--;
           bannerTip()
       };
       em[1].onclick = function () {
           if (step >= oDiv.length - 1) {
               step = -1;
           }
           step++;
           bannerTip()
       };

}
