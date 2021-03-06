import AdKitCommon from "../../Common/AdKit/AdKitCommon";
import PrefabCache from "../../Common/Cache/PrefabCache";
import Debug from "../../Common/Debug";
import UIViewController from "../../Common/UIKit/ViewController/UIViewController";
import UIGameBase from "./UIGameBase";
import Config from "../../Common/Config/Config";
import UI from "../../Common/UIKit/ViewController/UI";



export default class GameViewController extends UIViewController {

    uiPrefab: Laya.Prefab = null;
    ui: UIGameBase = null;
    _gameBase: UIGameBase = null;
    get gameBase() {
        // this.LoadUI();
        return this.ui;
    }


    static _main: GameViewController;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new GameViewController();
        }
        return this._main;
    }




    Init() {

    }


    LoadUI() {
        var node = UI.Instantiate(this.uiPrefab);
        this.ui = node.getComponent(UIGameBase);
    }

    CreateUI() {
        this.LoadUI();
        this.ui.SetController(this);

        AdKitCommon.main.InitAdBanner();
        AdKitCommon.main.ShowAdBanner(true);

        // insert
        AdKitCommon.main.InitAdInsert();
        AdKitCommon.main.ShowAdInsert(100);
    }

    LoadPrefabEnd() {

    }
 


    LoadPrefab() {
        var key = "UIGame" + Config.main.appType;
        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => {
                    this.uiPrefab = data;
                    this.CreateUI();

                },
                fail: () => {

                },
            });

    }


    ViewDidLoad() {
        Debug.Log("GameViewController ViewDidLoad");
        super.ViewDidLoad();
        this.LoadPrefab();
    }
    ViewDidUnLoad() {
        Debug.Log("GameViewController ViewDidUnLoad");
        super.ViewDidUnLoad();
        // this.ui.node.destroy();
        this.ui = null;

    }
    LayOutView() {
        Debug.Log("GameViewController LayOutView");
        //  base.LayOutView();

    }

    GotoGame(name: string) {
    }
}


