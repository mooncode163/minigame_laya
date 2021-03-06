 
  
import GameLevelParse from "../../Apps/Main/GameLevelParse";
import Debug from "../../Common/Debug";
// import GameViewController from "./GameViewController";
import LevelData from "./LevelData";
import LevelParseBase from "./LevelParseBase";

 

 
export default class LevelManager  {

    placeLevel = 0;
    objGuanka=null;
    static _main: LevelManager;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new LevelManager();
        }
        return this._main;
    }
 
    get maxGuankaNum() {
        var ret = GameLevelParse.main.GetGuankaTotal();
        return ret;
        return 0;
    } 
    Init() {
        //this.ParseGuanka();
    }



    CleanGuankaList() {
        GameLevelParse.main.CleanGuankaList();
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
        this.objGuanka = obj;
        this.CleanGuankaList();
        // GameViewController.main.gameBase.StartParseGuanka(callback);
        GameLevelParse.main.StartParseGuanka(obj);
    }


     /*
{ 
success: (p:any) => {
    
}, 
fail: (p:any) => {
    
},
}
*/
    //place 
    StartParsePlace(obj: any) {
        //GameViewController.main.gameBase.StartParsePlaceList(callback);
        GameLevelParse.main.StartParsePlaceList(obj);
    }



    GotoPreLevel() {

        LevelData.main.gameLevel--;
        if (LevelData.main.gameLevel < 0) {
            this.GotoPrePlace();
            return;

        }
        // GameManager.GotoGame();
        // GameViewController.main.gameBase.UpdateLevel(LevelData.main.gameLevel);

    }

    GotoNextLevel() {
        Debug.Log("gameLevel=" + LevelData.main.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
        LevelData.main.gameLevel++;
        Debug.Log("gameLevel=" + LevelData.main.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
        if (LevelData.main.gameLevel >= this.maxGuankaNum) {
            Debug.Log("GotoNextPlace:gameLevel=" + LevelData.main.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
            this.GotoNextPlace();
            return;

        }
        // GameViewController.main.gameBase.UpdateLevel(LevelData.main.gameLevel);

    }


    GotoNextPlace() {

        this.placeLevel++;

        if (this.placeLevel >= LevelData.main.placeTotal) {
            this.placeLevel = 0;

        }
        //必须在placeLevel设置之后再设置gameLevel
        LevelData.main.gameLevel = 0;

        this.StartParseGuanka(this.objGuanka);
        // GameViewController.main.gameBase.UpdateLevel(LevelData.main.gameLevel);

    }

    GotoPrePlace() {

        this.placeLevel--;
        if (this.placeLevel < 0) {
            this.placeLevel = LevelData.main.placeTotal - 1;

        }
        //必须在placeLevel设置之后再设置gameLevel
        LevelData.main.gameLevel = 0;

        this.StartParseGuanka(this.objGuanka);
        // GameViewController.main.gameBase.UpdateLevel(LevelData.main.gameLevel);

    }
    //关卡循环
    GotoNextLevelWithoutPlace() {
        Debug.Log("gameLevel=" + LevelData.main.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
        LevelData.main.gameLevel++;
        Debug.Log("gameLevel=" + LevelData.main.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
        if (LevelData.main.gameLevel >= this.maxGuankaNum) {
            LevelData.main.gameLevel = 0;

        }
        // GameViewController.main.gameBase.UpdateLevel(LevelData.main.gameLevel);

    }

    //return List<object>
    GetGuankaListOfAllPlace() {
        var listRet;// = new List<object>();
        Debug.Log("GetGuankaListOfAllPlace placeTotal=" + LevelData.main.placeTotal);
        for (var i = 0; i < LevelData.main.placeTotal; i++) {
            this.placeLevel = i;
            //必须在placeLevel设置之后再设置gameLevel
            LevelData.main.gameLevel = 0;
            this.StartParseGuanka(this.objGuanka);
            // if (UIGameBase.listGuanka == null) {
            //     Debug.Log("listGuanka is null");
            // }
            // else {
            //     foreach(object obj in UIGameBase.listGuanka)
            //     {
            //         listRet.Add(obj);
            //     }
            // }


        }
        return listRet;

    }
}


