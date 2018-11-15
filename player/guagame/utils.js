var log = console.log.bind(console)

var e = function (selector) {
    return document.querySelector(selector)
}

var imgFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersect = function (rect1, rect2) {
    // console.log(rect1, rect2, 333)
    var maxX,
        maxY,
        minX,
        minY;
    maxX = rect1.x + rect1.w >= rect2.x + rect2.w ? rect1.x + rect1.w : rect2.x + rect2.w
    maxY = rect1.y + rect1.h >= rect2.y + rect2.h ? rect1.y + rect1.h : rect2.y + rect2.h
    minX = rect1.x <= rect2.x ? rect1.x : rect2.x
    minY = rect1.y <= rect2.y ? rect1.y : rect2.y

    if (maxX - minX <= rect1.w + rect2.w && maxY - minY <= rect1.h + rect2.h) {
        return true
    } else {
        return false
    }
}

var findArray = function (arrList, arr) {
    var index = -1
    for (var i = 0; i < arrList.length; i++) {
        var a = arrList[i]
        if (JSON.stringify(a) == JSON.stringify(arr)) {
            index = i
        }
    }
    return index
}

const randomBetween = function (start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start)
}