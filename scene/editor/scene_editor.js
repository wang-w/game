class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)
        // game.registerAction('r', function () {
        //     var s = SceneTitle.new(game)
        //     game.replaceScene(s)
        // })
        game.canvas.addEventListener('click', function (event) {
            // var x = event.offsetX
            // var y = event.offsetY
            // if (ball.hasPiont(x, y)) {
            //     enableDrag = true
            // }
            log(event)
        })
    }

    draw() {
        this.game.context.fillText('编辑关卡', 100, 290);
        var ctx = this.game.context
        // ctx.fillRect(25, 25, 100, 100);
        // ctx.clearRect(45, 45, 60, 60);
        // ctx.strokeRect(50, 50, 50, 50);
        for (var i=0;i<6;i++){
            for (var j=0;j<6;j++){
                // ctx.fillStyle = 'rgb(' + Math.floor(255-42.5*i) + ',' +
                //     Math.floor(255-42.5*j) + ',0)';
                ctx.strokeRect(j*25,i*25,25,25);
            }
        }
    }
}