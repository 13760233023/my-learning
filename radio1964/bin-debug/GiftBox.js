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
var GiftBox = (function (_super) {
    __extends(GiftBox, _super);
    function GiftBox(stageW, stageH, boxX, boxY) {
        var _this = _super.call(this) || this;
        _this.stageW = stageW;
        _this.stageH = stageH;
        _this.boxX = boxX;
        _this.boxY = boxY;
        _this.createView();
        return _this;
    }
    GiftBox.prototype.createView = function () {
        this.giftBoxImg = this.createBitmapByName("gift_box_png");
        this.addChild(this.giftBoxImg);
        this.giftBoxImg.x = this.boxX - this.giftBoxImg.width * 0.08;
        this.giftBoxImg.y = this.boxY - this.giftBoxImg.height * 0.70;
        this.textTip = new egret.TextField();
        this.textTip.text = "挑选礼物放入礼盒";
        this.textTip.textColor = 0x951e27;
        this.textTip.size = 40;
        this.textTip.lineSpacing = 20;
        this.addChild(this.textTip);
        this.textTip.x = (this.stageW - this.textTip.width) / 2;
        this.textTip.y = this.boxY + (this.stageH - this.boxY - this.textTip.height) / 2;
    };
    /**
     * 播放动画
     */
    GiftBox.prototype.play = function () {
        this.giftBoxTw = egret.Tween.get(this.giftBoxImg);
        this.giftBoxTw.to({ y: this.giftBoxImg.y + 30 }, 1000);
        this.giftBoxTw = egret.Tween.get(this.textTip);
        this.giftBoxTw.to({ y: this.textTip.y + 30 }, 1000);
    };
    GiftBox.prototype.chooseListener = function (evt) {
        this.textTip.text = Gift.getGiftName(evt.giftType) + "\n已装入礼物盒";
        this.textTip.x = (this.stageW - this.textTip.width) / 2;
        this.textTip.y = this.giftBoxImg.y + this.giftBoxImg.height + 20;
        this.textTip.textAlign = "center";
        this.giftBoxTw = egret.Tween.get(this.giftBoxImg);
        this.giftBoxTw.to({ alpha: 1 }, 200).wait(100)
            .to({
            x: this.giftBoxImg.x - 10,
            y: this.giftBoxImg.y - 10,
            width: this.giftBoxImg.width + 20,
            height: this.giftBoxImg.height + 20
        }, 200).wait(200)
            .to({
            x: this.giftBoxImg.x,
            y: this.giftBoxImg.y,
            width: this.giftBoxImg.width,
            height: this.giftBoxImg.height
        }, 200).wait(100);
        var giftEvent = new ChooseGiftEvent(ChooseGiftEvent.EventType);
        giftEvent.giftType = evt.giftType;
        this.dispatchEvent(giftEvent);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    GiftBox.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return GiftBox;
}(egret.Sprite));
__reflect(GiftBox.prototype, "GiftBox");
//# sourceMappingURL=GiftBox.js.map