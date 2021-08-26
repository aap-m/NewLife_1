import { LightningElement} from 'lwc';
import getContact from '@salesforce/apex/contactController.getContact';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';

const actions = [
    { label: 'Delete', name: 'delete' },
];

const columns = [{
    label: 'First name',
    fieldName: 'ConFirstName',
    type: 'url',

    typeAttributes: {
        label: {
            fieldName: 'FirstName'
        },
        target: '_blank'
    }
},
{
    label: 'Last name',
    fieldName: 'LastName',
    type: 'text',
},
{
    label: 'Email',
    fieldName: 'Email',
    type: 'email',
},
{
    label: 'AccountId',
    fieldName: 'AccountId',
    type: 'text',
},
{
    label: 'Mobile Phone',
    fieldName: 'MobilePhone',
    type: 'phone',
},
{
    label: 'Created Date',
    fieldName: 'CreatedDate',
    type: 'date',
    typeAttributes: {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }
},
{
    type: "button",
    typeAttributes: { 
        label: 'Delite',
        title: 'Delite',
        name: 'Delite',
        value: 'Delite',
        variant: 'brand',
        rowActions: actions },
    },
];

export default class DataTable extends LightningElement {
    columns = columns;
    contact;
    wordKey = '';
    isOpenModal = false;
    delId;

    handleKeyClick(event) {
        this.wordKey = event.target.value;
    }

    handleFilterClick() {
        getContact({ searchKey: this.wordKey })
            .then(result => {
                const data = result;
                this.contact = data;
                let NameUrl = data;
                        
                let ConList = [];
                NameUrl.forEach(record => {
                    let ConRec = Object.assign({}, record);
                    ConRec.ConFirstName = 'https://' + location.host + '/lightning/r/Contact/' + ConRec.Id + '/view';
                    ConList.push(ConRec);
                });
            this.contact = ConList;
            })
    }

    handleRowAction(event) {
        this.isOpenModal = true;
        const rowId = event.detail.row.Id;
        this.delId = rowId;
    }
        
    closeModal() {
        this.isOpenModal = false;
    }

    deliteContact() {
        deleteRecord(this.delId)
            .then(result=> {
                this.dispatchEvent(new ShowToastEvent({
                    title:'Contact Deleted',
                    message:'Contact deleted successfully',
                    variant:'success',
                }))
                this.handleFilterClick(); 
            })
        this.isOpenModal = false;
    }

    handleSuccess(){      
        this.handleFilterClick();
    }
}