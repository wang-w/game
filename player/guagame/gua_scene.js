class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModeEnabled = false
        this.elements = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    draw() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            // this.game.drawImage(e)
            e.draw()
        }
    }
    update() {
        if (this.debugModeEnabled) {
            for (var i = 0; i < this.elements.length; i++) {
                var e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            if (e.name == 'bullet') {
                if (e.y < 0 || !e.alive || e.y > 854) {
                    this.elements.splice(i, 1)
                }
            }
            // 判断敌机生命值
            if (e.name == 'enemy' && !e.alive) {
                this.elements.splice(i, 1)
            }
            // 判断玩家生死
            if (e.name == 'player' && !e.alive) {
                this.elements.splice(i, 1)
            }
            e.update()
        }
    }
    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }
}

