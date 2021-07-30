import Common from "../Common";
import Config from "../Config/Config";
import Debug from "../Debug";
import Source from "../Source";
import AppVersionBase from "./AppVersionBase";
import HuaweiAppGalleryApi from "./HuaweiAppGalleryApi";



export default class AppVersionHuawei extends AppVersionBase {

    static _main: AppVersionHuawei;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new AppVersionHuawei();
            // this._main.Init();
        }
        return this._main;
    }

    /*
   { 
     appid:"",
     success: (p:any,version:string) => {
         
     }, 
     fail: (p:any) => {
         
     },
   }
   */
    StartParseVersion(obj: any) {
        // return await StartParseVersionOld();
        // StartParseVersionOld();
        // return; 
        var strappid = Config.main.GetAppIdOfStore(Source.HUAWEI);

        var url = "https://appgallery1.huawei.com/#/app/C" + strappid;
        Debug.Log("version huawei url=" + url);
        this.strUrlAppstore = url;

        Debug.Log("version huawei url2=" + url);
        // HttpRequest http = new HttpRequest(OnHttpRequestFinished);
        // http.Get(url);


        if (Common.GetAppVersion() == "1.0.0") {
            this.isFirstCreat = true;
        }



        HuaweiAppGalleryApi.main.StartParseVersion(
            {
                appid: strappid,
                success: (p: any, version: string) => {
                    Debug.Log("appversion = " + version);
                    this.strVersionStore = version;
                    this.ParseFinished(this);

                    Debug.Log("version huawei Task strVersionStore=" + this.strVersionStore);


                    if (!this.appNeedUpdate) {
                        // 再判断taptap
                    }

                },
                fail: (p: any) => {
                    this.strVersionStore = "1.0.0";
                    this.ParseFinished(this);
                },
            }
        );


    }

    GetAppVersionAPI(appid) {
        // Debug.Log("Task GetVersion start");
        // string ret = await HuaweiAppGalleryApi.main.GetVersion("103066765");
        // Debug.Log("Task GetVersion end ret=" + ret);
    }

    ParseData(data) {


    }


}



