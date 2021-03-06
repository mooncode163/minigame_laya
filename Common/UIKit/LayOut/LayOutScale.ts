
import Common from "../../Common";
import Debug from "../../Debug";
import UI from "../ViewController/UI";
import UIView3D from "../ViewController/UIView3D";
import LayOutBase from "./LayOutBase";

import { ScaleType } from "./LayOutUtil";


export default class LayOutScale extends LayOutBase {


    // @prop 在基类定义
    /** @prop {name:enableLayout,type:Bool}*/
    /** @prop {name:enableHide,type:Bool}*/
    /** @prop {name:enableLandscape,type:Bool}*/
    /** @prop {name:enableOffsetAdBanner,type:Bool}*/
    /** @prop {name:isOnlyForPortrait,type:Bool}*/
    /** @prop {name:isOnlyForLandscape,type:Bool}*/

    /** @prop {name:align,type:Option,option:"UP,DOWN,LEFT,RIGHT,CENTER,UPLEFT,UPRIGHT,DOWNLEFT,DOWNRIGHT,Horizontal,Vertical,SAMEPOSTION", default:"LEFT"}*/
    /** @prop {name:target,type:Node}*/
    /** @prop {name:target2,type:Node}*/

    /** @prop {name:offsetXLeft,type:Number}*/
    /** @prop {name:offsetXRight,type:Number}*/
    /** @prop {name:offsetYUp,type:Number}*/
    /** @prop {name:offsetYDown,type:Number}*/

    // @prop 在基类定义

    /** @prop {name:ratio,type:number}*/
    ratio = 1.0;

    private _type = ScaleType.MIN;
    /** @prop {name:type,type:Option,option:"MIN,MAX",default:"MIN"}*/
    // @prop 在基类定义
    //get 的用法
    get type() {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._type;
    }
    // set 的用法
    set type(value) {
        this._type = value;
        this.LayOut();

    }


    onAwake() {
        super.onAwake();
        // this.type = this._type;
        this.LayOut();
    }

    onStart() {
        super.onStart();
        this.LayOut();
    }

    LayOut() {
        if (!this.Enable()) {
            return;
        }
        super.LayOut();
        this.UpdateType();
    }


    UpdateType() {
        switch (this.type) {
            case ScaleType.MIN:
                {
                    this.ScaleNode(this.node, false);
                }
                break;
            case ScaleType.MAX:
                {
                    this.ScaleNode(this.node, true);
                }
                break;

        }
    }

    ScaleNode(node: Laya.Node, isMaxFit: boolean) {
        var x, y, w, h;
        if (node == null) {
            return;
        }
        var scale = 0;
        var size = this.GetSize();
        var sizeParent = this.GetSizeParent();
        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        w_parent = sizeParent.width;
        h_parent = sizeParent.height;
        Debug.Log("LayOutScale1  scale=" + scale + " name=" + this.owner.name + " w_parent=" + w_parent );
        if ((w_parent == 0)||(h_parent==0)) {
            Debug.Log("LayOutScale return parent=0"+" name=" + this.owner.name)
            return;
        }
        var sizeCanvas = Common.sizeCanvas;
        // if (w_parent == 0) {
        //     w_parent = sizeCanvas.width;
        // }
        // if (h_parent == 0) {
        //     h_parent = sizeCanvas.height;
        // } 
        w_parent -= (this.offsetXLeft + this.offsetXRight);
        h_parent -= (this.offsetYUp + this.offsetYDown);
        w = size.width;
        h = size.height;
        if ((w == 0)||(h==0)) {
            Debug.Log("LayOutScale return size=0"+" name=" + this.owner.name)
            return;
        }
       
        if (isMaxFit == true) {
            scale = Common.GetMaxFitScale(w, h, w_parent, h_parent);
        } else {
            scale = Common.GetBestFitScale(w, h, w_parent, h_parent);
        }
        scale = scale * this.ratio;
        Debug.Log("LayOutScale  scale=" + scale + " name=" + this.owner.name + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " h=" + h + " isMaxFit=" + isMaxFit + " this.issprite=" + this.isSprite);

        if (this.isSprite) {

            var ui: UIView3D = this.node.getComponent(UIView3D);
            if (ui != null) {

                ui.transform.localScale = new Laya.Vector3(scale, scale, 1);
            }
        } else {
            UI.SetScaleX(this.node, scale);
            UI.SetScaleY(this.node, scale);
        }
    }

}
