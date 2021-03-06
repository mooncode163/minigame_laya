

// vscode 插件开发 typescript部分报错 Object is possibly 'undefined'.
/*
在tsconfig.js中:

strict设置false状态

{
    "compilerOptions": {
        "strict": false,
        //...
    }

    */

import Common from "../../Common";
import ColorConfig from "../../Config/ColorConfig";
import ImageRes from "../../Config/ImageRes";
import Debug from "../../Debug";
import Language from "../../Language/Language";
import LayOutBase from "../LayOut/LayOutBase";
import UIViewController from "./UIViewController";
import UI from "./UI";
import UIFind from "./UIFind";
import AppSceneUtil from "../../../AppBase/Common/AppSceneUtil";
import UITransform from "../UITransform";

// 编辑器绑定脚本变量 @prop 如果放在基类 编辑器识别不了  如果是派生类:变量在基类定义 派生类里声明@prop
// type	类型：Int,Number,sNumber,String,Bool,Option,editOption,Check,Color,ColorArray,Node,Nodes,Prefab,SizeGrid,Vec,Vector,Ease
// https://www.jianshu.com/p/411d3cb87325
// https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-3-4-0


// 一个完整的标签主要由下面几个部分：
// type IDE属性类型，此类型是指IDE属性类型，非真正的属性类型，不过大多情况下是一样的
// name IDE内显示的属性名称
// tips IDE内鼠标经过属性名称上后，显示的鼠标提示，如果没有则使用name（可选）
// default 输入框显示的默认值（可选）



// 模板@prop如何使用枚举
// http://ask.layabox.com/question/44695



// laya ui 坐标原点在屏幕左上角  和android ios 的系统UI一致
// laya 的舞台stage 类似于 cocos unity 的canvas
export default class UIView extends Laya.Script {



    //   public  get keyImage(): string {        
    //         return this._keyImage;
    //     } 
    //       /**@internal */
    //     public set keyImage(value: string) {
    //         this._keyImage = value;
    //     }



    index: number;
    keyId: string;
    tag: string;
    title: string;
    name: string;
    isPivotCenter: boolean = true;
    texture: Laya.Texture2D;

    callbackRenderFinish: Function = null

    public isSprite: boolean = false;
    private _transform: UITransform;
    public get transform(): UITransform {
        if (this._transform == null) {
            this._transform = new UITransform(this);
        }
        return this._transform;
    }

    public get mainCam(): Laya.Camera {
        return AppSceneUtil.mainCamera;
    }

    addComponent(componentType: typeof Laya.Component): any {
        return this.node.addComponent(componentType);
    }

    getComponent(componentType: typeof Laya.Component): any {
        return this.node.getComponent(componentType);
    }

    public get contentSize(): Laya.Size {
        return this.GetContentSize();
    }
    public set contentSize(value: Laya.Size) {
        this.SetContentSize(value.width,value.height);
    }

    public get boundSize(): Laya.Size {
        return this.GetBoundSize();
    }
    public set boundSize(value: Laya.Size) {
        var scalex =  value.width/this.contentSize.width;
        var scaley =  value.height/this.contentSize.height;
        UI.SetScaleX(this.node,scalex); 
        UI.SetScaleY(this.node,scaley); 
    }

    public get pivotX() {
        return UI.GetPivotX(this.node);
    }
    public get pivotY() {
        return UI.GetPivotY(this.node);
    }
    public get x(): number {
        return UI.GetPosition(this.node).x;
    }
    public set x(value: number) {
        var pt = UI.GetPosition(this.node);
        UI.SetNodePosition(this.node, value, pt.y);
    }


    public get y(): number {
        return UI.GetPosition(this.node).y;
    }
    public set y(value: number) {
        var pt = UI.GetPosition(this.node);
        UI.SetNodePosition(this.node, pt.x, value);
    }

    public get node(): Laya.Node {
        return this.owner;
    }

    public get visible(): boolean {
        var sp = this.owner as Laya.Sprite;
        var z = 0;
        if (sp != null) {
            return sp.visible;
        }
        return false
    }
    public set visible(value: boolean) {
        var sp = this.owner as Laya.Sprite;
        var z = 0;
        if (sp != null) {
            sp.visible = value;
            AppSceneUtil.isNeedLayout = true;
        }
    }

    public get zOrder(): number {
        var sp = this.owner as Laya.Sprite;
        var z = 0;
        if (sp != null) {
            return sp.zOrder;
        }
        return 0;
    }
    public set zOrder(value: number) {
        var sp = this.owner as Laya.Sprite;
        var z = 0;
        if (sp != null) {
            sp.zOrder = value;
        }
    }




