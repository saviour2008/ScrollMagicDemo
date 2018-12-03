function Param() {
    this.breakpoint = 750;
    this.displayType = (window.innerWidth > this.breakpoint) ? "pc" : "sp";


    this.webgl = {
        ball: {
            splashTime: 120, /* スプラッシュ表示時間 1s = 60 */
            num: {
                splash: 30, /* 初回表示時 */
                normal: 16 /* 表示後にループさせているとき */
            }
        }
    }

    this.status = {

    }
};

function EffectManager() {
    this.$svgTarget = $(".js__tsc-svg-write,.js__svg-write");

    this.conf = {
        // rotRadius : 20,
        // scrollInc : 0.27,
        // transY : 0.07,
        // transX : 0.35,
        // startPosiX : 0,
        // transZ : 1,
        // transRot:-0.45,
        // opacity : 80,

        rotRadius: 20,
        scrollInc: 0.5,
        transY: 1,
        transX: (window.innerWidth <= 320) ? 0.4 : 0.5,
        startPosiX: 0,
        transZ: 1,
        transRot: -0.22,
        opacity: 80,


    }
}
EffectManager.prototype.show = function ($target, type) {

    if (type === "set") {

        TweenMax.set($target, {
            x: -100,
            z: -1,
            opacity: 0,
            // scale:0.8
        });

    } else if (type === "out") {
        TweenMax.staggerTo($target, 0.6, {
            x: -100,
            z: -1,
            opacity: 0,
            ease: Back.easeIn.config(2),
        }, 0.05);
    } else {

        TweenMax.staggerTo($target, 0.9, {
            x: 0,
            z: 0,
            opacity: 1,
            // scale:1,
            ease: Back.easeOut.config(2),
        }, 0.1);

    }

}
EffectManager.prototype.scale = function ($target, type) {

    if (type === "set") {

        TweenMax.set($target, {
            opacity: 0,
            scale: 0
        });
    } else if (type === "out") {

        TweenMax.staggerTo($target, 0.6, {
            opacity: 0,
            scale: 0,
            ease: Power2.easeIn,
        }, 0.1);

    } else {

        TweenMax.staggerTo($target, 0.6, {
            opacity: 1,
            scale: 1,
            ease: Power2.easeOut,
        }, 0.1);

    }

}
EffectManager.prototype.float = function ($target, type) {

    if (type === "set") {

        TweenMax.set($target, {
            x: -20,
            y: -30,
            opacity: 0,
            // rotationX:30,
            // rotationY:90,
            scale: 0
        });

    } else {

        TweenMax.staggerTo($target, 0.8, {
            x: 0,
            y: 0,
            opacity: 1,
            // rotationX:0,
            // rotationY:0,
            scale: 1,
            ease: Power2.easeOut,
        }, 0.05);

    }

}
EffectManager.prototype.svgInit = function () {
    TweenLite.set(this.$svgTarget.find(".js__write"), { drawSVG: "0%" });
}
EffectManager.prototype.svgAnimation = function ($target, delayTime) {

    TweenMax.staggerTo($target.find(".js__write"), 0.3, {
        drawSVG: "100%",
        ease: Power2.easeOut,
        delay: delayTime
    }, .05);
}
EffectManager.prototype.svgAnimationOut = function ($target, delayTime) {

    TweenMax.staggerTo($target.find(".js__write"), 0.3, {
        drawSVG: "0%",
        ease: Power2.easeIn,
        delay: delayTime
    }, .05);
}

EffectManager.prototype.splitText = function ($target, type) {

    if ($target.length == 0) {
        console.log('element not exist');
        return;
    }

    if (type === "set") {
        let text = new SplitText($target, { type: "words,chars" }),
            chars = text.chars;
        TweenMax.set(chars, { opacity: 0, x: 150 });
    } else if (type === "out") {
        TweenMax.staggerTo($target, 0.6,
            {
                opacity: 0, x: 150,
                // filter:"blur(0px)",
                ease: "Power2.easeIn",
            },
            0.01
        );
    } else {
        TweenMax.staggerTo($target, 0.8,
            {
                opacity: 1, x: 0,
                // filter:"blur(0px)",
                ease: "Power2.easeOut",
            },
            0.05
        );
    }

}

