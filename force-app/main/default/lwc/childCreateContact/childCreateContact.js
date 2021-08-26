import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ACCOUNTID_FIELD from '@salesforce/schema/Contact.AccountId';
import MOBILEPHONE_FIELD from '@salesforce/schema/Contact.MobilePhone';


export default class ChildCreateContact extends LightningElement {
    isOpenModal = false;
    objectApiName = CONTACT_OBJECT;
    fields = [FIRSTNAME_FIELD, LASTNAME_FIELD, EMAIL_FIELD, ACCOUNTID_FIELD, MOBILEPHONE_FIELD];

    handleSuccess(){
        const toastEvent = new ShowToastEvent({
            title: 'Contact created',
            message: 'Contact created successfully',
            variant: 'success',
        })
        this.dispatchEvent(toastEvent);
        this.isOpenModal = false;
        this.dispatchEvent(new CustomEvent('next'));
    }

    openModal() {
        this.isOpenModal = true;
    }
    
    closeModal() {
        this.isOpenModal = false;
    }
}