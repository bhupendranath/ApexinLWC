import { LightningElement } from 'lwc';
import getAccountsList from '@salesforce/apex/AccountControllerLWC.getAccountsList';
export default class ApexImperativeDemo extends LightningElement {

    accounts

    handleClick(){
        // calling getAccountsList() apex method that returns a promise, so we can use then and catch to handle the response and error
        //this is a promise so we can use then and catch
        //if we have multiple params: .then((result)=>{...})
        getAccountsList().then(result=>{
            this.accounts = result
            //console.log('result',result)    
        }).catch(error=>{
            console.error('error',error)
        })
    }
}