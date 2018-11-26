var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Snow = (function (_super) {
    __extends(Snow, _super);
    function Snow(num, screenW, screenH) {
        var _this = _super.call(this) || this;
        _this.num = num;
        _this.screenW = screenW;
        _this.screenH = screenH;
        _this.snowPoint = new Array();
        _this.vX = new Array();
        _this.vY = new Array();
        _this.size = new Array();
        _this.windDirection = new Array();
        for (var i = 0; i < _this.num; i++) {
            _this.size[i] = 0.4 + Math.random() * 2;
            _this.snowPoint[i] = _this.createBitmapByName("snow_png");
            _this.addChild(_this.snowPoint[i]);
            _this.snowPoint[i].x = Math.random() * _this.screenW + 1;
            _this.snowPoint[i].y = Math.random() * _this.screenH;
            _this.snowPoint[i].scaleX *= _this.size[i];
            _this.snowPoint[i].scaleY *= _this.size[i];
            // this.snowPoint[i].graphics.beginFill(0xffffff);
            // this.snowPoint[i].graphics.drawCircle(0, 0, 5);
            // this.snowPoint[i].graphics.endFill();
            _this.vX[i] = 1 + Math.floor(Math.random() * 1);
            _this.vY[i] = 2 + Math.floor(Math.random() * 5);
            _this.windDirection[i] = ((Math.random() * 2) == 0 ? -1 : 1);
        }
        return _this;
    }
    Snow.prototype.play = function () {
        for (var i = 0; i < this.num; i++) {
            if (this.snowPoint[i].y < this.screenH + 5 && this.snowPoint[i].x < this.screenW + 5) {
                this.snowPoint[i].x += this.vX[i];
                this.snowPoint[i].y += this.vY[i];
            }
            else {
                this.snowPoint[i] = this.createBitmapByName("snow_png");
                this.addChild(this.snowPoint[i]);
                this.snowPoint[i].x = Math.random() * this.screenW + 1;
                this.snowPoint[i].y = -this.snowPoint[i].height;
                this.snowPoint[i].scaleX *= this.size[i];
                this.snowPoint[i].scaleY *= this.size[i];
                // this.snowPoint[i].graphics.beginFill(0xffffff);
                // this.snowPoint[i].graphics.drawCircle(0, 0, 5);
                // this.snowPoint[i].graphics.endFill();
                this.vX[i] = 1 + Math.floor(Math.random() * 1);
                this.vY[i] = 2 + Math.floor(Math.random() * 5);
                this.windDirection[i] = ((Math.random() * 2) == 0 ? -1 : 1);
            }
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Snow.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Snow;
}(egret.Sprite));
__reflect(Snow.prototype, "Snow");
//# sourceMappingURL=Snow.js.map