import { LightningElement } from 'lwc';
import { NavigationMixin } from "lightning/navigation";

export default class Header extends NavigationMixin(LightningElement) {

    query = '';

    onChangeQueryFn(e) {
        this.query = e.target.value
    }

    goToHomePageFn() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Home',
            }
        });
    }

    goToSearchPageFn() {

        this.query = this.query ? this.query?.trim() : '';

        if(this.query === '') return;

        if(this.query.length < 3) return;

        let sendQuery = this.query.trim();
        this.query = '';

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'SearchPage__c',
            },
            state: {
                searchQuery: sendQuery,
            },
        });
    }

    keyupFn(event) {
        if(event.keyCode === 13) this.goToSearchPageFn();
    }
}