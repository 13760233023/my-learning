class Gift extends egret.Sprite {

    private giftImg:egret.Bitmap;
	public giftType:number;
	public giftName:string;
	public hadChoose:boolean;


	public giftTw:egret.Tween;



	public constructor(_type:number) {
        super();
		this.giftType = _type;
        this.createView();

        this.giftImg.touchEnabled = true;
        this.giftImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.choose, this);
	}

    private createView():void {
		this.hadChoose = false;
		switch(this.giftType){
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
    }


	public play():void {
		this.giftImg.anchorOffsetX = this.giftImg.x + this.giftImg.width/2;
        this.giftTw = egret.Tween.get( this.giftImg );
        this.giftTw.to( {y:this.giftImg.y+30}, 1000 );

        this.giftTw = egret.Tween.get( this.giftImg, { loop:true} );
        this.giftTw.to( {x:this.giftImg.x+10,rotation:-10}, Math.random()*200+400 ).wait( 100 )
            .to( {x:this.giftImg.x,rotation:10}, Math.random()*200+400 ).wait( 100 )
	}

	
	public choose():void {
		this.hadChoose = true;

		console.log("choose"+this.giftType);
		this.giftTw.pause();
		this.giftTw = egret.Tween.get( this.giftImg );
		this.giftTw.to( {alpha:0}, 600 ).set({alpha:0,visible:false});

		// 通知盒子
		var giftEvent:ChooseGiftEvent = new ChooseGiftEvent(ChooseGiftEvent.EventType);
		giftEvent.giftType = this.giftType;
		this.dispatchEvent(giftEvent);
	}

	/**
	 * 关闭选框 归还礼物
	 */
	public giveback():void{
		if(this.hadChoose){
			this.hadChoose = false;

			this.giftImg.visible = true;
			this.giftImg.alpha = 0;

			this.giftTw = egret.Tween.get( this.giftImg );
			this.giftTw.to( {alpha:1}, 600 ).set({alpha:1,visible:true});

			this.giftTw = egret.Tween.get( this.giftImg, { loop:true} );
			this.giftTw.to( {x:this.giftImg.x+10,rotation:-10}, 500 ).wait( 100 )
				.to( {x:this.giftImg.x,rotation:10}, 500 ).wait( 100 )
		}
	}
	/**
	 * 获得礼物名称
	 */
	static getGiftName(type:number):string{
		switch(type){
			case 1:
			return "猫王收音机OTR 纯真白";
			case 2:
			return "猫王收音机OTR 嬉皮红";
			case 3:
			return "猫王收音机OTR 复古绿";
			default:
			return "猫王收音机OTR 纯真白";
		}
	}

 	/**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


}