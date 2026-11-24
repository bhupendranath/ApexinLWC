import { LightningElement } from 'lwc';
import findAccounts from '@salesforce/apex/AccountControllerLWC.findAccounts';
export default class ApexImperativeWithParams extends LightningElement {

    searchKey=''
    accounts
    timer

    searchHandler(event){
        window.clearTimeout(this.timer) //clear the timer if it is already set
        this.searchKey=event.target.value
        //here we will call apex method on the searchKey itself
        //here search_Key is the apex parameter once it success then it will return the result via then()

        //to use *** debouncing *** we can use setTimeout and clearTimeout to avoid calling apex method on every key stroke
        //and we will create seperate method
        /*findAccounts({search_Key:this.searchKey}).then(result=>{
            this.accounts = result
        }).catch(error=>{
            console.error(error)
        })*/

        //debouncing : delaying the excecution of a function until a certain amount of time has passed since the last time it was invoked
        this.timer = setTimeout(()=>{
                    this.callApex()
                    }, 1000)
    }

    callApex(){
        findAccounts({search_Key:this.searchKey}).then(result=>{
            this.accounts = result
        }).catch(error=>{
            console.error(error)
        })
    }
}