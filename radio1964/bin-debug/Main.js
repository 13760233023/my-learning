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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        this.loadingView.width = this.stage.stageWidth;
        this.loadingView.height = this.stage.stageHeight;
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    Main.prototype.bgmPlay = function () {
        console.log("bgmPlay");
        if (this.soundChannel) {
            //调用soundChannel对象的stop方法停止播放音频
            this.soundChannel.stop();
            this.soundChannel = null;
            this.bgmTW.pause();
            return;
        }
        //使用SoundChannel播放音频
        this.soundChannel = this.bgm.play();
        this.bgmTW = egret.Tween.get(this.bgmBtn, { loop: true });
        this.bgmTW.to({ rotation: 360 }, 2000);
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var sky = this.createBitmapByName("bg_png");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        var remX = 375 / stageW;
        var remY = 667 / stageH;
        this.snowObj = new Snow(50, stageW, stageH);
        this.addChild(this.snowObj);
        var tree = this.createBitmapByName("christmas_tree_png");
        this.addChild(tree);
        var targetH = stageH * 0.72;
        var targetW = (targetH / tree.height) * tree.width;
        tree.height = targetH;
        tree.width = targetW;
        tree.x = (stageW - tree.width) * 0.5;
        tree.y = 63 * remY;
        // 圣诞树动画
        var tw = egret.Tween.get(tree);
        tw.to({ y: 100 }, 1000);
        var gift1 = new Gift(2);
        this.addChild(gift1);
        gift1.x = tree.x + tree.width / 2 - 30;
        gift1.y = tree.y + 200;
        gift1.play();
        var gift2 = new Gift(1);
        this.addChild(gift2);
        gift2.x = gift1.x + gift1.width;
        gift2.y = gift1.y + 250;
        gift2.play();
        var gift3 = new Gift(2);
        this.addChild(gift3);
        gift3.x = tree.x + tree.width / 2 - 20;
        gift3.y = gift2.y + 100;
        gift3.play();
        var gift4 = new Gift(1);
        this.addChild(gift4);
        gift4.x = tree.x + gift4.width;
        gift4.y = gift3.y + 100;
        gift4.play();
        var gift5 = new Gift(3);
        this.addChild(gift5);
        gift5.x = gift1.x + 50;
        gift5.y = gift4.y + 100;
        gift5.play();
        var giftbox = new GiftBox(stageW, stageH, tree.x, tree.y + tree.height);
        this.addChild(giftbox);
        giftbox.play();
        this.bgmBtn = this.createBitmapByName("music_png");
        this.addChild(this.bgmBtn);
        this.bgmBtn.x = stageW - this.bgmBtn.width;
        this.bgmBtn.y = this.bgmBtn.height;
        this.bgmBtn.anchorOffsetX += this.bgmBtn.width / 2;
        this.bgmBtn.anchorOffsetY += this.bgmBtn.height / 2;
        this.bgmBtn.touchEnabled = true;
        this.bgmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgmPlay, this);
        this.bgm = RES.getRes("bg_mp3");
        if (getDevice() != "ios") {
            this.bgmPlay();
        }
        var popBox = new PopBox(stageW, stageH);
        this.addChild(popBox);
        popBox.addEventListener(ChooseGiftEvent.EventType, gift1.giveback, gift1);
        popBox.addEventListener(ChooseGiftEvent.EventType, gift2.giveback, gift2);
        popBox.addEventListener(ChooseGiftEvent.EventType, gift3.giveback, gift3);
        popBox.addEventListener(ChooseGiftEvent.EventType, gift4.giveback, gift4);
        popBox.addEventListener(ChooseGiftEvent.EventType, gift5.giveback, gift5);
        gift1.addEventListener(ChooseGiftEvent.EventType, giftbox.chooseListener, giftbox);
        gift2.addEventListener(ChooseGiftEvent.EventType, giftbox.chooseListener, giftbox);
        gift3.addEventListener(ChooseGiftEvent.EventType, giftbox.chooseListener, giftbox);
        gift4.addEventListener(ChooseGiftEvent.EventType, giftbox.chooseListener, giftbox);
        gift5.addEventListener(ChooseGiftEvent.EventType, giftbox.chooseListener, giftbox);
        giftbox.addEventListener(ChooseGiftEvent.EventType, popBox.openListener, popBox);
        // 设置定时器
        this.timer = new egret.Timer(50, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.start();
    };
    /**
     * 刷新屏幕绘制下雪
     */
    Main.prototype.timerFunc = function (event) {
        this.snowObj.play();
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map