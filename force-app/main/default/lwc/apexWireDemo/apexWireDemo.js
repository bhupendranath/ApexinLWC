import { LightningElement, wire } from 'lwc';
import getAccountsList from '@salesforce/apex/AccountControllerLWC.getAccountsList';
export default class ApexWireDemo extends LightningElement {

    accountsList           //its no initialize which means is undefined, once the wire method is called it will be initialized with the response from apex method

    @wire(getAccountsList)   //here we dont have parameters so we can directly call the method
    accounts               //once the response comes it will store into a property accounts

    //now we have to transform the data where we have to account in which Type=Customer-Channel
    //real use case for using wire with a function is when we have to transform the data
    @wire(getAccountsList)
    accountsHandler({data,error}){
        if(data){
            this.accountsList=data.map(item=>{
                let newType = item.Type === 'Customer - Channel'? 'Channel' :
                item.Type === 'Customer - Direct'? 'Direct' : '--------------';
                return {...item, newType}       //return all the field as it is and add new property newType
            })
        }
        if(error){
            console.error(error);
        }
    }
}