function Util() {}
Util.prototype.map = function(num, toMin, toMax, fromMin, fromMax) {
    if (num <= fromMin) {
        return toMin;
    }
    if (num >= fromMax) {
        return toMax;
    }

    let p = (toMax - toMin) / (fromMax - fromMin);
    return ((num - fromMin) * p) + toMin;
}
Util.prototype.rand = function(max, min) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}


const param = new Param();
const effect = new EffectManager();
const util = new Util();

export default class webglManager {
    constructor() {


        this.w = window.innerWidth;
        this.h = window.innerHeight;

        this.mouse;


        this.stage;
        this.renderer;
        this.container;
        this.ball = [];

        this.conf = {
            splash: {
                time: param.webgl.ball.splashTime,
                flg: false
            },
            ball: {
                NUM: param.webgl.ball.num.splash,
                color: ["0xff9d88", "0x38c0fc", "0xcdd6d5"],
                size: [60, 45, 40, 30, 20, 10],
                scaleSize: 1, /* ボールのサイズが可変する動作スピード */
                scaleSpeed: 6, /* ボールのサイズが可変する動作スピード */
                speed: 1,/* ボールの流れるスピード */
                float: [80, 60, 40], /* ボールがゆれるスピード */
                floatSpan: 1, /* ボールの揺れ幅 */
                mode: "splash",
                mouse: [60, 40, 30, 20, 10],
            }
        }

        this.count = [];


        /* ftps低下時の対策 */
        this.time = 0;
        this.timeRatio = 1;
        this.FPS_60_SEC = 1000 / 60;

        this.timer = 0;


    }
    init() {


        this.stage = new PIXI.Stage(0xffffff);
        this.renderer = new PIXI.autoDetectRenderer(this.w, this.h, {
            transparent: true,
            backgroundColor: 0xffffff,
            antialias: true,
            // resolution : 1, /* 解像度 */
        });

        this.container = new PIXI.Container();
        // this.renderer.renderer.autoResize = true;

        document.getElementById('l-ball').appendChild(this.renderer.view);

        for (let i = 0; this.conf.ball.NUM > i; i++) {
            this.count[i] = 0;


            // let _d = i/this.conf.ball.NUM;
            // let _y = {
            //     start : this.h*(1.5 + (1 *_d)),
            //     end : this.h*(4 + (2 * _d))
            // }

            this.ball[i] = {
                shape: new PIXI.Graphics(),
                size: this.conf.ball.size[util.rand(-1, 7)],
                mouse: this.conf.ball.mouse[util.rand(-1, 5)],
                color: this.conf.ball.color[util.rand(-1, 3)],
                start: {
                    // x : util.rand(0,this.w),
                    // y : util.rand(_y.start,_y.end),
                    x: 0,
                    y: 0
                },
                speed: util.rand(200, 400),
                float: this.conf.ball.float[util.rand(-1, 3)],
            }
        }

        // this.datGUI();


    }

