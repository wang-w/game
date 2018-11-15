class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        return new this(game, text)
    }
    draw() {
        this.game.context.fillText(this.text, 100, 100);
    }
    update() {

    }
}

class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }

    setup() {
        this.life = 8
    }

    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    update() {
        this.life--

        this.x += this.vx
        this.y += this.vy
        var factor = 0.1
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class GuaParticleSystem {
    constructor(game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        this.setup()
    }
    static new(game, x, y, text) {
        return new this(game, x, y)
    }
    setup() {
        this.numberOfParticles = 100
        this.particles = []
        this.duration = 10
    }
    draw() {
        if (this.duration < 0) {
            return
        }
        for(var p of this.particles) {
            p.draw()
        }
    }
    update() {
        this.duration--
        // 添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            var vx = randomBetween(-5, 5)
            var vy = randomBetween(-5, 5)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有小火花
        for (var p of this.particles) {
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, 'hello')
        this.addElement(label)
        var ps = GuaParticleSystem.new(game, 100, 200)
        this.addElement(ps)
    }
    draw() {
        super.draw()
        // this.game.context.fillText('按K开始游戏', 100, 100);
    }
}