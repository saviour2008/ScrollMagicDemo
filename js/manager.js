import Param from './param';
import effectManager from './effect';
import Util from './util';


const param = new Param();
const effect = new effectManager();
const util = new Util();

export default class webglManager{
    constructor(){


        this.w = window.innerWidth;
        this.h = window.innerHeight;

        this.mouse;


        this.stage;
        this.renderer;
        this.container;
        this.ball = [];

        this.conf = {
            splash:{
                time : param.webgl.ball.splashTime,
                flg : false
            },
            ball : {
                NUM   : param.webgl.ball.num.splash,
                color : ["0xff9d88","0x38c0fc","0xcdd6d5"],
                size  : [60,45,40,30,20,10],
                scaleSize : 1, /* ボールのサイズが可変する動作スピード */
                scaleSpeed : 6, /* ボールのサイズが可変する動作スピード */
                speed : 1,/* ボールの流れるスピード */
                float  : [80,60,40], /* ボールがゆれるスピード */
                floatSpan : 1, /* ボールの揺れ幅 */
                mode  : "splash",
                mouse  : [60,40,30,20,10],
            }
        }

        this.count = [];


        /* ftps低下時の対策 */
        this.time = 0;
        this.timeRatio = 1;
        this.FPS_60_SEC = 1000 / 60;

        this.timer = 0;


    }
    init(){


        this.stage = new PIXI.Stage(0xffffff);
        this.renderer = new PIXI.autoDetectRenderer(this.w, this.h, {
            transparent: true,
            backgroundColor : 0xffffff,
            antialias : true,
            // resolution : 1, /* 解像度 */
        });

        this.container = new PIXI.Container();
        // this.renderer.renderer.autoResize = true;

        document.getElementById('l-ball').appendChild(this.renderer.view);

        for(let i=0; this.conf.ball.NUM>i; i++){
            this.count[i] = 0;


            // let _d = i/this.conf.ball.NUM;
            // let _y = {
            //     start : this.h*(1.5 + (1 *_d)),
            //     end : this.h*(4 + (2 * _d))
            // }

            this.ball[i] = {
                shape  : new PIXI.Graphics(),
                size   : this.conf.ball.size[util.rand(-1,7)],
                mouse   : this.conf.ball.mouse[util.rand(-1,5)],
                color  : this.conf.ball.color[util.rand(-1,3)],
                start  : {
                    // x : util.rand(0,this.w),
                    // y : util.rand(_y.start,_y.end),
                    x : 0,
                    y : 0
                },
                speed  : util.rand(200,400),
                float  : this.conf.ball.float[util.rand(-1,3)],
            }
        }

        // this.datGUI();


    }

    updateTimeRatio() {
        let _lastTime = this.time;
        if(_lastTime > 0) {
            let _dTime = new Date().getTime() - _lastTime;
            this.timeRatio = _dTime / this.FPS_60_SEC;
        }
        this.time = new Date().getTime();
    }
    render(mouse) {

        // this.updateTimeRatio();


        this.timer++;

        /* fpsが下がったらアンチエリアスを外す */
        if(this.timeRatio!==1){
            this.renderer.antialias = false;
        }else{
            this.renderer.antialias = true;
        }


        if(this.timer==this.conf.splash.time&&!this.conf.splash.flg) {
            this.conf.splash.flg = true;
            let _this = this;
            TweenMax.to(this.stage.children[0],0.6,{alpha:0,ease:Power2.easeIn,onComplete:function () {
                    _this.conf.ball.mode = "normal";
                    _this.conf.ball.NUM = param.webgl.ball.num.normal;
                    _this.container.removeChildren();
                    TweenMax.set(_this.stage.children[0],{ alpha:1 });
                    _this.stage.removeChildren();
                }});
        }

        for(let i=0; this.conf.ball.NUM>i; i++){
            this.count[i] += 0.01;

            let _speed =  (this.conf.ball.mode==="splash")?this.ball[i].speed*10*this.conf.ball.speed:this.ball[i].speed*this.conf.ball.speed;


            this.ball[i].shape.clear();
            this.ball[i].shape.lineStyle(0);
            this.ball[i].shape.beginFill(this.ball[i].color, 1.0);
            this.ball[i].shape.drawCircle(
                this.ball[i].start.x -( Math.sin(this.count[i])*this.ball[i].float + (mouse.x/(700/this.ball[i].size)) )*this.conf.ball.floatSpan,
                this.ball[i].start.y - this.count[i] * _speed + (mouse.y/(1000/this.ball[i].size)),
                this.ball[i].size - Math.sin(this.count[i]*this.conf.ball.scaleSpeed)*this.conf.ball.scaleSize-( (mouse.x+mouse.y)/200 )
            );

            // if(i===1) console.log(i, this.ball[i].shape.graphicsData[0].shape.y);
            // this.ball[i].shape.drawCircle(470 - Math.sin(this.count)*40,this.h - this.count*100,60);

            this.ball[i].shape.endFill();
            this.container.addChild(this.ball[i].shape);
            this.stage.addChild(this.container);


            // if(this.conf.ball.NUM-1==i){
            // console.log(-this.h,this.ball[i].shape.graphicsData[0]);
            // }
            if(-this.h > this.ball[i].shape.graphicsData[0].shape.y){
                this.count[i] = 0;
            }

        }

        this.renderer.render(this.stage);

    }
    resize(){
        this.w = window.innerWidth;
        this.h = window.innerHeight;

        if(this.ball[0]){
            for(let i=0; this.conf.ball.NUM>i; i++){
                let _d = i/this.conf.ball.NUM;
                let _y = {
                    start : this.h*(1.01 + (1 *_d)),
                    end : this.h*(2 + (2 * _d))
                }
                this.ball[i].start.x = util.rand(0,this.w);
                this.ball[i].start.y = util.rand(_y.start,_y.end);
            }
        }

        this.renderer.resize(this.w,this.h);
    }

    /* -------------------------------------------

      -- ステータスいじいじするやつ

    ------------------------------------------- */

    datGUI(){
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