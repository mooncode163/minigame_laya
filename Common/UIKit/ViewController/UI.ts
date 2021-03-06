
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

import AppSceneUtil from "../../../AppBase/Common/AppSceneUtil";
import Debug from "../../Debug";
// import UIButton from "../UIButton/UIButton";
// import UIImage from "../UIImage/UIImage";
// import UIText from "../UIText/UIText";



// Laya UI坐标系原点在屏幕左上角

export default class UI {
    public static PhysicBodyTypeDynamic = "dynamic";
    public static PhysicBodyTypeStatic = "static";
    public static PhysicBodyTypeKinematic = "kinematic";
 
    static SetPosition(node: Laya.Node, pt: Laya.Vector3) {
        UI.SetNodePosition(node, pt.x, pt.y);
    }
    static GetPosition(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        var x = 0;
        var y = 0;
        var z = 0;
        if (sp != null) {
            x = sp.x;
            y = sp.y;
            // z = sp.z;
        }
        return new Laya.Vector3(x, y, z);
    }
    static GetNodePosition(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        var x = 0;
        var y = 0;
        if (sp != null) {
            x = sp.x;
            y = sp.y;
        }
        return new Laya.Vector3(x, y);
    }

    static SetNodePosition(node: Laya.Node, x: any, y: any) {
        var sp = node as Laya.Sprite;
        if (sp != null) {
            sp.x = x;
            sp.y = y;
        }
    }

    // 设置猫点在中心
    static SetNodePivotCenter(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        if (sp != null) {
            sp.pivotX = sp.width / 2;
            sp.pivotY = sp.height / 2;
        }
    }

    static GetNodeBoundingBox(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        var w = 0;
        var h = 0;
        if (sp != null) {
            w = sp.width * sp.scaleX;
            h = sp.height * sp.scaleY;
        }

        return new Laya.Size(w, h);
    }

    static SetNodeContentSize(node: Laya.Node, w, h) {
        var sp = node as Laya.Sprite;
        if (sp != null) {
            sp.width = w;
            sp.height = h;
        } else {
            Debug.Log("SetNodeContentSize sp null");
        }
    }
    static GetNodeContentSize(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        var w = 0;
        var h = 0;
        if (sp != null) {
            w = sp.width;
            h = sp.height;
        }

        return new Laya.Size(w, h);
    }
    static GetNodeWidth(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        var w = 0;
        if (sp != null) {
            w = sp.width;
        }

        return w;
    }
    static GetNodeHeight(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        var h = 0;
        if (sp != null) {
            h = sp.height;
        }
        return h;
    }
    static SetScaleXY(node: Laya.Node, scale) {
        var sp = node as Laya.Sprite;
        if (sp != null) {
            sp.scaleX = scale;
            sp.scaleY = scale;
        }
    }
    static SetScaleX(node: Laya.Node, scale) {
        var sp = node as Laya.Sprite;
        if (sp != null) {
            sp.scaleX = scale;
        }
    }

    static SetScaleY(node: Laya.Node, scale) {
        var sp = node as Laya.Sprite;
        if (sp != null) {
            sp.scaleY = scale;
        }
    }

    static GetScaleX(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        if (sp != null) {
            return sp.scaleX;
        }
        return 1;
    }
    static GetScaleY(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        if (sp != null) {
            return sp.scaleY;
        }
        return 1;
    }

    static GetPivotX(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        var x = 0;
        if (sp != null) {
            x = sp.pivotX;
        }
        return x;
    }
    static GetPivotY(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        var x = 0;
        if (sp != null) {
            x = sp.pivotY;
        }
        return x;
    }
    static SetNodeWidth(node: Laya.Node, w: number) {
        var sp = node as Laya.Sprite;
        if (sp != null) {
            sp.width = w;
        }
    }
    static SetNodeHeight(node: Laya.Node, h: number) {
        var sp = node as Laya.Sprite;
        if (sp != null) {
            sp.height = h;
        }
    }

    // 实例化
    static Instantiate(prefab: Laya.Prefab): Laya.Node {
        var node = prefab.create();
        return node;
    }

    static SetParent(child: Laya.Node, parent: Laya.Node) {
        parent.addChild(child);
    }


    // 是否隐藏
    static SetActive(node: Laya.Node, active: boolean) {
        var sp = node as Laya.Sprite;
        var z = 0;
        if (sp != null) {
            sp.visible = active;
            AppSceneUtil.isNeedLayout = true;
        }
    }


    static GetChild(node: Laya.Node, componentType: typeof Laya.Component, index: number) {
        var idx = 0;
        for (var i = 0; i < node.numChildren; i++) {
            var child = node.getChildAt(i);
            if (child == null) {
                // 过滤已经销毁的嵌套子对象 
                continue;
            }

            var le = child.getComponent(componentType);
            if (le != null) {
                if (idx == index) {
                    return le;
                }
                idx++;
            }
        }

        return null;
    }
    // uiParent:UIView
    static CreateUI3D(componentType: typeof Laya.Component,uiParent:any,keyImage:string="",keyText:string="") {
        // var node = new Laya.Node();
        var node = new Laya.Sprite3D();
        var ui = node.addComponent(componentType);
        ui.name = componentType.name;
        node.name = ui.name;
        ui.keyImage = keyImage;//Circle  GameWinBg 
        if(uiParent!=null)
        {
            uiParent.AddNodeToMainWorld(node);
        }else{
            // AppSceneUtil.mainScene.addChild(node);
            AppSceneUtil.objMainWorld.addChild(node);
        }

        if(node.transform==null)
        {
            Debug.Log("CreateUI3D transform Laya.Sprite3D is null ");
        }
        return ui;
    }
}


