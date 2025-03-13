import { LightningElement } from 'lwc';
import tmdbApiKey from "@salesforce/label/c.tmdbApiKey";

export default class HomePage extends LightningElement {
    tmdbApiKey = tmdbApiKey;
}