    updateTimeRatio() {
        let _lastTime = this.time;
        if (_lastTime > 0) {
            let _dTime = new Date().getTime() - _lastTime;
            this.timeRatio = _dTime / this.FPS_60_SEC;
        }
        this.time = new Date().getTime();
    }
    render(mouse) {

        // this.updateTimeRatio();


        this.timer++;

        /* fpsが下がったらアンチエリアスを外す */
        if (this.timeRatio !== 1) {
            this.renderer.antialias = false;
        } else {
            this.renderer.antialias = true;
        }


        if (this.timer == this.conf.splash.time && !this.conf.splash.flg) {
            this.conf.splash.flg = true;
            let _this = this;
            TweenMax.to(this.stage.children[0], 0.6, {
                alpha: 0, ease: Power2.easeIn, onComplete: function () {
                    _this.conf.ball.mode = "normal";
                    _this.conf.ball.NUM = param.webgl.ball.num.normal;
                    _this.container.removeChildren();
                    TweenMax.set(_this.stage.children[0], { alpha: 1 });
                    _this.stage.removeChildren();
                }
            });
        }

        for (let i = 0; this.conf.ball.NUM > i; i++) {
            this.count[i] += 0.01;

            let _speed = (this.conf.ball.mode === "splash") ? this.ball[i].speed * 10 * this.conf.ball.speed : this.ball[i].speed * this.conf.ball.speed;


            this.ball[i].shape.clear();
            this.ball[i].shape.lineStyle(0);
            this.ball[i].shape.beginFill(this.ball[i].color, 1.0);
            this.ball[i].shape.drawCircle(
                this.ball[i].start.x - (Math.sin(this.count[i]) * this.ball[i].float + (mouse.x / (700 / this.ball[i].size))) * this.conf.ball.floatSpan,
                this.ball[i].start.y - this.count[i] * _speed + (mouse.y / (1000 / this.ball[i].size)),
                this.ball[i].size - Math.sin(this.count[i] * this.conf.ball.scaleSpeed) * this.conf.ball.scaleSize - ((mouse.x + mouse.y) / 200)
            );

            // if(i===1) console.log(i, this.ball[i].shape.graphicsData[0].shape.y);
            // this.ball[i].shape.drawCircle(470 - Math.sin(this.count)*40,this.h - this.count*100,60);

            this.ball[i].shape.endFill();
            this.container.addChild(this.ball[i].shape);
            this.stage.addChild(this.container);


            // if(this.conf.ball.NUM-1==i){
            // console.log(-this.h,this.ball[i].shape.graphicsData[0]);
            // }
            if (-this.h > this.ball[i].shape.graphicsData[0].shape.y) {
                this.count[i] = 0;
            }

        }

        this.renderer.render(this.stage);

    }
    resize() {
        this.w = window.innerWidth;
        this.h = window.innerHeight;

        if (this.ball[0]) {
            for (let i = 0; this.conf.ball.NUM > i; i++) {
                let _d = i / this.conf.ball.NUM;
                let _y = {
                    start: this.h * (1.01 + (1 * _d)),
                    end: this.h * (2 + (2 * _d))
                }
                this.ball[i].start.x = util.rand(0, this.w);
                this.ball[i].start.y = util.rand(_y.start, _y.end);
            }
        }

        this.renderer.resize(this.w, this.h);
    }

    /* -------------------------------------------

      -- ステータスいじいじするやつ

    ------------------------------------------- */

    datGUI() {
        let _gui = new dat.gui.GUI();

        _gui.remember(effect);
        // //

        var _f1 = _gui.addFolder('BALL');
        // _f1.add(this.conf.ball, 'NUM', 0.0, 30.0);
        _f1.add(this.conf.ball, 'speed', 1.00, 3.00);
        _f1.add(this.conf.ball, 'scaleSize', 0.0, 10.0);
        _f1.add(this.conf.ball, 'scaleSpeed', 0.0, 20.0);
        _f1.add(this.conf.ball, 'floatSpan', 1.0, 20.0);

        // let _floatSpeed = _f1.add(this.conf.ball, 'float', 0, 1000);
        // // _f1.add(effect.product, 'transZ', 0.00, 2.00);
        // _f1.add(effect.product, 'transRot', -2.00, 2.00);
        //
        //
        //
        // startPosiX.onChange(function(value) {
        //
        //     TweenMax.set($("#p-product-list"),{x:value});
        //
        // });

        // _f1.add(effect.product, 'opacity', 0, 300);

    }
}