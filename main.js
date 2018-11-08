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
        paddle: 'img/paddle.png',
        ball: 'img/ball.png',
        block: 'img/block.png',
    }

    var game = Guagame.instance(60, images, function (game) {
        // var s = Scene(game)
        // g.runWithScene(s)
        return SceneTitle.new(game)
    })
    enableDebugMode(game, true)

    e('.j-editor').addEventListener('click', function () {
        var editor = SceneEditor.new(game)
        game.replaceScene(editor)
    })

}

__main();