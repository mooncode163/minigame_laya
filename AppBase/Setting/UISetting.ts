import PrefabCache from "../../Common/Cache/PrefabCache";
import Common from "../../Common/Common";
import ImageRes from "../../Common/Config/ImageRes";
import Debug from "../../Common/Debug";
import ItemInfo from "../../Common/ItemInfo";
 
import UIButton from "../../Common/UIKit/UIButton/UIButton";
import UIImage from "../../Common/UIKit/UIImage/UIImage";  
import IUIScrollView from "../../Common/UIKit/UIScrollView/IUIScrollView";
import UIScrollView from "../../Common/UIKit/UIScrollView/UIScrollView";
import UITableView from "../../Common/UIKit/UITableView/UITableView";
import UIText from "../../Common/UIKit/UIText/UIText";
import UI from "../../Common/UIKit/ViewController/UI";
import UIFind from "../../Common/UIKit/ViewController/UIFind";
import UIView from "../../Common/UIKit/ViewController/UIView";
import SettingData, { SettingInfo, SettingType } from "./SettingData";
import UISettingCellItem from "./UISettingCellItem";




 
 
export default class UISetting extends UIView implements IUIScrollView {
    oneCellNum = 1;
    heightCell = 160;
    btnBack: UIButton = null;
    textTitle: UIText = null;
    uiScrollView: UIScrollView = null;
    imageBg: UIImage = null;

    uiTableView: UITableView = null;

    uiPrefabCell: Laya.Prefab;


    onAwake() {
        super.onAwake();
        SettingData.main.uiSetting = this;

        this.btnBack = UIFind.FindUI(this.node, "BtnBack", UIButton);
        this.btnBack.SetClick(this, this.OnClickBtnBack.bind(this));

        this.uiScrollView = UIFind.FindUI(this.node, "UIScrollView", UIScrollView);
        this.uiScrollView.delegate = this;

        this.UpdateItem();
        this.LoadPrefab();
    }


    onStart() {
        // [3]
        super.onStart();

 
        // this.uiScrollView.Reload();
        this.LayOut();
    }
    LoadPrefab() {
        var key = "UISettingCellItem";
        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => {
                    this.uiPrefabCell = data;
                    for (var i = 0; i < SettingData.main.listItem.length; i++) {
                        var node = UI.Instantiate(this.uiPrefabCell);
                        var ui = node.getComponent(UISettingCellItem);
                        ui.index = i;
                        this.uiScrollView.Add(ui);
                    }

                },
                fail: () => {

                },
            });
    }

    UpdateItem() {
        // SettingData.main.listItem.length = 0;
        if(SettingData.main.listItem.length!=0)
        {
            return;
        }
        {
            var info = new SettingInfo();
            info.keyTitle = "STR_SETTING_LANGUAGE";//Language.main.GetString("STR_SETTING_LANGUAGE");
            info.tag = SettingType.LANGUAGE;
            SettingData.main.listItem.push(info);
        }

        var isHasBgMusic = true;
        // if (Config.main.appType == AppType.SHAPECOLOR) {
        //     isHasBgMusic = false;
        // }
        if (isHasBgMusic) {
            var info = new SettingInfo();
            info.keyTitle = "STR_SETTING_BACKGROUND_MUSIC";
            info.tag = SettingType.BACKGROUND_MUSIC;
            SettingData.main.listItem.push(info);
        }

        {
            var info = new SettingInfo();
            info.keyTitle = "STR_SETTING_BTN_SOUND";
            info.tag = SettingType.BTN_SOUND;
            SettingData.main.listItem.push(info);
        }

        // this.uiScrollView.listItem = this.listItem;


    }


    LayOut() {
        super.LayOut();
    }
    OnScrollViewDidClickItem(uiScroll:any,uiItem:any) {
        Debug.Log("UISetting OnScrollViewDidClickItem name=" + uiItem.owner.name  + " index=" + uiItem.index);

        var uiCell = uiItem as UISettingCellItem;
        if(uiCell!=null)
        {
            uiCell.OnClickItem();
        }
    }


    OnClickBtnBack() {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    }
 


}


