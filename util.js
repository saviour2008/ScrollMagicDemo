export default class Util {
    constructor(){
    }
    // 値のマッピング
    // -----------------------------------
    // num     : マッピングする値
    // toMin   : 変換後の最小値
    // toMax   : 変換後の最大値
    // fromMin : 変換前の最小値
    // fromMax : 変換前の最大値
    // -----------------------------------
    map (num, toMin, toMax, fromMin, fromMax){
        if(num <= fromMin) {
            return toMin;
        }
        if(num >= fromMax){
            return toMax;
        }

        let p = (toMax - toMin) / (fromMax - fromMin);
        return ((num - fromMin) * p) + toMin;
    }
    // 範囲を指定して乱数取得
    // -----------------------------------
    // max   : 最大値
    // min   : 最小値
    // -----------------------------------
    rand (max,min){
        return Math.floor( Math.random() * (max + 1 - min) ) + min;
    }
}