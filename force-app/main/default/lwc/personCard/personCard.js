import { LightningElement, api} from 'lwc';

export default class PersonCard extends LightningElement {

    @api personObj;
    @api imageBaseUrl;
    image;
    name;

    connectedCallback() {
        this.image = `${this.imageBaseUrl}${this.personObj.profile_path}`;
        this.name = this.personObj.name;
    }

}