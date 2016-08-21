/**
 * Created by duan on 2016/6/27.
 */
var utils = (function () {
    var flag='getComputedStyle'in window;
    function listToArray(arg) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(arg);
        } catch (e) {
            for (var i = 0; i < arg.length; i++) {
                ary.push(arg[i]);
            }

        }
        return ary;
    };
    function jsonParse(str) {
        return 'JSON'in window ? JSON.parse(str) : eval('(' + str + ')');

    };
    function win(attr, value) {//win方法调用时穿了一个参数（检测传了几个参数可以用1 arguments.length2 用typeof value==='undefined')就是获取 否则就是设置.
        if (typeof value === 'undefined') {//获取
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = document.body[attr] = value;//设置
    };
    function offset(curEle) {//获取元素的偏移量
        var l = curEle.offsetLeft;//获取当前元素的外边框距离定位父级的内边框之间的距离
        var t = curEle.offsetTop;
        var par = curEle.offsetParent;//获取第一个定位父级
        while (par) {//如果定位父级存在的情况下
            //因为IE8每次都会自己加上边框 所以要对她进行单独处理
            if (navigator.userAgent.indexOf('MISE 8') === -1) {
                l += par.clientLeft;//加上每个定位父级的border
                t += par.clientTop;
            }
            l += par.offsetLeft;//加上每个定位父级的外边框距离他自己定位父级的内边框的距离
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t};
    };
    function rnd(n, m) {
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        if (n > m) {
            var tmp = n;
            n = m;
            m = tmp;
        }
        return Math.round(Math.random() * (m - n) + n);
    };
    function hasClass(curEle, cName) {
        cName = cName.replace(/(^ +)|( +$)/g, '');
        var reg = new RegExp('\\b' + cName + '\\b');
        return reg.test(curEle.className);
    };
    function addClass(curEle, strClass) {
        //先把类数组转为数组
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var curNode = aryClass[i];
            if (!this.hasClass(curEle, curNode)) {
                curEle.className += curNode;
            }
        }
    };
    function getByClass(curEle, strClass) {
        curEle = curEle || document;
        if ('getComputedStyle'in window) {//高级浏览器的判断
            return this.listToArray(curEle.getElementsByClassName(strClass));
        }
        var aryClass = strClass.replace(/(^ +)|( +$)/g);
        var nodeList = curEle.getElementsByTagName('*')//利用通配符拿到当前元素下的所有元素节点；
        var ary = [];
        var bOk = true;
        for (var i = 0; i < nodeList.length; i++) {
            var curNode = nodeList[i];
            for (var k = 0; k < aryClass.length; k++) {
                var curClass = aryClass[k];
                var reg = new RegExp('(^| +)' + curClass + '( +|$)');
                if (!reg.test(curNode.className)) {
                    bOk = false;
                    break;
                }
            }
            if (bOk) {
                ary[ary.length] = curNode;
            }
        }
        return ary;
    };
    function removeClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var reg = new RegExp('(^| +)' + aryClass[i] + '( +|$)');
            if (reg.test(curEle.className)) {
                curEle.className = curEle.className.replace(reg, ' ');
            }
        }
    };
    function getCss(curEle, attr) {
        var val,reg;
        if (flag) {
            val = getComputedStyle(curEle,null)[attr];
        } else {
            if (attr == 'opacity') {//当用户传opacity时，在低级浏览器下应该取filter的值；
                val = curEle.currentStyle['filter'];//alpha(opacity=10)
                /*reg=/^alpha\(opacity[=:](\d+)\)$/i;
                 return reg.test(val)?reg.exec(val)[1]/100:1;*/
                return /\d+/g.test(val) ? val.match(/\d+/g)[0] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }

        }
        var reg = /^([+-])?\d+(\.\d+)?(px|pt|rem|em)$/g;
        //符合我们规则的值就parseFloat(),不符合直接用 val;
        return reg.test(val) ? parseFloat(val) : val;
    };
    function setCss(curEle, attr, value) {
        if (attr === 'float') {
            curEle.style.styleFloat = value;
            curEle.style.cssFloat = value;
            return;
        }
        if (attr === 'opacity') {
            curEle.style.opacity = value;
            curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
            return;
        }
        var reg = /(width|height|top|right|bottom|left|((margin|pading)(top|right|bottom|left)?))/;
        if (reg.test(attr)) {
            value = parseFloat(value) + 'px';
        }
        curEle.style[attr] = value;
    };
    function setGroupCss(curEle, options) {
        for (var attr in options) {
            this.setCss(curEle, attr, options[attr]);
        }
    };
    function css(curEle) {
        var arg2 = arguments[1];
        //如果第二个参数是字符串的话
        if (typeof arg2 === 'string') {
            var arg3 = arguments[2];
            if (typeof arg3 === 'undefined') {//如果第三个参数不存在 获取样式
                return this.getCss(curEle, arg2)
            } else {//如果第三个参数存在 设置一个
                this.setCss(curEle, arg2, arg3)
            }
        }
        //如果第二个参数对象
        if (arg2.toString() === '[object Object]')

        //设置一组样式
            this.setGroupCss(curEle, arg2)
    };
    function getChild(curEle) {
        if ('getComputedStyle'in window) {
            return this.listToArray(curEle.children);
        }
        var ary = [];
        var nodeList = curEle.childNodes;
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].nodeType === 1) {
                ary[ary.length] = nodeList[i];
            }
        }
        return ary;
    };
    function prev(curEle){
        if(flag){
            return curEle.previousElementSibling;
        }
        var pre=curEle.previousSibling;
        while(prev&&prev.nodeType!==1){
            pre=pre.previousSibling;
        }
        return pre;

    };
    function prevAll(curEle){
        var pre=this.prev(curEle);//先获取上一个哥哥元素节点；
        var ary=[];
        while(pre){
            ary.unshift(pre);
            pre=this.prev(pre);
        }
        return ary;
    };
    function next(curEle){
        if(flag){
            return curEle.nextElementSibling;
        }
        var nex=curEle.nextSibling;
        while(nex&&nex.nodeType!==1){
            nex=nex.nextSibling;
        }
        return nex;
    };
    function nextAll(curEle){
        var nex=this.next(curEle);
        var ary=[];
        while(nex){
            ary[ary.length]=nex;
            nex=this.next(nex);
        };
        return ary;
    };
    function sibling(curEle){
        var pre=this.prev(curEle);
        var nex=this.next(curEle);
        var ary=[];
        if(pre) ary.push(pre);
        //pre?ary.push(pre):null第二种写法
        if(nex) ary.push(nex);
        return ary;
    };
    function siblings(curEle){
        return this.prevAll(curEle).concat(this.nextAll(curEle));
    };
    function firstChild(curEle){
        return this.getChild(curEle)[0];
    };
    function lastChild(curEle){
        var last=this.getChild(curEle);
        return last[last.length-1];
    };
    function index(curEle){
        return this.prevAll(curEle).length;
    };
    function appendChild(parent,newEle){
        parent.appendChild(newEle);
    };
    function perPendChild(parent,newEle){
        var first=this.firstChild(parent);
        if(first){
            parent.insertBefore(newEle,first);
        }else{
            parent.appendChild(newEle);
        }
    };
    function insertBefore(newEle,oldEle){
        oldEle.parentNode.insertBefore(newEle,oldEle);
    };
    function insertAfter(newEle,oldEle){
        var nex=this.next(oldEle);
        if(nex){
            oldEle.parentNode.insertBefore(newEle,nex);
        }else{
            oldEle.parentNode.appendChild(newEle);
        }
    };
    return {
        //类数组转数组
        listToArray:listToArray,
        //把json的字符串转化为json数据
        jsonParse:jsonParse,
        //获取和设置值
        win:win ,
        //元素的偏移量top left
        offset:offset,
        //获取任意范围内的随机数
        rnd:rnd,
        //判断某个标签上是否有某个class名
        hasClass:hasClass,
        //给元素增加类名 可以一次添加多个（如果元素身上没有这个名才给添加)
        addClass:addClass ,
        //获取某个元素的class名
        getByClass:getByClass ,
        removeClass:removeClass,
        //获取元素的非行间样式
        getCss:getCss,
        //设置元素的行间样式；(给某个元素的某个属性添加某个值；)
        setCss:setCss,
        //给元素设置一组样式 (给一个元素添加一组样式)
        setGroupCss: setGroupCss,
        //获取元素的样式 设置元素的样式 给元素设置一组样式；
        css:css ,
        //获取子元素节点
        getChild:getChild,
        //获取上一个哥哥节点；
        prev:prev,
        //获取所有的哥哥元素节点；
        prevAll:prevAll,
        //获取当前元素的下一个弟弟元素节点；
        next:next,
        //获取所有的弟弟元素节点
        nextAll:nextAll,
        //获取相邻元素；
        sibling:sibling,
        //获取当前元素的所有兄弟节点 是所有的哥哥节点加上弟弟元素节点
        siblings:siblings,
        //当前元素的第一个子元素
        firstChild:firstChild,
        //当前元素的下的最后一个子元素
        lastChild:lastChild,
        //获取当前元素的索引
        index:index,
        appendChild:appendChild,
        perPendChild:perPendChild,
        insertBefore:insertBefore,
        insertAfter:insertAfter,













    }
})()
