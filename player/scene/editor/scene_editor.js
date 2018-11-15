class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)
        this.levels = []
        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    draw() {
        this.game.context.fillText('编辑关卡', 100, 290);
    }

    clear() {
        var tds = document.querySelectorAll('.j-table td')
        tds.forEach((item) => {
            item.classList.remove('active')
        })
        this.levels = []
    }

    init() {
        e('.j-table').addEventListener('click', (event) => {
            var self = event.target
            if (self.classList.contains('active')) {
                self.classList.remove('active')
            } else {
                self.classList.add('active')
            }
            var level = []
            var x = Math.floor(event.layerX / 50) * 50
            var y = Math.floor(event.layerY / 20) * 20
            level[0] = x
            level[1] = y
            var index = findArray(this.levels, level)
            if (index > -1) {
                this.levels.splice(index, 1)
            } else {
                this.levels.push(level)
            }
        }, false)

        e('.j-save').addEventListener('click', () => {
            var levelsStr = JSON.stringify(this.levels)
            localStorage.levels = levelsStr
        })

        e('.j-start').addEventListener('click', (event) => {
            e('.j-table').classList.remove('show')
            var s = Scene(this.game)
            this.game.replaceScene(s)
        })
    }
}