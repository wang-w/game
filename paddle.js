var Paddle = function(game) {
    console.log(game, 123)
    var o = game.imageByName('paddle')
    o.x = 100
    o.y = 200
    o.speed = 5
    o.move = function(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.image.width) {
            x = 400 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function() {
        o.move(o.x - o.speed)
    }
    o.moveRight = function() {
        o.move(o.x + o.speed)
    }
    return o
}