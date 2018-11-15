class Guagame {
    constructor(fps, images, runCallback) {
        window.fps = 30
        this.fps = fps
        this.images = images
        this.runCallback = runCallback
        this.actions = {}
        this.keydowns = {}
        this.scene = null
        this.canvas = document.querySelector('#canvas')
        this.context = this.canvas.getContext('2d')
        window.addEventListener('keydown', (event) => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', (event) => {
            this.keydowns[event.key] = false
        })

        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawImage(guaImage) {
        this.context.drawImage(guaImage.texture, guaImage.x, guaImage.y)
    }

    update() {
        this.scene.update()
    }

    draw() {
        this.scene.draw()
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    textureByName(name) {
        var img = this.images[name]
        // var image = {
        //     w: img.width,
        //     h: img.height,
        //     image: img,
        // }
        return img
    }

    runloop() {
        var self = this
        var actions = Object.keys(this.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (this.keydowns[key]) {
                this.actions[key]()
            }
        }
        //update
        this.update()
        //clear
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //draw
        this.draw()
        setTimeout(() => {
            self.runloop()
        }, 1000/window.fps)
    }

    run() {
        var self = this
        this.scene = this.runCallback(this)
        //开始运行程序
        setTimeout(() => {
            self.runloop()
        }, 1000/window.fps)
    }

    replaceScene(scene) {
        this.scene = scene
    }

    init() {
        var g = this;
        var loads = []
        //预先载入所有图片
        var names = Object.keys(this.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = this.images[name]
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
    }
}