import Debug from "../Debug";
import Device from "../Device";
import JsonUtil from "../File/JsonUtil";
import ConfigInternalBase from "./ConfigInternalBase";
 
 
export default class ConfigInternal extends ConfigInternalBase {
    GetAppIdOfStore(store: string) {
        Debug.Log("GetAppIdOfStore store=" + store);
        var appid = this.rootJson.APPID;
        var strid = "0";
        if (appid[store] != null) {
            strid = appid[store];
        }
        Debug.Log("GetAppIdOfStore appid= " + strid + " store=" + store);
        return strid;
    }

    GetString (key, def) { 
        return JsonUtil.GetItem(this.rootJson, key, def); 
    }
    GetBoll (key, def) { 
        return JsonUtil.GetItem(this.rootJson, key, def); 
    }
    GetCloudResUrl () { 
        var key = "url";
        if(Device.main.isLandscape)
        {
            key = "url_hd";
        }
        return JsonUtil.GetItem(this.rootJson.CloudRes, key, ""); 
    }

    GetCloudResVersionUrl () { 
        var key = "url_version";
        // if(Device.main.isLandscape)
        // {
        //     key = "url_version_hd";
        // }
        return JsonUtil.GetItem(this.rootJson.CloudRes, key, ""); 
    }



    GetShareUrl () { 
        var key = "url"; 
        return JsonUtil.GetItem(this.rootJson.Share, key, ""); 
    }

    GetShareTitle () { 
        var key = "title"; 
        return JsonUtil.GetItem(this.rootJson.Share, key, ""); 
    }
 

    IsHaveKey(key) {
        return JsonUtil.ContainsKey(this.rootJson, key); 
    }
  
} 