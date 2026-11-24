public with sharing class AccountControllerLWC {
    
    @AuraEnabled(cacheable=true) //if we are performing get operation then its better to use cacheable=true
    public static List<Account> getAccountsList(){
        return [SELECT Id, Name, Type, Industry from Account LIMIT 5];
    }

    //Apex Method with Parameter
    //UseCase: from LWC we will pass(Or we'll search) the Type and based that searched type we will return AccountList

    @AuraEnabled(cacheable=true) //if we are performing get operation then its better to use cacheable=true
    public static List<Account> filterAccountType( String type){
        return [SELECT Id, Name, Type from Account where Type=:type LIMIT 5];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts(String search_Key){
         String key = '%' + search_Key + '%';
         return [SELECT Id, Name, Type, Industry from Account WHERE Name LIKE : key LIMIT 5]; 
    }
}