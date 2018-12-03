import Param from '../param';
const cntEasing = "Circ.easeIn";
const cntSpeed = 2.38;
const cntDelay = 0.1;

let param = new Param();

export default class effectManager {
    constructor(){
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

            rotRadius : 20,
            scrollInc : 0.5,
            transY : 1,
            transX : (window.innerWidth<=320)?0.4:0.5,
            startPosiX : 0,
            transZ : 1,
            transRot:-0.22,
            opacity : 80,


        }


    }
    show($target,type){

        if(type==="set"){

            TweenMax.set($target,{
                x:-100,
                z:-1,
                opacity:0,
                // scale:0.8
            });

        }else if(type==="out"){
            TweenMax.staggerTo($target,0.6, {
                x:-100,
                z:-1,
                opacity:0,
                ease: Back.easeIn.config(2),
            },0.05);
        }else{

            TweenMax.staggerTo($target,0.9, {
                x:0,
                z:0,
                opacity:1,
                // scale:1,
                ease: Back.easeOut.config(2),
            },0.1);

        }

    }
    scale($target,type){

        if(type==="set"){

            TweenMax.set($target,{
                opacity:0,
                scale:0
            });
        }else if(type==="out"){

            TweenMax.staggerTo($target,0.6, {
                opacity:0,
                scale:0,
                ease: Power2.easeIn,
            },0.1);

        }else{

            TweenMax.staggerTo($target,0.6, {
                opacity:1,
                scale:1,
                ease: Power2.easeOut,
            },0.1);

        }

    }
    float($target,type){

        if(type==="set"){

            TweenMax.set($target,{
                x:-20,
                y:-30,
                opacity:0,
                // rotationX:30,
                // rotationY:90,
                scale:0
            });

        }else{

            TweenMax.staggerTo($target,0.8, {
                x:0,
                y:0,
                opacity:1,
                // rotationX:0,
                // rotationY:0,
                scale:1,
                ease: Power2.easeOut,
            },0.05);

        }

    }
    svgInit(){
        TweenLite.set(this.$svgTarget.find(".js__write"), {drawSVG: "0%"});
    }
    svgAnimation($target,delayTime) {

        TweenMax.staggerTo($target.find(".js__write"), 0.3, {
            drawSVG: "100%",
            ease: Power2.easeOut,
            delay : delayTime
        }, .05);
    }
    svgAnimationOut($target,delayTime) {

        TweenMax.staggerTo($target.find(".js__write"), 0.3, {
            drawSVG: "0%",
            ease: Power2.easeIn,
            delay : delayTime
        }, .05);
    }

    splitText($target,type){

        if($target.length == 0){
          console.log('element not exist');
          return;
        }

        if(type === "set"){
            let text = new SplitText($target, {type:"words,chars"}),
                chars = text.chars;
            TweenMax.set(chars,{ opacity:0, x:150});
        }else if(type === "out"){
            TweenMax.staggerTo($target, 0.6,
                {
                    opacity:0,x:150,
                    // filter:"blur(0px)",
                    ease: "Power2.easeIn",
                },
                0.01
            );
        }else{
            TweenMax.staggerTo($target, 0.8,
                {
                    opacity:1,x:0,
                    // filter:"blur(0px)",
                    ease: "Power2.easeOut",
                },
                0.05
            );
        }

    }



}
