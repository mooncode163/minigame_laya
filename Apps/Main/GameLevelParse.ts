import LevelData from "../../AppBase/Game/LevelData";
import LevelParseBase from "../../AppBase/Game/LevelParseBase";
import CloudRes from "../../Common/CloundRes/CloudRes";
import Common from "../../Common/Common";
import Debug from "../../Common/Debug";
import FileUtil from "../../Common/File/FileUtil";
import ItemInfo from "../../Common/ItemInfo";
import ResManager from "../../Common/Res/ResManager";
import GameData from "../Merge/Data/GameData";


export default class GameLevelParse extends LevelParseBase {
    countLoad = 0;
    loadMax = 0;

    listGameItems: ItemInfo[] = [];
    listGameItemDefault: ItemInfo[] = [];

    static _main: GameLevelParse;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new GameLevelParse();
        }
        return this._main;
    }


    CleanGuankaList() {
        if (this.listGameItems != null) {
            this.listGameItems.splice(0, this.listGameItems.length);
        }

    }

    GetLevelItemInfo(idx) {
        if (this.listGameItems == null) {
            return null;
        }
        if (idx >= this.listGameItems.length) {
            return null;
        }
        var info = this.listGameItems[idx];
        // Debug.Log("UIGameCaiCaiLe GetLevelItemInfo idx=" + idx + " info=" + info);
        return info;
    }
    // 从0开始
    GetIndexById(strid) {
        for (var i = 0; i < this.listGameItems.length; i++) {
            var info = this.listGameItems[i] as ItemInfo;
            if (strid == info.id) {
                return i;
            }
        }
        return 0;
    }
    GetLastItemInfo() {
        Debug.Log("GameItems:GetLastItemInfo this.listGameItems=" + this.listGameItems.length);
        return this.listGameItems[this.listGameItems.length - 1];
    }
    GetGuankaTotal() {
        return this.listGameItems.length;
    }

    GetCustomImagePath(id) {
        var pic = this.GetSaveCustomImagePath(id);
        if (!FileUtil.FileExist(pic)) {
            pic = this.GetImagePathPlace(id, 0);
        }
        return pic;
    }

    // string 
    GetSaveCustomImagePath(id) {
        return Common.GAME_RES_DIR + "/Image/" + id + ".png";
    }
    IsRenderCustomImage(id) {
        if (GameData.main.IsCustom()) {
            if (this.IsHasCustomImage(id)) {
                return true;
            }
        }
        return false;
    }

    IsHasCustomImage(id) {
        var pic = this.GetSaveCustomImagePath(id);
        if (FileUtil.FileExist(pic)) {
            return true;
        }
        return false;
    }
    GetImagePath(id) {
        if (GameData.main.IsCustom()) {
            return this.GetCustomImagePath(id);
        }
        var idx = LevelData.main.placeLevel;
        return this.GetImagePathPlace(id, idx);

    }

    GetImagePathDefault(id) {
        return this.GetImagePathPlace(id, 0);
    }
    GetImagePathPlace(id, idx) {
        var infoPlace = LevelData.main.GetPlaceItemInfo(idx);
        return CloudRes.main.rootPath + "/Image/" + infoPlace.id + "/" + id + ".png";
        // return Common.CLOUD_RES_DIR + "/Image/" + infoPlace.id + "/" + id + ".png";
    }

    ParseGameItemJson(json) {

        var items = json.items;
        for (var i = 0; i < items.length; i++) {
            var info = new ItemInfo();
            var item = items[i];
            info.id = item["id"];
            info.pic = this.GetImagePath(info.id);
            this.listGameItems.push(info);
        }
    }


    ParseGameItems(json) {
        var items = json.items;
        for (var i = 0; i < items.length; i++) {
            var info = new ItemInfo();
            var item = items[i];
            info.id = item["id"];
            info.pic = this.GetImagePath(info.id);
            this.listGameItems.push(info);
        }
        Debug.Log("GameItems:this.listGameItems=" + this.listGameItems.length);

    }

    ParseGameItemsDefault(json) {
        var items = json.items;
        for (var i = 0; i < items.length; i++) {
            var info = new ItemInfo();
            var item = items[i];
            info.id = item["id"];
            info.pic = this.GetImagePath(info.id);
            this.listGameItemDefault.push(info);
        }

        // this.ParseGuankaDidFinish();
    }

    /*
    { 
    success: (p:any) => {
        
    }, 
    fail: (p:any) => {
        
    },
    }
    */
    StartParseGameItems(obj: any) {
        // if (obj.success != null) {
        //     obj.success(this);
        // }
        // return;

        if ((this.listGameItems != null) && (this.listGameItems.length != 0)) {
            if (obj.success != null) {
                obj.success(this);
            }
            return;
        }

        var idx = LevelData.main.placeLevel;
        var infoPlace = LevelData.main.GetPlaceItemInfo(idx);
        var filepath = CloudRes.main.rootPath + "/Level/" + infoPlace.id + ".json";
        ResManager.LoadJson(
            {
                filepath: filepath,
                success: (p: any, data: any) => {
                    this.ParseGameItems(data);
                    if (obj.success != null) {
                        obj.success(this);
                    }
                },
                fail: () => {
                    if (obj.fail != null) {
                        obj.fail(this);
                    }
                },
            });


    }

    /*
    { 
    success: (p:any) => {
        
    }, 
    fail: (p:any) => {
        
    },
    }
    */
    StartParseGameItemsDefault(obj: any) {
        if ((this.listGameItemDefault != null) && (this.listGameItemDefault.length != 0)) {
            if (obj.success != null) {
                obj.success(this);
            }
            return;
        }

        var idx = 0;
        var infoPlace = LevelData.main.GetPlaceItemInfo(idx);
        var filepath = CloudRes.main.rootPath + "/Level/" + infoPlace.id + ".json";

        ResManager.LoadJson(
            {
                filepath: filepath,
                success: (p: any, data: any) => {
                    this.ParseGameItemsDefault(data);
                    if (obj.success != null) {
                        obj.success(this);
                    }
                },
                fail: () => {
                    if (obj.fail != null) {
                        obj.fail(this);
                    }
                },
            });



    }

    OnFinish(obj: any, isFail: boolean) {
        this.countLoad++;

        Debug.Log("GameLevelParse OnFinish this.countLoad=" + this.countLoad);
        if (this.countLoad >= this.loadMax) {

            if (isFail) {
                if (obj.fail != null) {
                    obj.fail(this);
                }
            } else {
                if (obj.success != null) {
                    obj.success(this);
                }
            }
        }
    }
    /*
   { 
   success: (p:any) => {
       
   }, 
   fail: (p:any) => {
       
   },
   }
   */
    StartParseGuanka(obj: any) {
        this.loadMax = 2;
        this.countLoad = 0;
        Debug.Log("GameLevelParse StartParseGuanka ");
        this.StartParseGameItems({
            success: (p: any) => {
                this.OnFinish(obj, false);
            },
            fail: (p: any) => {
                this.OnFinish(obj, true);
            },
        });
        this.StartParseGameItemsDefault({
            success: (p: any) => {
                this.OnFinish(obj, false);
            },
            fail: (p: any) => {
                this.OnFinish(obj, true);
            },
        });
    }


}


