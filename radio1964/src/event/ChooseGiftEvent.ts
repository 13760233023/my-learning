class ChooseGiftEvent extends egret.Event{
	
    public static EventType:string = "ChooseGiftEvent";
	public giftType:number;
	
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
    }

}