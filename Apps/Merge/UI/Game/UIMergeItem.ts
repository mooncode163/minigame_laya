import Common from "../../../../Common/Common";
import Debug from "../../../../Common/Debug";
import UIImage from "../../../../Common/UIKit/UIImage/UIImage";
import UITouchEvent from "../../../../Common/UIKit/UITouchEvent";
import UIView from "../../../../Common/UIKit/ViewController/UIView";
import UI from "../../../../Common/UIKit/ViewController/UI"; 
import Platform from "../../../../Common/Platform"; 
import CollisionDetection from "./CollisionDetection";
import UIFind from "../../../../Common/UIKit/ViewController/UIFind";
import GameData, { GameStatus } from "../../Data/GameData"; 
import { PropType } from "./UIPopProp";



export default class UIMergeItem extends UIView {
    imageItem: UIImage = null;
    isNew = false;
    type = 0;
    t = 0;
    hasGoDownDeadLine = false;

    onAwake() {
        super.onAwake();
        this.t = 0;


        this.imageItem = UIFind.FindImage(this.node, "ImgeItem");
        // this.image = this.Find("Image") as Laya.Image;

        // this.node.zIndex = 100;
        // var manager = director.getCollisionManager();
        // manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // var collider = this.node.getComponent(PhysicsBoxCollider);
        var ev = this.owner.addComponent(UITouchEvent);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);

        this.node.addComponent(CollisionDetection);

    }
    onStart() {
        super.onStart();
    }

    onDestroy() {

    }

    onUpdate() {
        if (!this.isNew) {
            // 游戏失败判断  onCollisionEnter 碰撞检测失效 直接判断位置
            this.IsCollisionDeadLine();
            // this.t += director.getDeltaTime();
            // if (this.t > 2.0) {
            // this.t = 0;
            // var pos = GameMerge.main.nodeDeadline.getPosition();
            // var y_top = this.node.getPosition().y + this.node.getBoundingBox().height / 2;
            // if (y_top >= pos.y) {
            //     Debug.Log("UIMergeItem this.hasGoDownDeadLine="+this.hasGoDownDeadLine);
            //     if (this.hasGoDownDeadLine) {
            //         if (!GameData.main.isGameFail) {

            //             GameData.main.isGameFail = true;
            //             Debug.Log("UIMergeItem game over");
            //             UIGameMerge.main.OnGameFinish(true);
            //         }
            //     }

            // } else {
            //     this.hasGoDownDeadLine = true;
            // }


            // }

        }
    }

    // 碰撞线检测
    IsCollisionDeadLine() {
        // var pos =UI.GetPosition(GameMerge.main.nodeDeadline);
        // var posMy =UI.GetPosition(this.owner);
        // var y1 = posMy.y + this.GetBoundingBox().height / 2;
        // var y2 = posMy.y - this.GetBoundingBox().height / 2;
        // if ((pos.y > y2) && (pos.y < y1)) {
        //     this.t += Common.GetCurrentTime();
        //     if (this.t > 2.0) {
        //         this.t = 0;
        //         if (!GameData.main.isGameFail) {
        //             GameData.main.isGameFail = true;
        //             Debug.Log("UIMergeItem game over");
        //             UIGameMerge.main.OnGameFinish(true);
        //         }
        //     }

        //     return true;
        // }
        return false;
    }

    UpdateImage(pic) {
        if (this.imageItem != null) {
            this.imageItem.UpdateImage(pic, "");
        }

        var isCloud = false;
        if (Platform.isCloudRes) {
            isCloud = true;
        }

        this.LayOut();

    }
    LayOut() {
        super.LayOut();

    }
    EnableGravity(isEnable) {
        if (this.node == null) {
            return;
        }
        var bd = this.node.getComponent(Laya.RigidBody);
        bd.type = isEnable ? UI.PhysicBodyTypeDynamic : UI.PhysicBodyTypeStatic;
    }

    onMouseDown(e) {
        // console.log("按下"); 
    }
    onMouseMove(e) {

    }
    onMouseUp(e) {
        var imageProp = GameData.main.game.imageProp;
        var duration = 0.5;
        var toPos =UI.GetNodePosition(this.node);
        if (GameData.main.status == GameStatus.Prop) {
            if (GameData.main.uiGame.typeProp == PropType.Hammer) {
                Laya.Tween.to(imageProp.node, { x: toPos.x, y: toPos.y }, duration / 2, Laya.Ease.sineInOut, Laya.Handler.create(this, this.OnTweenFinish));
            }

            if (GameData.main.uiGame.typeProp == PropType.Bomb) {
                Laya.Tween.to(imageProp.node, { x: toPos.x, y: toPos.y }, duration / 2, Laya.Ease.sineInOut, Laya.Handler.create(this, this.OnTweenFinish));
            }
        }

    }

    OnTweenFinish() {
        if (GameData.main.status == GameStatus.Prop) {
            if (GameData.main.uiGame.typeProp == PropType.Hammer) {

                GameData.main.game.DeleteItem(this);
             
            }

            if (GameData.main.uiGame.typeProp == PropType.Bomb) {
                GameData.main.game.DeleteAllItemsOfId(this.keyId);

            }
        }
    }

    OnUITouchEvent(ui: UITouchEvent, status: number, event?: any) {

        // var pos = ui.GetPosition(event);
        // var posnodeAR = ui.GetPositionOnNode(this.node,event);//坐标原点在node的锚点
        // var posui = ui.GetUIPosition(event);



        // // var uiTrans = GameMerge.main.node.getComponent(UITransform);
        // // var toPos = uiTrans.convertToNodeSpaceAR(new Vec3(posui.x, posui.y, 0)); 
        // var toPos =ui.GetPositionOnNode(GameMerge.main.node,event);
        // switch (status) {
        //     case UITouchEvent.TOUCH_DOWN:
        //         this.OnTouchDown(posnodeAR);
        //         break;

        //     case UITouchEvent.TOUCH_MOVE:
        //         this.OnTouchMove(posnodeAR);
        //         break;

        //     case UITouchEvent.TOUCH_UP:
        //         this.OnTouchUp(posnodeAR);
        //         {
        //             if (GameData.main.status == GameStatus.Prop) {
        //                 if (UIGameMerge.main.typeProp == PropType.Hammer) {
        //                     tween(imageProp.node)
        //                         .to(duration / 2, { position: toPos })
        //                         .call(() => {
        //                             GameMerge.main.DeleteItem(this);
        //                         })
        //                         .onStart()
        //                 }

        //                 if (UIGameMerge.main.typeProp == PropType.Bomb) {

        //                     tween(imageProp.node)
        //                         .to(duration / 2, { position: toPos })
        //                         .call(() => {
        //                             GameMerge.main.DeleteAllItemsOfId(this.id);
        //                         })
        //                         .onStart() 

        //                 }
        //             }

        //         }
        //         break;
        // }
    }

}


