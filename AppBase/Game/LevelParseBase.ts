import CloudRes from "../../Common/CloundRes/CloudRes";
import Common from "../../Common/Common";
import Debug from "../../Common/Debug";
import JsonUtil from "../../Common/File/JsonUtil";
import ItemInfo from "../../Common/ItemInfo";
import ResManager from "../../Common/Res/ResManager";
import LevelData from "./LevelData";

 

 
export default class LevelParseBase  {
    public static PLACE_ITEM_TYPE_NONE = "none";
    public static PLACE_ITEM_TYPE_VIDEO = "video";
    public static PLACE_ITEM_TYPE_LOCK = "lock";
    
    listGuanka:ItemInfo[]=[];
    listGuankaItemId:ItemInfo[]=[];
    autoGuankaOneGroupCount=5;
 
    // static _main: LevelParseBase;
    // //静态方法
    // static get main() {
    //     if (this._main == null) {
    //         this._main = new LevelParseBase();
    //     }
    //     return this._main;
    // }


    Init () {
    }


    CleanGuankaList () {
        if (this.listGuanka != null) {
            this.listGuanka.splice(0, this.listGuanka.length);
        }
    }
    GetGuankaTotal () {
        // var count = this.ParseGuanka();
        var count = 0;
        if (this.listGuanka != null) {
            count = this.listGuanka.length;
        }
        return count;
    }
    //ItemInfo
    GetLevelItemInfo (idx) {
        if (this.listGuanka == null) {
            return null;
        }
        if (idx >= this.listGuanka.length) {
            return null;
        }
        var info = this.listGuanka[idx];
        // Debug.Log("UIGameCaiCaiLe GetLevelItemInfo idx=" + idx + " info=" + info);
        return info;
    }

     

  

        /*
      {
        filepath:"", 
        success: (p:any) => {
            
        }, 
        fail: (p:any) => {
            
        },
      }
      */

