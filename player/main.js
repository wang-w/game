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
            // blocks = loadLevel(game, Number(key))
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
        bullet: 'img/bullet.png',
        cloud: 'img/cloud.png',
        player: 'img/player.png',
        sky: 'img/sky.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy1.png',
        enemy4: 'img/enemy0.png',
        fire: 'img/fire.png',
    }

    var game = Guagame.instance(30, images, function (game) {
        return Scene.new(game)
        // return SceneTitle.new(game)
    })
    enableDebugMode(game, true)

    e('.j-editor').addEventListener('click', function () {
        e('.j-table').classList.add('show')
        var editor = SceneEditor.instance(game)
        editor.clear()
        localStorage.levels = JSON.stringify([])
        game.replaceScene(editor)
    })
}

__main();