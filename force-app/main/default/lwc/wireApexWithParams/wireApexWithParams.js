import { LightningElement, wire } from 'lwc';
import filterAccountType from '@salesforce/apex/AccountControllerLWC.filterAccountType';
export default class WireApexWithParams extends LightningElement {

    //Algo
    //1. On the first load it will check the param and will return accounts where type is empty string >> selectedType=''
    //2. Once the user selects the type from dropdown/combobox, onchange={typeHandler} will update the value of options={typeOptions} and will pass this updated value to:value={selectedType}
    //3. As soon as this property selectedType gets updated, this reactive property: {type:'$selectedType'} get to know that 
    // there is some change and wire fucntion get called again and it will return the filtered accounts based on the selected type

    selectedType=''       //initializing with empty String        

    @wire(filterAccountType, {type:'$selectedType'})        //filterAccountType( String type) this apex method "type:" should matched here
    filteredAccounts


    get typeOptions(){
        return [
            {label:'Customer - Channel', value:'Customer - Channel'},
            {label:'Customer - Direct', value:'Customer - Direct'}
        ]
    }

    typeHandler(event){
        this.selectedType=event.target.value
    }
}