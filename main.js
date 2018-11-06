var loadLevel = function (game, n) {
    n = n - 1
    var levle = levels[n]
    var blocks = []
    for (var i = 0; i < levle.length; i++) {
        var p = levle[i]
        var b = Block(game, p)
        b.x = p[0]
        b.y = p[1]
        blocks.push(b)
    }
    return blocks
}

var blocks = []

var enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    }
    // 为了debug
    window.addEventListener('keydown', function (event) {
        var key = event.key
        if (key === 'p') {
            window.paused = !window.paused
        } else if ('1234567'.includes(key)) {
            blocks = loadLevel(game, Number(key))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function (event) {
        log(event.target.value)
        window.fps = Number(event.target.value)
    })
}

var __main = function () {
    var images = {
        paddle: 'paddle.png',
        ball: 'ball.png',
        block: 'block.png',
    }
    var game = GuaGame(60, images, function (game) {
        var paddle = Paddle(game)
        var ball = Ball(game)
        var score = 0
        blocks = loadLevel(game, 1)
        window.paused = false

        game.registerAction('a', function () {
            paddle.moveLeft()
        })
        game.registerAction('d', function () {
            paddle.moveRight()
        })
        game.registerAction('f', function () {
            ball.fire()
        })

        game.update = function() {
            if (window.paused) {
                return
            }
            ball.move()
            if (rectIntersect(paddle, ball)) {
                ball.rebound()
            }
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (rectIntersect(block, ball) && block.alive) {
                    block.kill()
                    ball.rebound()
                    score += 100
                }
            }
        }
        game.draw = function() {
            game.context.fillStyle = '#553'
            game.context.fillRect(0, 0, 400, 300)
            game.drawImage(paddle)
            game.drawImage(ball)
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.alive) {
                    game.drawImage(block)
                }
            }
            game.context.fillText('得分：' + score, 10, 290);
        }
        // mouse event
        var enableDrag = false

        game.canvas.addEventListener('mousedown', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            if (ball.hasPiont(x, y)) {
                enableDrag = true
            }
        })

        game.canvas.addEventListener('mousemove', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            if (enableDrag) {
                ball.x = x
                ball.y = y
            }
        })

        game.canvas.addEventListener('mouseup', function (event) {
            enableDrag = false
        })
    })
    enableDebugMode(game, true)

}

__main();