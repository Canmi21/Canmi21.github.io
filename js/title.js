var OriginTitile = document.title;
var titleTime;
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = '(つェ⊂)我藏好了哦~';
        clearTimeout(titleTime);
    } else {
        document.title = '(*´∇｀*)被你发现啦~';
        titleTime = setTimeout(function() {
            document.title = OriginTitile;
        }, 2100);
    }
});
