var Scene = function (game) {
    var s = {
        game: game,
        
    }
    // 初始化
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
    s.draw = function () {
        //背景
        game.context.fillStyle = '#553'
        game.context.fillRect(0, 0, 400, 300)
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
        // draw blocks
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        game.context.fillText('得分：' + score, 10, 290);
    }
    s.update = function () {
        if (window.paused) {
            return
        }
        ball.move()
        // 判断游戏结束
        if (ball.y > paddle.y) {
            // 跳转到游戏结束场景
            var end = SceneEnd(game)
            game.replaceScene(end)
            return
        }
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
    return s
}