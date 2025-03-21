import { LightningElement, api } from 'lwc';

export default class PersonGroup extends LightningElement {
    @api groupTitle;
    @api imageBaseUrl;
    @api castArr;
}