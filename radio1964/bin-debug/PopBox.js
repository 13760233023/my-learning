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
var PopBox = (function (_super) {
    __extends(PopBox, _super);
    function PopBox(width, height) {
        var _this = _super.call(this) || this;
        _this.bg = new egret.Shape();
        _this.addChild(_this.bg);
        _this.bg.width = width;
        _this.bg.height = height;
        _this.bg.x = 0;
        _this.bg.y = 0;
        _this.bg.graphics.beginFill(0xe3dabd, 0);
        _this.bg.graphics.drawRect(0, 0, _this.bg.width, _this.bg.height);
        _this.bg.graphics.endFill();
        _this.bg.touchEnabled = true;
        _this.bg.alpha = 0;
        _this.bg.visible = false;
        _this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.closeAnim, _this);
        _this.popBg = _this.createBitmapByName("popbox_png");
        _this.addChild(_this.popBg);
        _this.popBg.x = (width - _this.popBg.width) / 2;
        _this.popBg.y = (height - _this.popBg.height) / 2;
        _this.popBg.touchEnabled = true;
        _this.popBg.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.gotoUrl, _this);
        _this.popBg.alpha = 0;
        _this.popBg.visible = false;
        return _this;
        // this.boxBg = new egret.Shape();
        // this.addChild(this.boxBg);
        // this.boxBg.width = width*0.8;
        // this.boxBg.height = 200;
        // this.boxBg.x = width*0.1;
        // this.boxBg.y = (this.bg.height-this.boxBg.height)/2; 
        // this.boxBg.graphics.lineStyle( 10, 0x9b3230 );
        // this.boxBg.graphics.beginFill( 0xe3dabd, 1);
        // this.boxBg.graphics.drawRect( 0, 0, this.boxBg.width, this.boxBg.height );
        // this.boxBg.graphics.endFill();
        // this.boxBg.touchEnabled = true;
        // this.boxBg.alpha = 0;
        // this.boxBg.visible = false;
        // this.boxBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUrl, this);
        // this.label = new egret.TextField();
        // this.label.text = "圣诞老人在遥远的芬兰，\n赶快邀请好友帮你传递心愿，\n就有机会获得猫王的圣诞礼物哦。";
        // this.label.textAlign = "center";
        // this.label.size = 36;
        // this.label.textColor = 0x9b3230;
        // this.addChild( this.label );
        // this.label.lineSpacing = 18;
        // // this.label.width = width-40;
        // this.label.x = (width-this.label.width)/2;
        // this.label.y = (height-this.label.height)/2;
        // this.label.alpha = 0;
        // this.label.visible = false;
        // this.btn = this.createBitmapByName("close_btn_png");
        // this.addChild(this.btn);
        // this.btn.x = (width-this.btn.width)/2;
        // this.btn.y = -this.btn.height;
        // this.btn.touchEnabled = true;
        // this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeAnim, this);
        // this.startBtn = this.createBitmapByName("close_btn_png");
        // this.addChild(this.startBtn);
        // this.startBtn.x = (width-this.startBtn.width)/2;
        // this.startBtn.y = -this.startBtn.height;
        // this.startBtn.touchEnabled = true;
        // this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUrl, this);
    }
    PopBox.prototype.openAnim = function () {
        this.bg.visible = true;
        this.popBg.visible = true;
        this.bgTw = egret.Tween.get(this.bg);
        this.bgTw.to({ alpha: 1 }, 300).set({ alpha: 1 });
        this.popBgTw = egret.Tween.get(this.popBg);
        this.popBgTw.to({ alpha: 1 }, 500).set({ alpha: 1 });
        // this.boxBg.visible = true;
        // this.label.visible = true;
        // this.boxTw = egret.Tween.get( this.boxBg );
        // this.boxTw.to( {alpha:1}, 300 ).set({alpha:1});
        // this.labelTw = egret.Tween.get( this.label );
        // this.labelTw.to( {y:(this.bg.height-this.label.height)/2,alpha:1}, 300 ).set({alpha:1});
        // this.btnTw = egret.Tween.get( this.btn );
        // this.btnTw.to( {y:this.bg.height-this.btn.height/2}, 300 );
        // this.startBtnTw = egret.Tween.get( this.startBtn );
        // this.startBtnTw.to( {y:this.bg.height-this.startBtn.height-30}, 300 );
    };
    PopBox.prototype.closeAnim = function () {
        this.bgTw = egret.Tween.get(this.bg);
        this.bgTw.to({ alpha: 0, visible: false }, 300);
        this.popBgTw = egret.Tween.get(this.popBg);
        this.popBgTw.to({ alpha: 0, visible: false }, 300).set({ alpha: 1 });
        // this.labelTw = egret.Tween.get( this.label );
        // this.labelTw.to( {alpha:0,visible:false}, 300 );
        // this.boxTw = egret.Tween.get( this.boxBg );
        // this.boxTw.to( {alpha:0,visible:false}, 300 );
        var giftEvent = new ChooseGiftEvent(ChooseGiftEvent.EventType);
        giftEvent.giftType = this.giftType;
        this.dispatchEvent(giftEvent);
        // this.btnTw = egret.Tween.get( this.btn );
        // this.btnTw.to( {y:-this.btn.height}, 300 );
        // this.startBtnTw = egret.Tween.get( this.startBtn );
        // this.startBtnTw.to( {y: -this.startBtn.height}, 300 );
    };
    PopBox.prototype.gotoUrl = function () {
        // this.closeAnim();
        // TODO:正式部署开放
        openUrl(this.giftType);
    };
    PopBox.prototype.openListener = function (evt) {
        this.giftType = evt.giftType;
        this.openAnim();
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    PopBox.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return PopBox;
}(egret.Sprite));
__reflect(PopBox.prototype, "PopBox");
//# sourceMappingURL=PopBox.js.map