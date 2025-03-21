import { LightningElement, api } from 'lwc';

export default class TrailerCard extends LightningElement {

    @api trailerObj;
    trailerImage;

    connectedCallback() {
        this.trailerImage = `https://i.ytimg.com/vi/${this.trailerObj.key}/hqdefault.jpg`;
    }

    playTrailerFn(){

        this.dispatchEvent(new CustomEvent('playtrailer',{detail: this.trailerObj.key, bubbles:true, composed:true}));
    }

}