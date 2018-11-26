class Snow extends egret.Sprite {
	private snowPoint:egret.Bitmap[];

	private vX:number[];
	private vY:number[];
	private size:number[];
	private windDirection:number[];

	private screenW:number;
	private screenH:number;
	private num:number;

	public constructor(num:number,screenW:number,screenH:number) {
        super();
		this.num = num;
		this.screenW = screenW;
		this.screenH = screenH;
		this.snowPoint = new Array();
		this.vX = new Array();
		this.vY = new Array();
		this.size = new Array();
		this.windDirection = new Array();
		

		for (var i=0;i<this.num;i++){
			this.size[i] = 0.4 + Math.random()*2;
			this.snowPoint[i] = this.createBitmapByName("snow_png");
			this.addChild(this.snowPoint[i]);
			this.snowPoint[i].x = Math.random() * this.screenW + 1;
			this.snowPoint[i].y = Math.random() * this.screenH;
			this.snowPoint[i].scaleX *= this.size[i];
			this.snowPoint[i].scaleY *= this.size[i];
			// this.snowPoint[i].graphics.beginFill(0xffffff);
        	// this.snowPoint[i].graphics.drawCircle(0, 0, 5);
        	// this.snowPoint[i].graphics.endFill();

			this.vX[i] = 1 + Math.floor(Math.random() * 1);
			this.vY[i] = 2 + Math.floor(Math.random() * 5);
			this.windDirection[i] = ((Math.random() * 2)==0?-1:1);
		}
	}

	public play():void{

		for (var i=0;i<this.num;i++){
			if (this.snowPoint[i].y < this.screenH+5 && this.snowPoint[i].x < this.screenW+5 ){

				this.snowPoint[i].x +=  this.vX[i];
				this.snowPoint[i].y += this.vY[i];

			}else{
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
				this.windDirection[i] = ((Math.random() * 2)==0?-1:1);

			}

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