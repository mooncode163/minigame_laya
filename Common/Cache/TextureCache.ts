import ImageRes from "../Config/ImageRes";
import Debug from "../Debug";
import Dictionary from "../Dictionary";
import ResManager from "../Res/ResManager";

export default class TextureCache {
    dicItem: any;
    static _main: TextureCache;
    //静态方法
    static get main() {
        console.log("TextureCache Main");
        if (this._main == null) {
            this._main = new TextureCache();
            this._main.Init();
        }
        return this._main;
    }
    Init() {
        this.dicItem = new Dictionary();
    }
    GetTextureFromCache(filepath:string) {
        var key = filepath;
        if (this.dicItem.Contains(key) == true) {
            var tex = this.dicItem.Get(key);
            return tex;
        }  
        return null;
    }
    GetTextureFromCacheByKey(key:string) { 
        var pic = ImageRes.main.GetImage(key);
        if (this.dicItem.Contains(pic) == true) {
            var tex = this.dicItem.Get(pic);
            return tex;
        }  
        return null;
    }
    /*
{ 
     filepath:"", 
     isCloud:false,
     isSprite:false,
  success: (p:any,tex:Texture2D) => {
      
  }, 
  fail: (p:any) => {
      
  },
}
*/
    Load(obj: any) {
        var key = obj.filepath;
        if (this.dicItem.Contains(key) == true) {
            var tex = this.dicItem.Get(key);
            Debug.Log("TextureCache  load  from cache key=" + key);
            if (obj.success != null) {
                obj.success(this, tex);
            }
        } else {
            this.LoadNotCache(obj);
        }


    }

    /*
{ 
     key:"", 
     isCloud:false,
     isSprite:false,
  success: (p:any,tex:Texture2D) => {
      
  }, 
  fail: (p:any) => {
      
  },
}
*/
    LoadByKey(obj: any) {
        var key = obj.key;
        var pic = ImageRes.main.GetImage(key);
        this.Load(
            {
                filepath: pic,
                isCloud: obj.isCloud,
                isSprite: obj.isSprite,
                success: (p: any, tex: Laya.Texture2D) => {
                    if (obj.success != null) {
                        obj.success(this, tex);
                    }
                },
                fail: (p: any) => {
                    if (obj.fail != null) {
                        obj.fail(this);
                    }
                },
            });


    }



    /*
   { 
    listKey:["",""], 

    //listData: [Texture2D]
   success: (p:any,listData:any) => {
       
   },   
  fail: (p:any) => {
      
  },
   }
   */
    LoadListByKey(obj: any) {
        var countLoad = 0;
        var listData: any[] = [];

        obj.listKey.forEach((key) => {
            this.LoadByKey(
                {
                    key: key,  
                    success: (p: any, tex: Laya.Texture2D) => { 
                        listData.push(tex);
                        countLoad++;
                        if ((countLoad >= obj.listKey.length) && (listData.length == obj.listKey.length)) {
                            if (obj.success != null) {
                                obj.success(this, listData);
                            }
                        }

                    },
                    fail: (p:any) => {
                        countLoad++;
                        if (countLoad >= obj.listKey.length) {
                            if (obj.fail != null) {
                                obj.fail(this);
                            }
                        }

                    },
                });
        });


    }

    LoadFrame(obj: any) {

    }

    /*
{ 
   filepath:"", 
   isCloud:false,
     isSprite:false,
success: (p:any,tex:Texture2D) => {
    
}, 
fail: (p:any) => {
    
},
}
*/
    LoadNotCache(obj: any) {
        // if(obj.isCloud)
        // {
        //     this.LoadWithCloud(obj);
        //     return;
        // }


        ResManager.LoadTexture(
            {
                filepath: obj.filepath,
                isSprite: obj.isSprite,
                success: (p: any, tex: any) => {
                    var key = obj.filepath;
                    this.dicItem.Add(key, tex);
                    if (obj.success != null) {
                        obj.success(this, tex);
                    }
                },
                fail: (p: any) => {
                    if (obj.fail != null) {
                        obj.fail(this);
                    }
                    // if(obj.isCloud)
                    // {
                    //     this.LoadWithCloud(obj);
                    // }
                },
            });

    }


    /*
{ 
filepath:"", 
isCloud:false,
success: (p:any,tex:Texture2D) => {
 
}, 
fail: (p:any) => {
 
},
}
*/
    LoadWithCloud(obj: any) {

        if (obj.isCloud) {
            ResManager.LoadTexture(
                {
                    filepath: obj.filepath,
                    success: (p: any, tex: any) => {
                        var key = obj.filepath;
                        this.dicItem.Add(key, tex);
                        if (obj.success != null) {
                            obj.success(this, tex);
                        }
                    },
                    fail: (p: any) => {
                        if (obj.fail != null) {
                            obj.fail(this);
                        }
                    },
                });
        } else {

            ResManager.LoadTexture(
                {
                    filepath: obj.filepath,
                    success: (p: any, tex: any) => {
                        var key = obj.filepath;
                        this.dicItem.Add(key, tex);
                        if (obj.success != null) {
                            obj.success(this, tex);
                        }
                    },
                    fail: (p: any) => {
                        if (obj.fail != null) {
                            obj.fail(this);
                        }
                    },
                });

        }
    }


}


