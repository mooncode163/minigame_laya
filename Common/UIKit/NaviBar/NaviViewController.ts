import Common from "../../Common";
import Debug from "../../Debug";
import UIView from "../ViewController/UIView";
import UIViewController from "../ViewController/UIViewController";
import UI from "../ViewController/UI";
import UINaviBar from "./UINaviBar";

 
export default class NaviViewController extends UIViewController {
    // @type(Node) // Declare that the cc type of the attribute _targetNode is Node
    objContent: Laya.View | null = null;

    uiNaviBarPrefab: Laya.Prefab | null = null;

    uiNaviBar: UINaviBar | null = null;
    rootController: UIViewController | null = null;
    rootControllerPre: UIViewController | null = null;
    listController: UIViewController[] = [];


    LoadPrefab() {

    }

    ViewDidLoad() {
        super.ViewDidLoad();
        this.CreateContent();
        this.LoadPrefab();
    }
    CreateBar() { 
        Debug.Log("NaviViewController CreateBar");
        // const node = instantiate(this.uiNaviBarPrefab);
        // this.uiNaviBar = node.getComponent(UINaviBar);
        // this.uiNaviBar.SetController(this);
    }

    CreateContent() {
        this.objContent = new Laya.View();
        this.objContent.addComponent(UIView);
        // var uitran = this.objContent.addComponent(UITransform);
        // this.objContent.parent = this.objController;
        this.objController.addChild(this.objContent);

        var size = Common.sizeCanvas;//this.objController.getComponent(UITransform).contentSize; 
        // uitran.setContentSize(size);
        UI.SetNodeContentSize(this.objContent,size.width,size.height);

    }

    //  显示了下一个controller ui
    OnNextUIDidAppear() {
        this.DestroyControllerInternal();
    }

    Push(controller: UIViewController) {
        if (controller == null) {
            return;
        }
        this.listController.push(controller);
        //  controller.type = UIViewController.Type.NAVIBAR;
        controller.naviController = this;
        this.UpdateController();

    }

    // 返回上一级
    Pop() {
        if (this.listController.length == 0) {
            Debug.Log("NaviViewController listController.length =0");
            return;
        }
        if (this.rootControllerPre != null) {
            Debug.Log("NaviViewController Pop rootControllerPre is not destroyed");
            return;
        }
        // while(true)
        // {
        //     if(this.rootControllerPre == null)
        //     {
        //         //等待上一个controller销毁,才能返回上一级
        //         break;
        //     }
        //     Debug.Log(" Pop waiting ...");
        // }

        this.listController.splice(this.listController.length - 1, 1);
        this.UpdateController();
    }
    HideNavibar(isHide) {
        // if (this.uiNaviBar != null) {
        //     this.uiNaviBar.node.active = !isHide;
        // }
    }
    DestroyController() {
        // 延迟销毁:留上一个ui 不然ui切换时候可能会看到场景的背景 
        // Laya.timer.once(100, this, function (): void {
        //     this.DestroyControllerInternal();
        // });
    }

    DestroyControllerInternal() {
        if (this.rootControllerPre != null) {
            this.rootControllerPre.DestroyObjController();
            this.rootControllerPre = null;
        }
    }
    UpdateController() {

        if (this.listController.length == 0) {
            return;
        }
        this.rootControllerPre = this.rootController;
        this.DestroyController();

        this.rootController = this.listController[this.listController.length - 1];
        Debug.Log("UpdateController this.listController.length=" + this.listController.length);
        if (this.objContent != null) {
            Debug.Log("UpdateController SetViewParent");
            //this.rootController = controller;
            this.rootController.SetViewParent(this.objContent);
            //controller.LayOutView();
        }
        if (this.uiNaviBar != null) {
            this.uiNaviBar.HideBtnBack((this.listController.length < 2) ? true : false);
            this.uiNaviBar.UpdateTitle(this.rootController.title);
        }

    }

    LayOut() {
        super.LayOut();
        if (this.rootController != null) {
            this.rootController.LayOut();
        }

    }
}



