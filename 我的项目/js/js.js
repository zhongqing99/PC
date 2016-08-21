/**
 * Created by duan on 2016/8/8.
 */
(function () {

    document.onclick = function (e) {
            e=e||window.event;
        var tar= e.target|| e.srcElement,
            tarTag=tar.tagName.toLowerCase();
        if(tarTag==='changeSkin'){
            backGround.style.display='block';
        }

    }


})();
(function(){







})()