 
export class UIHomeBase extends UIView {
    @type(UIText)
    textTitle: UIText = null;

    @type(UIImage)
    imageBg: UIImage = null;


    uiAppCenter: UIHomeAppCenter;
    uiCenterBar: UIHomeCenterBar;
    uiSideBar: UIHomeSideBar;


    LoadCenterBar() {
        // var strPrefab = "App/Prefab/Home/UIHome" + cc.Config.main().appType;
        var key = "UIHomeCenterBar";

        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => {
                    var node = instantiate(data);
                    this.uiCenterBar = node.getComponent(UIHomeCenterBar);
                    this.uiCenterBar.SetParent(this);

                },
                fail: () => {

                },
            });



    }

    LoadSideBar() {
        var key = "UIHomeSideBar";

        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => {
                    var node = instantiate(data);
                    this.uiSideBar = node.getComponent(UIHomeSideBar);
                    this.uiSideBar.SetParent(this);

                },
                fail: () => {

                },
            });


    }

    LoadPrefabAppCenter() {
        var key = "UIHomeAppCenter";
        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => {
                    var node = instantiate(data);
                    this.uiAppCenter = node.getComponent(UIHomeAppCenter);
                    this.uiAppCenter.SetParent(this);

                },
                fail: () => {

                },
            });
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
