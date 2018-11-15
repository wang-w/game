var config = {
    player_speed: 10,
    cloud_speed: 1,
    enemy_speed: 5,
    bullet_speed: 8,
    fire_cooldown: 9,
}

class Bullet extends GuaImage {
    constructor(game, type) {
        super(game, 'bullet')
        this.setup()
        this.type = type
    }
    setup() {
        this.speed = 5
        this.name = 'bullet'
        this.lifes = 1
        this.alive = true
    }
    update() {
        this.speed = config.bullet_speed
        if (this.type === 'player') {
            this.y -= this.speed
        } else if (this.type === 'enemy'){
            this.y += this.speed
        }
    }

    kill() {
        this.lifes--
        if (this.lifes < 1) {
            this.alive = false
        }
    }
}

class Player extends GuaImage{
    constructor(game) {
        super(game, 'player')
        this.game = game
        this.setup()
    }

    setup() {
        this.speed = 10
        this.cooldown = 0
        this.bullets = []
        this.lifes = 1
        this.name = 'player'
        this.alive = true
    }

    update() {
        if (!this.alive) {
            return
        }
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }
        for (var i = 0; i < this.bullets.length; i++) {
            var b = this.bullets[i]
            if (b.y < 0) {
                this.bullets.splice(i, 1)
            }
        }
    }

    moveLeft() {
        this.x -= this.speed
    }

    moveRight() {
        this.x += this.speed
    }

    moveUp() {
        this.y -= this.speed
    }

    moveDown() {
        this.y += this.speed
    }

    kill() {
        this.lifes--
        if (this.lifes < 1) {
            this.alive = false
        }
    }
    
    fire() {
        // var bullets = []
        if (this.cooldown == 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game, 'player')
            b.x = x
            b.y = y
            this.scene.addElement(b)
            this.bullets.push(b)
        }
    }
}

class Enemy extends GuaImage{
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }

    setup() {
        this.name = 'enemy'
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 400)
        this.y = -randomBetween(200, 400)
        this.lifes = 1
        this.alive = true
        this.bullets = []
        this.cooldown = 0
    }

    update() {
        this.y += this.speed
        if (this.y > 852) {
            this.setup()
        }
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }

    kill() {
        this.lifes--
        if (this.lifes < 1) {
            this.alive = false
        }
    }

    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y + this.h
            var b = Bullet.new(this.game, 'enemy')
            b.x = x
            b.y = y
            this.scene.addElement(b)
            this.bullets.push(b)
        }
    }
}

class Cloud extends GuaImage{
    constructor(game) {
        super(game, 'cloud')
        this.setup()
    }

    setup() {
        this.speed = 1
        this.x = randomBetween(0, 400)
        this.y = -randomBetween(200, 400)
    }

    update() {
        this.y += this.speed
        if (this.y > 852) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.cloud_speed
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    setup() {
        this.numberOfEnemies = 5
        this.bg = GuaImage.new(this.game, 'sky')
        this.cloud = Cloud.new(this.game, 'cloud')
        this.player = Player.new(this.game)
        this.player.x = 100
        this.player.y = 720
        // this.game.registerAction('f', function () {
        //     ball.fire()
        // })
        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        //
        this.addEnemies()
        // add particles
        var ps = GuaParticleSystem.new(this.game)
        this.addElement(ps)
    }

    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    setupInputs() {
        var g = this.game
        // var s = this
        g.registerAction('a', () => {
            this.player.moveLeft()
        })
        g.registerAction('d', () => {
            this.player.moveRight()
        })
        g.registerAction('w', () => {
            this.player.moveUp()
        })
        g.registerAction('s', () => {
            this.player.moveDown()
        })
        g.registerAction('j', () => {
            this.player.fire()
        })
    }

    update() {
        super.update()
        this.cloud.y += 1
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i]
            e.fire()

            for (var k = 0; k < e.bullets.length; k++) {
                var bullet_1 = e.bullets[k]
                // 玩家和敌人子弹相撞
                if (rectIntersect(this.player, bullet_1) && this.player.alive) {
                    var ps = GuaParticleSystem.new(this.game, this.player.x + this.player.w / 2, this.player.y)
                    this.addElement(ps)
                    log('feiji', this)
                    e.bullets.splice(k, 1)
                    e.kill()
                    this.player.kill()
                }
                for (var l = 0; l < this.player.bullets.length; l++) {
                    var bullet_2 = this.player.bullets[l]
                    // 玩家子彈和敌人子彈相撞
                    if (rectIntersect(bullet_1, bullet_2)) {
                        var ps = GuaParticleSystem.new(this.game, bullet_2.x, bullet_2.y)
                        this.addElement(ps)
                        bullet_1.kill()
                        bullet_2.kill()
                        e.bullets.splice(k, 1)
                        this.player.bullets.splice(l, 1)
                    }
                }
            }
            // 玩家飞机和敌人飞机相撞
            if (rectIntersect(this.player, e) && this.player.alive) {
                var ps = GuaParticleSystem.new(this.game, this.player.x + this.player.w / 2, this.player.y)
                this.addElement(ps)
                log('feiji', this)
                this.enemies.splice(i, 1)
                e.kill()
                this.player.kill()
            }
            for (var j = 0; j < this.player.bullets.length; j++) {
                var b = this.player.bullets[j]
                // 玩家子弹和敌人飞机相撞
                if (rectIntersect(b, e)) {
                    this.enemies.splice(i, 1)
                    e.kill()
                    b.kill()
                    this.player.bullets.splice(j, 1)
                    var ps = GuaParticleSystem.new(this.game, b.x, b.y)
                    this.addElement(ps)
                }
            }
        }
        if (this.enemies.length < 1) {
            this.addEnemies()
        }
    }
}