    private _controller: UIViewController | null = null;
    // @type(UIViewController)
    //get 的用法
    get controller(): UIViewController {
        if (this._controller == null) {
            var max = 100;
            var i = 0;
            var nodefind = this.owner;
            while (i < max) {
                i++;
                var par = nodefind.parent;
                // Debug.Log("UIHomeCenterBar controller ");
                if (par == null) {
                    Debug.Log("UIView controller par is null");
                    break;
                } else {
                    Debug.Log("UIView controller par");
                }
                var view = par.getComponent(UIView);
                //view = par.view;
                if (view != null) {
                    var type = typeof view;
                    Debug.Log("UIView type=" + type);
                    this._controller = view._controller;
                    if (this._controller != null) {
                        Debug.Log("UIView find _controller");
                        break;
                    } else {
                        nodefind = view.node;
                    }
                } else {
                    break;
                    // continue;
                }

            }
        }
        return this._controller;
    }
    // set 的用法
    set controller(value: UIViewController) {
        this._controller = value;
    }


    static SetNodeContentSize(node: Laya.Node, w, h) {
        // var sp = node.getComponent(Laya.Sprite);
        var sp = node as Laya.Sprite;
        if (sp != null) {
            sp.width = w;
            sp.height = h;
        }
    }

    onAwake() {
    }

    onStart() {
        // [3]
    }

    //UIViewController
    SetController(con: UIViewController) {
        this.controller = con;
        con.objController.addChild(this.owner);
        con.view = this;

        con.ViewDidAppear();


    }

    SetViewParent(node) {
        // this.owner.parent = node;
        node.addChild(this.owner);
    }

    LayOut() {
             //获取所有子对象(第一层)
             var parent = this.node;
             for (var i = 0; i < parent.numChildren; i++) {
                 var child = parent.getChildAt(i);
                 var uiChild = child.getComponent(UIView);
                 if(uiChild!=null)
                 {
                    uiChild.LayOut();
                    Debug.Log("UIView uiChild LayOut child");
                 }
     
             }
      
             //all LayOutBaseInternal
             this.LayOutInternal(); 
    }

    LayOutNode(node: Laya.Node) {
        {
            if (node == null) {
                return;
            }
            var list = node.getComponents(LayOutBase);
            if (list == null) {
                return;
            }


            for (let ly of list) {
                if (ly) {
                    ly.LayOut();
                }
            }

        }
    }

    LayOutInternal() {
        //self 
        this.LayOutNode(this.owner);
        //child
        this.LayOutInternalChild();
    }


    LayOutInternalChild() {
        //child
        // var children = this.owner.children;
        if (this.owner == null) {
            return;
        }
        for (var i = 0; i < this.owner.numChildren; i++) {
            var child = this.owner.getChildAt(i);
            this.LayOutNode(child);
        }
    }

    LayOutDidFinish() {

    } 

    SetContentSize(w, h) {
        var w_real = w;
        var h_real = h;
        // laya w,h 为0时 会自动显示成图片大小
        if (w <= 0) {
            w_real = 0.0001;
        }
        if (h <= 0) {
            h_real = 0.0001;
        }
        UIView.SetNodeContentSize(this.owner, w_real, h_real);
        // this.owner?.getComponent(UITransform)?.setContentSize(new Size(w, h));
        this.LayOutInternalChild();
    }

    // Laya.Size
    GetContentSize() {
        var sp = this.owner as Laya.Sprite;
        var w = 0;
        var h = 0;
        if (sp != null) {
            w = sp.width;
            h = sp.height;
        }

        return new Laya.Size(w, h);
    }

    GetBoundingBox() {
        return UI.GetNodeBoundingBox(this.owner);
    }

    // return Laya.Size
    GetBoundSizeOfGameObject(nd: Laya.Node) {
        return UI.GetNodeBoundingBox(nd);
    }

    GetBoundSize() {
        return UI.GetNodeBoundingBox(this.owner);
    }

    // UIView parent
    SetParent(parent: UIView) {
        parent.owner.addChild(this.owner);
        this.LayOut();
    }

    GetParent() {
        return this.owner.parent.getComponent(UIView);
    }



    OnUIDidFinish() {

    }




    GetImageOfKey(key) {
        var ret = "";
        if (!Common.BlankString(key)) {
            ret = ImageRes.main.GetImage(key);
        }
        return ret;
    }

    UpdateLanguage() {

        // var list = this.owner.getComponentsInChildren(UIView);
        // list.forEach((ui) => {
        //     if (ui != null) {
        //         var node = ui.node;
        //         if (this.owner != node) {
        //             ui.UpdateLanguage();
        //         }
        //     }

        // });

        for (var i = 0; i < this.owner.numChildren; i++) {
            var child = this.owner.getChildAt(i);
            var ui = child.getComponent(UIView);
            if (ui != null) {
                if (this.owner != ui.owner) {
                    ui.UpdateLanguage();
                }
            }
        }
    }


    AddChild(child: UIView) {
        this.owner.addChild(child.owner);
        this.LayOut();
    }


    // 加入世界坐标
    AddNodeToMainWorld(node: Laya.Node) {
        // AppSceneUtil.mainScene.addChild(node);
        this.node.addChild(node);
    }
    AddVideToMainWorld(ui: UIView) {
        this.AddNodeToMainWorld(ui.node);
    }
}

