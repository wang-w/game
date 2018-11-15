// var Gua_game = function (fps, images, runCallback) {
//     var g = {
//         scene: null,
//         actions: {},
//         keydowns: {},
//         images: []
//     }
//     var canvas = document.querySelector('#canvas')
//     var context = canvas.getContext('2d')
//     g.canvas = canvas
//     g.context = context
//     g.drawImage = function(guaImage) {
//         g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
//     }
//     window.addEventListener('keydown', (event) => {
//         g.keydowns[event.key] = true
//     })
//     window.addEventListener('keyup', (event) => {
//         g.keydowns[event.key] = false
//     })
//     // update
//     g.update = function() {
//         g.scene.update()
//     }
//     // draw
//     g.draw = function() {
//         g.scene.draw()
//     }
//     g.registerAction = function(key, callback) {
//         g.actions[key] = callback
//     }
//     window.fps = 60
//     var runloop = function() {
//         var actions = Object.keys(g.actions)
//         for (var i = 0; i < actions.length; i++) {
//             var key = actions[i]
//             if (g.keydowns[key]) {
//                 g.actions[key]()
//             }
//         }
//         //update
//         g.update()
//         //clear
//         context.clearRect(0, 0, canvas.width, canvas.height);
//         //draw
//         g.draw()
//         setTimeout(() => {
//             runloop()
//         }, 1000/window.fps)
//     }
//     var loads = []
//     //预先载入所有图片
//     var names = Object.keys(images)
//     for (var i = 0; i < names.length; i++) {
//         let name = names[i]
//         var path = images[name]
//         let img = new Image()
//         img.src = path
//         img.onload = function () {
//             // 存在g.images中
//             g.images[name] = img
//             loads.push(1)
//             if (loads.length === names.length) {
//                 log(g.images)
//                 g.run()
//             }
//         }
//     }
//     // g.imageByName = function(name) {
//     //     var img = g.images[name]
//     //     var image = {
//     //         w: img.width,
//     //         h: img.height,
//     //         image: img,
//     //     }
//     //     return image
//     // }
//
//     // g.runWithScene = function(scene) {
//     //     g.scene = scene
//     //     setTimeout(() => {
//     //         runloop()
//     //     }, 1000/window.fps)
//     // }
//     //
//     // g.run = function() {
//     //     g.scene = runCallback(g)
//     //     //开始运行程序
//     //     setTimeout(() => {
//     //         runloop()
//     //     }, 1000/window.fps)
//     // }
//
//     // g.replaceScene = function (scene) {
//     //     g.scene = scene
//     // }
//
//     return g
// }

class Guagame {
    constructor(fps, images, runCallback) {
        window.fps = 60
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
        this.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
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

    imageByName(name) {
        var img = this.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
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