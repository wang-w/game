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
    var maxX,
        maxY,
        minX,
        minY;
    maxX = rect1.x + rect1.image.width >= rect2.x + rect2.image.width ? rect1.x + rect1.image.width : rect2.x + rect2.image.width
    maxY = rect1.y + rect1.image.height >= rect2.y + rect2.image.height ? rect1.y + rect1.image.height : rect2.y + rect2.image.height
    minX = rect1.x <= rect2.x ? rect1.x : rect2.x
    minY = rect1.y <= rect2.y ? rect1.y : rect2.y

    if (maxX - minX <= rect1.image.width + rect2.image.width && maxY - minY <= rect1.image.height + rect2.image.height) {
        return true
    } else {
        return false
    }
}