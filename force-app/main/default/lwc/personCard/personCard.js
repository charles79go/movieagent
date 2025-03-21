import { LightningElement, api} from 'lwc';

export default class PersonCard extends LightningElement {

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

}