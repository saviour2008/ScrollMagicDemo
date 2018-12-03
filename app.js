//import Param from './param';
//import effectManager from './effect';
//import topManager from './page/top';
//import worksManager from './page/works';
//import getInstagram from './module/libs/instagram';
//import notFoundManager from './page/notFound';
//import lowlayerManager from './page/lowlayer';
//import smoothScrollManager from './module/scroll/scrollManager';
//import MouseManager from './module/mouse/mouseManager';
//import globalNavi from './module/global/globalNavi';
import webglManager from './manager.js';
//import GoogleMapManager from './module/libs/googlemap';
//import ModalManager from './module/modal/modalManager';


const webgl = new webglManager();


const stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild( stats.dom );

let pageID = $("body").attr("id");
let executionType = "landing"; /* 実行タイミングの制御用 */

/* ---------------------------------------------------

  -- render

 --------------------------------------------------- */

let render = function () {
    webgl.render(mouse.obj);
}

/* ---------------------------------------------------

  --

 --------------------------------------------------- */

let resize = function () {

    webgl.resize();

}



