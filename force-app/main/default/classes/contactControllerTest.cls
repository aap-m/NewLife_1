@isTest
private class contactControllerTest {
    @isTest 
    static void TestGetContact(){
        Contact ContTest = new Contact(FirstName = 'Test1', Lastname = 'Test1');
        Insert ContTest;

        test.startTest();      
        List<Contact> str = new List<Contact>(contactController.getContact('Test1'));
        System.assertEquals(str.size(), 1);
        test.stopTest();
    }
    
    @isTest 
    static void TestMissContact(){
        Contact ContTest = new Contact(FirstName = 'Test1', Lastname = 'Test1');
        Insert ContTest;

        test.startTest();      
        List<Contact> str = new List<Contact>(contactController.getContact('Rest'));
        System.assertEquals(str.size(), 0);
        test.stopTest();
    }

    @isTest 
    static void TestNullContact(){

        test.startTest();      
        List<Contact> str = new List<Contact>(contactController.getContact(''));
        System.assertNotEquals(str.size(), null);
        test.stopTest();
    }
}