import { Language } from "../../../../Common/Language/Language";
import { UIViewPop } from "../../../../Common/UIKit/PopUp/UIViewPop";
import UIImage from "../../../../Common/UIKit/UIImage/UIImage";
import UIText from "../../../../Common/UIKit/UIText/UIText";
import { UITouchEvent } from "../../../../Common/UIKit/UITouchEvent";
import { GameData, GameStatus } from "../../Data/GameData";
import { GameLevelParse } from "../../Data/GameLevelParse";
import { UIGameMerge } from "./UIGameMerge";

 
export default class UIPopProp extends UIViewPop {
    @type(UIText)
    textTitle: UIText | null = null;
    @type(UIText)
    textGuide0: UIText | null = null;

    @type(UIText)
    textGuide1: UIText | null = null;
    @type(UIText)
    textGuideSelect: UIText | null = null;
    @type(UIImage)
    imageIcon: UIImage | null = null;

    @type(UIImage)
    imageItem0: UIImage | null = null;
    @type(UIImage)
    imageItem1: UIImage | null = null;
    @type(UIImage)
    imageItem2: UIImage | null = null;
    @type(UIImage)
    imageItem3: UIImage | null = null;
    @type(UIImage)
    imageItem4: UIImage | null = null;
    @type(UIImage)
    imageSelect: UIImage | null = null;

    listItem: UIImage[] = [];

    @type(Node)
    objItemList: Node | null = null;
 

    type: PropType;
    indexSelect = 0;
    idChangeTo = "";
    onAwake() {
        super.onAwake();
        // return;
        this.listItem.push(this.imageItem0);
        this.listItem.push(this.imageItem1);
        this.listItem.push(this.imageItem2);
        this.listItem.push(this.imageItem3);
        this.listItem.push(this.imageItem4);

        for (var i = 0; i < this.listItem.length; i++) {
            {
                var info = GameLevelParse.main.GetLevelItemInfo(i);
                var pic = GameLevelParse.main.GetImagePath(info.id);
                var ui = this.listItem[i];
                ui.index = i;
                ui.id = info.id;
                var ev = ui.node.addComponent(UITouchEvent);
                ev.callBackTouch = this.OnUITouchEvent.bind(this);
                ui.UpdateImage(pic);
            }
        }
        this.LayOut();
    }
    onStart() {
        super.onStart();
        this.LayOut();
    }

    UpdateType(ty: PropType) {
        this.type = ty;
        this.objItemList.active = false;
        this.textGuideSelect.SetActive(false);
        this.textGuide1.SetActive(true);
        this.imageSelect.SetActive(false);

        var keyImageIcon = "";
        switch (this.type) {
            case PropType.Hammer:
                {
                    keyImageIcon = "Hammer";
                    this.textTitle.text = Language.main.GetString("Prop") + ":" + Language.main.GetString("Prop_Hammer");
                    this.textGuide0.text = Language.main.GetString("Prop_Hammer_Guide0");
                    this.textGuide1.text = Language.main.GetString("Prop_Hammer_Guide1");
                }
                break;
            case PropType.Magic:
                {
                    keyImageIcon = "Magic";
                    this.objItemList.active = true;
                    this.textGuideSelect.SetActive(true);
                    this.textGuide1.SetActive(false);
                    this.imageSelect.SetActive(true);

                    this.textTitle.text = Language.main.GetString("Prop") + ":" + Language.main.GetString("Prop_Magic");

                    this.textGuide0.text = Language.main.GetString("Prop_Magic_Guide0");
                    this.textGuide1.text = Language.main.GetString("Prop_Magic_Guide1");
                    this.textGuideSelect.text = this.textGuide1.text;

                }
                break;
            case PropType.Bomb:
                {
                    keyImageIcon = "BigBomb";
                    this.textTitle.text = Language.main.GetString("Prop") + ":" + Language.main.GetString("Prop_BigBomb");
                    this.textGuide0.text = Language.main.GetString("Prop_BigBomb_Guide0");
                    this.textGuide1.text = Language.main.GetString("Prop_BigBomb_Guide1");
                }
                break;
        }
        this.imageIcon.UpdateImageByKey(keyImageIcon);

        UIGameMerge.main.game.UpdateProp(keyImageIcon);
        this.LayOut();

        this.SetSelectImage(this.imageItem0);
    }

    OnUITouchEvent(ui: UITouchEvent, status: number, event?: EventTouch) {
        switch (status) {

            case UITouchEvent.STATUS_Click:
                {
                    var image = ui.node.getComponent(UIImage);
                    this.SetSelectImage(image);
                }
                break;

        }
    }

    SetSelectImage(ui: UIImage) {
        this.idChangeTo = ui.id;
        this.imageSelect.node.setPosition(ui.node.parent.getPosition());
        var scale =  1.15;
        this.imageSelect.node.scale = new Vec3(scale, scale, 1); 
    }
    LayOut() {
        super.LayOut(); 
    }


    OnClose() {
        this.Close();

    }
    OnClickBtnClose(event: Event, customEventData: string) {
        GameData.main.status = GameStatus.Play;
        this.OnClose();
    }
    OnClickBtnYes(event: Event, customEventData: string) {
        this.OnClose();
        UIGameMerge.main.game.ShowProp(true);
        UIGameMerge.main.OnGameProp(this, this.type);

    }
    OnClickBtnNo(event: Event, customEventData: string) {
        this.OnClickBtnClose(event, customEventData);
    }

}


