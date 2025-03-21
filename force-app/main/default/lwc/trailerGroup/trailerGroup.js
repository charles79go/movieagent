import { LightningElement, api } from 'lwc';

export default class TrailerGroup extends LightningElement {
    @api groupTitle;
    @api trailerArr;
}