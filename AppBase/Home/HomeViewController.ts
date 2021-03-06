import { AdType } from "../../Common/AdKit/AdConfig/AdInfo";
import AdKitCommon from "../../Common/AdKit/AdKitCommon";
import AdInsert from "../../Common/AdKit/Insert/AdInsert";
import PrefabCache from "../../Common/Cache/PrefabCache";
import Debug from "../../Common/Debug";
import Source from "../../Common/Source";
import UIViewController from "../../Common/UIKit/ViewController/UIViewController";
import UIHomeBase from "./UIHomeBase";
import Config from "../../Common/Config/Config";
import ResManager from "../../Common/Res/ResManager";
import AppSceneUtil from "../Common/AppSceneUtil";
import UI from "../../Common/UIKit/ViewController/UI";
import GameManager from "../Game/GameManager";
import LocalStorage from "../../Common/Core/LocalStorage";
import PopUpManager from "../../Common/UIKit/PopUp/PopUpManager";
import Platform from "../../Common/Platform";



export default class HomeViewController extends UIViewController {

    uiPrefab: Laya.Prefab;
    ui: UIHomeBase;
    runCount = 0;

    static _main: HomeViewController;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new HomeViewController();
        }
        return this._main;
    }

    ViewDidLoad() {
        Debug.Log("HomeViewController ViewDidLoad");
        super.ViewDidLoad();
        //提前加载game prefab
        // if (!HomeViewController.isGameHasInit) {
        //     var game = GameViewController.main();
        //     game.SetLoadFinishCallBack(this.AppPreLoadDidFinish.bind(this), null);
        // } else {
        //     this.LoadPrefab();
        // }
        this.LoadPrefab();

        // var filepath = "Resources/Common/Prefab/UIKit/UIImage/UIImage.prefab";
        // ResManager.LoadPrefab(
        //     {
        //         filepath: filepath,
        //         success: (p: any, data: any) => {
        //             console.log("load prefab:", data);
        //             // AppSceneUtil.main.rootNode.addChild(data.create());
        //             var ui = data.create(); 
        //             this.objController.addChild(ui); 
        //         },
        //         fail: () => {
        //             Debug.Log("AppScene fail=");
        //         },
        //     });

    }
    ViewDidUnLoad() {
        Debug.Log("HomeViewController ViewDidUnLoad");
        super.ViewDidUnLoad();

    }
    LoadPrefab() {
        var key = "UIHome" + Config.main.appType;
        // var key = "UIHomeMerge"
        Debug.Log("HomeViewController LoadPrefab key=" + key);
        PrefabCache.main.LoadByKey(
            {
                key: key,
                // filepath: "Resources/AppCommon/Prefab/Home/UIHomeMerge.prefab",
                success: (p: any, data: any) => {
                    this.uiPrefab = data;

                    this.CreateUI();

                },
                fail: () => {

                },
            });
    }


    CreateUI() {
        Debug.Log("HomeViewController CreateUI");
// return;
        var node = UI.Instantiate(this.uiPrefab);
        this.ui = node.getComponent(UIHomeBase);
        this.ui.SetController(this);

        // CloudResViewController.main().Show(null, null);

        if (this.runCount == 0) {
            this.ShowPrivacy();
        }

        this.runCount++;
    }

    ShowAd() {
        if (this.runCount == 0) {
            //至少在home界面显示一次视频广告
            // AdKitCommon.main.callbackAdVideoFinish = OnAdKitAdVideoFinish;
            // if (uiHome != null) {
            //     uiHome.OnClickBtnAdVideo();
            // }

            // 至少在home界面显示一次开机插屏
            var type = AdType.INSERT;
            var source = Source.GDT;
            AdInsert.main.InitAd(source);
            AdKitCommon.main.ShowAdInsert(100);

        }
    }

    ShowPrivacy() {
        // if (GameManager.main.isLoadGameScreenShot)
        // {
        //     return;
        // }

        if (!Platform.isHuawei) {
            this.ShowAd();
            return;
        }

        if (LocalStorage.GetBool(GameManager.KEY_DISABLE_UIPRIVACY)) {
            this.ShowAd();
            return;
        }

        PopUpManager.main.ShowByKey(
            {
                key: "UIPrivacy",
                open: (ui: any) => {
                },
                close: (ui: any) => {
                    this.ShowAd();
                },
            });
    }

}


