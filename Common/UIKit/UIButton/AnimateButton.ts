import AudioPlay from "../../Audio/AudioPlay";
import Common from "../../Common";
import CommonRes from "../../CommonRes";
import Debug from "../../Debug";
import LayOutSize from "../LayOut/LayOutSize";
import UITouchEvent from "../Event/UITouchEvent";
import UIView from "../ViewController/UIView";
import DataTouch from "../Event/DataTouch";



export default class AnimateButton extends Laya.Script {
    // btnBg: Laya.Button;
    /** @prop {name:clickHandler,type:Handler}*/
    public clickHandler: Handler;

    /** @prop {name:isStopTouchOther,type:Bool,tips:"不让子节点的鼠标事件穿透到父节点"}*/
    isStopTouchOther: boolean = false;

    duration = 200;//0.2 //ms
    scale1 = 1.2;
    scale2 = 1;

    onAwake() {
        super.onAwake();

        /*
        this.btnBg = new Laya.Button;
        this.owner.addChild(this.btnBg);
        // this.btnBg.zOrder = 0;
        // 修改层级
        // this.owner.setChildIndex(this.btnBg,0);

        this.btnBg.addComponent(LayOutSize);
        this.btnBg.on(Laya.Event.CLICK, this, this.OnBtnClick);
*/
        var ev = this.owner.addComponent(UITouchEvent);
        ev.callBackTouch = this.OnUITouchEvent.bind(this); 

        this.LayOut();
    }

    onStart() {
        // [3]
        super.onStart();
        var ev = this.owner.getComponent(UITouchEvent);
        ev.isStopTouchOther = this.isStopTouchOther;

        this.LayOut();
    }


    LayOut() {
        // super.LayOut();

    }



    OnUITouchEvent(ui: UITouchEvent, status: number) {
        switch (status) {

            case DataTouch.TOUCH_DOWN:
                {
                }
                break;
            case DataTouch.TOUCH_MOVE:
                {
                }

                break;
            case DataTouch.TOUCH_UP:
                {

                }
                break;
            case DataTouch.Click:
                {
                    this.OnBtnClick();
                }
                break;

        }
    }

    /*
       // 用法
               uibtn.SetClick(this,function (btn:AnimateButton): void {
               if(btn!=null)
               {
                   
               } 
           }.bind(this));



    OnClickItem(ui:AnimateButton) {
    }

       */
    // 动画点击回调
    SetClick(caller: any, method: Function | null) {
        // this.clickHandler = Laya.Handler.create(this, function (): void {

        //     Debug.Log("UIHomeMerge UIButton  on click");

        // },null,false);
        this.clickHandler = Laya.Handler.create(this, method, [this], false);
    }

    onTween1Finish() {

        Laya.Tween.clearTween(this.onTween1Finish);
        Laya.Tween.to(this.owner, { scaleX: this.scale2, scaleY: this.scale2 }, this.duration / 2, Laya.Ease.sineInOut, Laya.Handler.create(this, this.onTween2Finish));
    }

    onTween2Finish() {
        Laya.Tween.clearTween(this.onTween2Finish);
        this.DoClickItem();
    }
    OnBtnClick() {
        Debug.Log("UIButton OnBtnClick");
        Laya.Tween.to(this.owner, { scaleX: this.scale1, scaleY: this.scale1 }, this.duration / 2, Laya.Ease.sineInOut, Laya.Handler.create(this, this.onTween1Finish));
        //.to(this.owner, { scaleX: scale2, scaleY: scale2 }, duration / 2, Laya.Ease.sineInOut, Laya.Handler.create(this, this.DoClickItem.bind(this), [this], false));

        var ret = Common.GetBoolOfKey(CommonRes.KEY_BTN_SOUND, false);
        if (ret) {
            //play sound click
            AudioPlay.main.PlayByKey("BtnClick");
        }


    }


    DoClickItem() {
        Debug.Log("UIButton DoClickItem");
        if (this.clickHandler) {
            Debug.Log("UIButton run");
            this.clickHandler.run();
        }
    }

}


