import Platform from "../Platform"; 
import FileSystemWeixin from "../Platform/weixin/File/FileSystemWeixin";
import FileSystemPlatformWrapper from "./FileSystemPlatformWrapper";

 

 
export default class FileSystem  { 

    platform:FileSystemPlatformWrapper;
    static _main: FileSystem;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new FileSystem();
            this._main.Init();
        }
        return this._main;
    }
    GetPlatform () {
        var p = null;
        if (Platform.isWeiXin) {
            p = new FileSystemWeixin();
        }
        if (Platform.isByte) {
            p = new FileSystemWeixin();
        }
        if (Platform.isQQ) {
            p = new FileSystemWeixin();
        } 
        return p;
    }
    Init () { 
        this.platform = this.GetPlatform();
    }

    GetRootDirPath () {
        if (this.platform == null) {
            return "";
        }
        return this.platform.GetRootDirPath();
    }

    /*
             filePath: obj.filePath,
                success (res) {
                }.bind(this),
                fail (res) {
                }.bind(this),
 */

    ReadFile (obj) {
        if (this.platform == null) {
            return;
        }
        this.platform.ReadFile(obj);
    }
    WriteFile (obj) {
        if (this.platform == null) {
            return;
        }
        this.platform.WriteFile(obj);
    }

    /*
          zipFilePath: obj.zipFilePath,
            targetPath: obj.targetPath,
            success (res) { 
            }.bind(this),
            fail (res) { 
            }.bind(this),
*/

    UnzipFile (obj) {
        if (this.platform == null) {
            return;
        }
        this.platform.UnzipFile(obj);
    }

    /*
    {

            // url: "https://6d6f-moonma-dbb297-1258816908.tcb.qcloud.la/ShapeColor/CloudRes.zip?sign=e78a71df50918d8ee0e181886b20c12f&t=1555465442",
            url: url,
            success (res) {
                var filePath = res.tempFilePath; 
            }.bind(this),
            fail (res) { 
            }.bind(this),
            progress (res) {
                console.log('下载进度', res.progress)
                console.log('已经下载的数据长度', res.totalBytesWritten)
                console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite) 
            }.bind(this),
            

        }
 */

    DownloadFile (obj) {
        if (this.platform == null) {
            return;
        }
        this.platform.DownloadFile(obj);
    }

    DeleteFile (filepath) {
        if (this.platform == null) {
            return;
        }
        this.platform.DeleteFile(filepath);
    }
 
}
 
