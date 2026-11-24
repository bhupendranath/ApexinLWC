public with sharing class RefreshContactControllerLWC {
    
    //If we are not doing any DML operation(Insert, Update, Delete) then we can use cacheable=true for better performance
    @AuraEnabled(cacheable=true) //if we are performing get operation then its better to use cacheable=true
    public static List<Contact> getContactList(){
        return [SELECT Id, FirstName, LastName, Email FROM Contact LIMIT 10];
    }
}