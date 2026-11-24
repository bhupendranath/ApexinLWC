import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/RefreshContactControllerLWC.getContactList';
import {updateRecord} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';   //we want to refresh our component once updation is done
//column is static so we can define it outside the class
//fieldName: apiName of the field in the object, label: column header name
//editable: if we want to make the column editable then we can set it to true
//email is special type of field so we can use it as email type in the datatable
//Type: if we don't define type the by default it will be text type
const column_s = [
    {label:'First Name', fieldName:'FirstName', editable:true},
    {label:'Last Name', fieldName:'LastName', editable:true},
    {label:'Email', fieldName:'Email', type:'email'}
]
export default class RefreshApexDemoLWC extends LightningElement {

    //creating some private properties to hold the data and columns for the datatable
    columns = column_s

    draftValues=[]

    //contactResult = null

    @wire(getContactList)
    contacts;                // this is first property that holds data

    //When we use: wire as function instead of property to explain refresh apex
    //refresh apex: refresh apex basically hold/refer ----first referemnce of the property (that hold the data)----
    /*
    @wire(getContactList)
    conatcts(result){
        contactResult = result    // I can use this ref to the refresh apex: Ex. return refreshApex(contactResult)
        const {data, value} = result
    }*/

    /*
    get isContactAvailable(){
        console.log(JSON.stringify(this.contacts))
        return this.contacts && this.contacts.data && this.contacts.data.length>0 ? 'Yes' : 'No'
    }*/

    handleSave(event){
        console.log(event.detail.draftValues)

        //event.detail.draftValues.slice(): this will give us new copy of the object
        //slice(): Slice is immutable method and it generate new copy of the objects that we are getting as arrays and will loop that
        const recordInputs = event.detail.draftValues.slice().map(draft=>{
                    //Object.assign({}) : is way to create new object
                    //Object.assign({},draft) : is way to create new object and assign it to: draft
                    const fields = Object.assign({},draft)
                    return {fields}
                })

                console.log("RecordInput:", recordInputs)
         
        //once get the input we need to call the update method: and it update 1 record at time, hence we'll use loop
        //And we'll use map to loop it and it is async approach so we'll use promises
        //we will run the loop over each recordInput
        //updateRecord(recordInput): this updateRecord() will takes the each recordInput (like, FirstName, LastName, Email etc)
        //like this will loop it and it returns array of promises and we'll store these promises into: Const promises
        const promises  = recordInputs.map(recordInput=>updateRecord(recordInput))

        //Once we have all the promises, we call Promise.all() method
        //Once all the promises are resolved means all the fields are updated, then(): returns the success
        //to hold that success we use then() method, and we get all the results
        Promise.all(promises).then(resutl=>{
                this.showToastMsg('Success', 'Contacts updated')
                this.draftValues = [] //once updation is done now we're clearing the draft value to an empty array
                
                //also,we want to refresh our component once updation is done
                //refreshApex: it refers to the first property which holds data
                return refreshApex(this.contacts)        //this is from wire contacts: it should always be the first property that holds data

        }).catch(error=>{
                this.showToastMsg('Error updating record', error.body.message, error)
        })
    }

    showToastMsg(title,message,variant){
        this.dispatchEvent(
                new ShowToastEvent({
                      title:title,
                      message:message,
                      variant:variant || 'success'
                })
            )
    }
}