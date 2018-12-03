export default class Param {
    constructor(){

        this.breakpoint = 750;
        this.displayType = ( window.innerWidth>this.breakpoint)?"pc":"sp";


        this.webgl = {
            ball : {
                splashTime : 120, /* スプラッシュ表示時間 1s = 60 */
                num : {
                    splash : 30, /* 初回表示時 */
                    normal : 16 /* 表示後にループさせているとき */
                }
            }
        }

        this.status = {

        }

        this.instagram = {
            src : "https://www.eventstudio.jp/getInstagram.php"
        }

    }
}
