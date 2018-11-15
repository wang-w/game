var Ball = function(game) {
    var o = game.imageByName('ball')
    o.x = 100
    o.y = 250
    o.speedX = 2
    o.speedY = 2
    o.fired = false
    o.fire = function() {
        o.fired = true
    }
    o.move = function () {
        if (o.fired) {
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.rebound = function () {
        o.speedY = -o.speedY
    }
    o.hasPiont = function (x, y) {
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    return o
}