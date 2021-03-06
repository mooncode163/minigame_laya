import Common from "../Common";
import ConfigBase from "../Config/ConfigBase";
import LanguageInternal from "../Language/LanguageInternal";

 
 
export default class LanguageCloudRes extends ConfigBase { 
    languageCommon: LanguageInternal = null; 

 

    static _main: LanguageCloudRes;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new LanguageCloudRes();
            this._main.Init();
        }
        return this._main;
    }


    Init() {
        

        {
            var strDir = Common.RES_CONFIG_DATA_COMMON + "/language";
            var fileName = "language_cloudres.csv";
            {
                this.languageCommon = new LanguageInternal();
                this.languageCommon.fileJson = strDir + "/" + fileName;
                this.listItem.push(this.languageCommon);
            }
        }
 
    }


    SetLanguage(lan: any) {
        
        if (this.languageCommon != null) {
            this.languageCommon.SetLanguage(lan);
        }
    }

    GetLanguage() {
        if (this.languageCommon != null) {
            return this.languageCommon.GetLanguage();
        }
    }
    GetString(key: string) { 
        var str = "";
       
        if (str == "") {
            if (this.languageCommon != null) {
                str = this.languageCommon.GetString(key);
            }
        }

        return str;

    }


    //
    GetReplaceString(key: string, replace: string, strnew: string) {
        // string str = GetString(key);
        // str = str.Replace(replace, strnew);
        // return str;
    }

    IsContainsKey(key: string) { 
        var ret = true; 

        if (!ret) {
            if (this.languageCommon != null) {
                ret = this.languageCommon.IsContainsKey(key);
            }
        }
        return ret;
    }

}


