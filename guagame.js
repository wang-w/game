var GuaGame = function (fps, images, runCallback) {
    var g = {
        actions: {},
        keydowns: {},
        images: []
    }
    var canvas = document.querySelector('#canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    g.drawImage = function(guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }
    window.addEventListener('keydown', (event) => {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', (event) => {
        g.keydowns[event.key] = false
    })
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    window.fps = 60
    var runloop = function() {
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        //update
        g.update()
        //clear
        context.clearRect(0, 0, canvas.width, canvas.height);
        //draw
        g.draw()
        setTimeout(() => {
            runloop()
        }, 1000/window.fps)
    }
    var loads = []
    //预先载入所有图片
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++) {
        let name = names[i]
        var path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function () {
            // 存在g.images中
            g.images[name] = img
            loads.push(1)
            if (loads.length === names.length) {
                log(g.images)
                g.run()
            }
        }
    }
    g.imageByName = function(name) {
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    g.run = function() {
        runCallback(g)
        //开始运行程序
        setTimeout(() => {
            runloop()
        }, 1000/window.fps)
    }

    return g
}