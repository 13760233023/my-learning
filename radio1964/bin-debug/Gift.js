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
var Gift = (function (_super) {
    __extends(Gift, _super);
    function Gift(_type) {
        var _this = _super.call(this) || this;
        _this.giftType = _type;
        _this.createView();
        _this.giftImg.touchEnabled = true;
        _this.giftImg.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.choose, _this);
        return _this;
    }
    Gift.prototype.createView = function () {
        this.hadChoose = false;
        switch (this.giftType) {
            case 1:
                this.giftImg = this.createBitmapByName("gift1_png");
                this.giftName = "猫王收音机OTR 纯真白";
                break;
            case 2:
                this.giftImg = this.createBitmapByName("gift2_png");
                this.giftName = "猫王收音机OTR 嬉皮红";
                break;
            case 3:
                this.giftImg = this.createBitmapByName("gift3_png");
                this.giftName = "猫王收音机OTR 复古绿";
                break;
            default:
                this.giftImg = this.createBitmapByName("gift1_png");
                this.giftName = "猫王收音机OTR 纯真白";
        }
        this.addChild(this.giftImg);
        this.giftImg.rotation = 10;
    };
    Gift.prototype.play = function () {
        this.giftImg.anchorOffsetX = this.giftImg.x + this.giftImg.width / 2;
        this.giftTw = egret.Tween.get(this.giftImg);
        this.giftTw.to({ y: this.giftImg.y + 30 }, 1000);
        this.giftTw = egret.Tween.get(this.giftImg, { loop: true });
        this.giftTw.to({ x: this.giftImg.x + 10, rotation: -10 }, Math.random() * 200 + 400).wait(100)
            .to({ x: this.giftImg.x, rotation: 10 }, Math.random() * 200 + 400).wait(100);
    };
    Gift.prototype.choose = function () {
        this.hadChoose = true;
        console.log("choose" + this.giftType);
        this.giftTw.pause();
        this.giftTw = egret.Tween.get(this.giftImg);
        this.giftTw.to({ alpha: 0 }, 600).set({ alpha: 0, visible: false });
        // 通知盒子
        var giftEvent = new ChooseGiftEvent(ChooseGiftEvent.EventType);
        giftEvent.giftType = this.giftType;
        this.dispatchEvent(giftEvent);
    };
    /**
     * 关闭选框 归还礼物
     */
    Gift.prototype.giveback = function () {
        if (this.hadChoose) {
            this.hadChoose = false;
            this.giftImg.visible = true;
            this.giftImg.alpha = 0;
            this.giftTw = egret.Tween.get(this.giftImg);
            this.giftTw.to({ alpha: 1 }, 600).set({ alpha: 1, visible: true });
            this.giftTw = egret.Tween.get(this.giftImg, { loop: true });
            this.giftTw.to({ x: this.giftImg.x + 10, rotation: -10 }, 500).wait(100)
                .to({ x: this.giftImg.x, rotation: 10 }, 500).wait(100);
        }
    };
    /**
     * 获得礼物名称
     */
    Gift.getGiftName = function (type) {
        switch (type) {
            case 1:
                return "猫王收音机OTR 纯真白";
            case 2:
                return "猫王收音机OTR 嬉皮红";
            case 3:
                return "猫王收音机OTR 复古绿";
            default:
                return "猫王收音机OTR 纯真白";
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Gift.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Gift;
}(egret.Sprite));
__reflect(Gift.prototype, "Gift");
//# sourceMappingURL=Gift.js.map