    StartParsePlaceList (obj:any) {
        var filepath = CloudRes.main.rootPath + "/place/place_list.json";
        Debug.Log("StartParsePlaceList ");
        ResManager.LoadJson(
            {
                filepath: filepath,
                success: (p: any, data: any) => {
                    this.ParsePlaceList(data);
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
    ParsePlaceList (json:any) {
        Debug.Log("StartParsePlaceList ParsePlaceList");
        if (( LevelData.main.listPlace != null) && ( LevelData.main.listPlace.length != 0)) {
            Debug.Log("StartParsePlaceList not 0");
            // if (this.callbackPlaceFinish != null) {
            //     Debug.Log("StartParsePlaceList callbackPlaceFinish length = " +  LevelManager.main.listPlace.length);
            //     this.callbackPlaceFinish();
            // }
            return;
        }
        var items = json.items;
        for (var i = 0; i < items.length; i++) {
            var info = new ItemInfo();
            var item = items[i];

            info.id = JsonUtil.GetItem(item, "id", "");
            info.gameType = JsonUtil.GetItem(item, "game", "");
            Debug.Log("place id = " + info.id);
            info.type = JsonUtil.GetItem(item, "type", "");

            // var dirRoot = cc.Common.CLOUD_RES_DIR;
            // if (cc.Common.main().isWeiXin) {
            //     dirRoot = cc.FileSystemWeixin.main().GetRootDirPath() + "/" + cc.Common.CLOUD_RES_DIR_NAME;
            // }
            var dirRoot = CloudRes.main.rootPath;
            info.pic = dirRoot + "/place/image/" + info.id + ".png";

            info.title = JsonUtil.GetItem(item, "title", "STR_PLACE_" + info.id);
            //info.icon = info.pic;
            info.language = JsonUtil.GetItem(item, "language", "language");
            // info.index = i;

            info.isAd = false;
            //if (AppVersion.appCheckHasFinished && (!Common.noad)) 
            {
                if (info.type == LevelParseBase.PLACE_ITEM_TYPE_VIDEO) {
                    info.isAd = true;
                }
                {
                    if (info.type == LevelParseBase.PLACE_ITEM_TYPE_LOCK) {
                        info.isAd = true;
                    }
                }
            }

            LevelData.main.listPlace.push(info);
        }

        // if (this.callbackPlaceFinish != null) {
        //     Debug.Log("StartParsePlaceList callbackPlaceFinish length = " +  LevelManager.main.listPlace.length);
        //     this.callbackPlaceFinish();
        // }
    }
    // StartParseGuanka(obj:any) { 
    //     var idx =  LevelData.main.placeLevel;
    //     var infoPlace =  LevelData.main.GetPlaceItemInfo(idx);
    //     //var filepath = cc.Common.GAME_RES_DIR + "/guanka/item_Bird" + ".json";//+ infoPlace.id 
    //     var filepath = Common.GAME_RES_DIR + "/guanka/item_" + infoPlace.id;// + ".json";//
   
    //     ResManager.LoadJson(
    //         {
    //             filepath: filepath,
    //             success: (p: any, data: any) => {
    //                 this.ParseGuanka(data);
    //                 // if (obj.success != null) {
    //                 //     obj.success(this, data);
    //                 // }
    //             },
    //             fail: () => {
    //                 // if (obj.fail != null) {
    //                 //     obj.fail(this);
    //                 // }
    //             },
    //         }); 
    // }


 


    ParseGuanka(data:any) { 
    }

 

    LoadGuankaItemId(cbFinish) {
        var idx =  LevelData.main.placeLevel;
        var infoPlace =  LevelData.main.GetPlaceItemInfo(idx);
       // this.callbackGuankaIdFinish = cbFinish;
        // var filepath = cc.CloudRes.main().rootPath + "/guanka/item_" + infoPlace.id + ".json";
        var filepath = Common.GAME_RES_DIR + "/guanka/item_" + infoPlace.id + ".json";

 
        ResManager.Load(
            {
                filepath: filepath,
                success: (p: any, data: any) => { 
                    // this.LoadGuankaItemIdFinish(err, data.json);
                    // if (obj.success != null) {
                    //     obj.success(this, data);
                    // }
                },
                fail: () => {
                    // if (obj.fail != null) {
                    //     obj.fail(this);
                    // }
                },
            }); 
    }

    LoadGuankaItemIdFinish(err, rootJson) {
        if (err) {
            // return;
            Debug.Log("LoadGuankaItemIdFinish error:this.listGuanka=");
        }
        if (err == null) {
            if (rootJson.json == null) {
                this.ParseGuankaItemId(rootJson);
            } else {
                //resource里的json文件
                this.ParseGuankaItemId(rootJson.json);
            }
        }
    }

    ParseGuankaItemId(rootJson) {
        // Debug.Log("ParseGuankaItemId:this.listGuanka=");
        //         //search_items
        var idx =  LevelData.main.placeLevel;
        var infoPlace =  LevelData.main.GetPlaceItemInfo(idx);
        var picRoot = CloudRes.main.rootPath + "/image/" + infoPlace.id + "/";

        //clear
        if (this.listGuankaItemId != null) {
            this.listGuankaItemId.length = 0;
        }

        var items = rootJson.items;

        for (var i = 0; i < items.length; i++) {

            var item = items[i];
            var info = new ItemInfo();
            info.id = JsonUtil.GetItem(item, "id", "");
            info.pic = picRoot + info.id + ".png";
            this.listGuankaItemId.push(info);
        }


        //让总数是count_one_group的整数倍
        var count_one_group = this.autoGuankaOneGroupCount;
        var tmp = (this.listGuankaItemId.length % count_one_group);
        if (tmp > 0) {
            for (var i = 0; i < (count_one_group - tmp); i++) {
                var infoId = this.listGuankaItemId[i];
                var info = new ItemInfo();
                info.id = infoId.id;
                info.pic = infoId.pic;
                this.listGuankaItemId.push(info);
            }
        }

        //   Debug.Log("ParseGuankaItemId:this.listGuanka=end");
        // if (this.callbackGuankaIdFinish != null) {
        //     // Debug.Log("ParseGuankaItemId:this.listGuanka=callbackGuankaIdFinish");
        //     this.callbackGuankaIdFinish();
        // }
    }

}


