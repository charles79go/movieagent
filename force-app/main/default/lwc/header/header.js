import { LightningElement, api } from 'lwc';
import { NavigationMixin } from "lightning/navigation";

export default class Header extends NavigationMixin(LightningElement) {
    @api tmdbApiKey;

    goToHomePageFn() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Home',
            }
        });
    }
}