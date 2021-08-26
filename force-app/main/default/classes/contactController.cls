public with sharing class contactController {
    
    @AuraEnabled(cacheable=false)
    public static List<Contact> getContact( String searchKey) {
        String key = '%' + searchKey + '%';
        List<Contact> contList = [SELECT Id, FirstName, LastName, Email, AccountId, MobilePhone, CreatedDate 
                                FROM Contact 
                                WHERE FirstName 
                                LIKE :key];
        return contList;
    }
}
