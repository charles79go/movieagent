import { LightningElement, api} from 'lwc';
import { NavigationMixin } from "lightning/navigation";

export default class PersonCard extends NavigationMixin(LightningElement) {

    @api personObj;
    @api imageBaseUrl;
    image;
    name;
    showImage = false;

    connectedCallback() {

        if(this.personObj?.profile_path?.endsWith('.jpg')) {
            this.image  = this.imageBaseUrl + this.personObj.profile_path;
            this.showImage = true;
        } else {
            this.showImage = false;
        }

        this.name = this.personObj.name;
    }

    sendPersonDetailsFn(){

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'PersonDetail__c',
            },
            state: {
                personid: this.personObj.id,
            },
        });
    }

}