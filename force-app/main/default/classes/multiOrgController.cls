public with sharing class multiOrgController {
    public static String dummyDataCases='[{"owner":"Natalie Alexander","systemId":"test_id","createdDate":"2022-06-28","organizationName":"Agency Org","caseNumber":"00001183","subject":"Cant understand installation instructions","recordType":"0128a0000019S1MAAU","caseId":"00001183","priority":"Medium","status":"New"},{"owner":"Atticus Green","systemId":"test_id","createdDate":"2022-08-25","organizationName":"Agency Org","caseNumber":"00002078","subject":"Im having a billing issue","recordType":"0128a0000019S19AAE","caseId":"00002078","priority":"Medium","status":"Closed"},{"owner":"Dorian Garcia","systemId":"test_id","createdDate":"2022-07-29","organizationName":"Mergers Subsidiary","caseNumber":"00001164","subject":"Product setup issues","recordType":"0128a0000019S1MAAU","caseId":"00001164","priority":"High","status":"Closed"},{"owner":"Julianna Wong","systemId":"test_id","createdDate":"2022-06-13","organizationName":"Mergers Subsidiary","caseNumber":"00001213","subject":"How do I sign up for your email newsletter?","recordType":"0128a0000019S0IAAU","caseId":"00001213","priority":"Medium","status":"Closed"},{"owner":"Orlando Price","systemId":"test_id","createdDate":"2022-10-02","organizationName":"Group Insurance","caseNumber":"00001741","subject":"Problem with my bill","recordType":"0128a0000019S0IAAU","caseId":"00001741","priority":"Medium","status":"Closed"}]';
    public static String dummyDataOpps='[{"owner":"Adam Smith","closeDate":"2022-10-02","systemId":"test_id","amount":"41000","organizationName":"Agency Org","stage":"Negotiation Review","name":"Portfolio Management"},{"owner":"Campbell Holland","closeDate":"2022-11-04","systemId":"test_id","amount":"112000","organizationName":"Agency Org","stage":"Value Proposition","name":"Mobile Service Addition"},{"owner":"Campbell Holland","closeDate":"2022-11-10","systemId":"test_id","amount":"22500","organizationName":"Mergers Subsidiary","stage":"Qualification","name":"Insurance Renewal"},{"owner":"Bonnie Brown","closeDate":"2022-11-30","systemId":"test_id","amount":"62000","organizationName":"Mergers Subsidiary","stage":"Proposal","name":"Service Agreement"},{"owner":"Cal Watkins","closeDate":"2022-12-31","systemId":"test_id","amount":"85000","organizationName":"Agency Org","stage":"Prospecting","name":"Product help"}]';
    public static String dummyDataActivities='[{"name":"Gather all Project Documents","activityType":"Task","dueDate":"2022-10-23","assignedTo":"Hugo Mitchell","status":"Late In Progress"},{"name":"Project Meeting Kick off","activityType":"Task","dueDate":"2022-11-27","assignedTo":"Madelyn Ross","status":"In Progress"},{"name":"Review Contracts and Signature with Customer","activityType":"Task","dueDate":"2022-12-03","assignedTo":"Laila Peterson","status":"In Progress"},{"name":"Weekly Kickoff","activityType":"Event","dueDate":"2022-12-13","assignedTo":"Remi Gutierrez","status":"On Hold"},{"name":"Meet & Greet","activityType":"Event","dueDate":"2022-12-20","assignedTo":"Haven Jackson","status":"Scheduled"}]';
        
    public multiOrgController() {
        
    }
    
    public class CaseDetails{
        @AuraEnabled
        public String owner {get;set;}
        @AuraEnabled
		public String organizationName {get;set;}
        @AuraEnabled
		public String caseNumber {get;set;}
        @AuraEnabled
		public String subject {get;set;}
        @AuraEnabled
		public String createdDate {get;set;}
        @AuraEnabled
		public String caseId {get;set;}
        @AuraEnabled
		public String priority {get;set;}
        @AuraEnabled
		public String status {get;set;}
    }

    public static HttpResponse getCasesfromOrgsAPI(){
        HttpResponse httpResponse;
        String endPoint='https://case-xapi.us-e2.cloudhub.io/api/case/test_id';
        try {
            Http http= new Http();
            HttpRequest httpRequest= new HttpRequest();
            httpRequest.setHeader('Content-Type', 'application/json');
            httpRequest.setMethod('GET');
            httpRequest.setEndPoint(endPoint);
            // httpRequest.setTimeout(1300);
            httpResponse= http.send(httpRequest);
            // System.debug('HttpResponse for getEnterpriseCases::::'+httpResponse);
            // System.debug('getEnterpriseCases - HttpResponse.getBody::::'+httpResponse.getBody());
        }catch(Exception e){
            System.debug('Exception in getEnterpriseCases:::::'+e.getLineNumber()+'~~ message:::'+e.getMessage());
        }
        return httpResponse;
    }

    @AuraEnabled(cacheable=true)
    public static List<CaseDetails> getCaseDetails(Boolean dummyData){
        List<CaseDetails> caseDetailsList= new List<CaseDetails>();
        List<JSON2ApexCases> json2ApexCasesList;
        HttpResponse casesResponse;
        try{
            if(dummyData){
                // System.debug('JD dummyData::'+dummyData);
                json2ApexCasesList=JSON2ApexCases.parse(dummyDataCases);
            }
            else{
                casesResponse= multiOrgController.getCasesfromOrgsAPI();
                if(casesResponse.getStatusCode() == 200){
                    // System.debug(casesResponse.getBody());
                    // System.debug(JSON2ApexCases.parse(casesResponse.getBody()));

                    json2ApexCasesList=JSON2ApexCases.parse(casesResponse.getBody());
                }
            }
            // System.debug('jsonlist::'+json2ApexCasesList);

            for(JSON2ApexCases casesDataObj :json2ApexCasesList){
                CaseDetails obj= new CaseDetails();
                obj.owner=casesDataObj.owner;
                obj.organizationName=casesDataObj.organizationName;
                obj.caseNumber=casesDataObj.caseNumber;
                obj.subject=casesDataObj.subject;
                obj.createdDate=casesDataObj.createdDate;
                obj.caseId=casesDataObj.caseId;
                obj.priority=casesDataObj.priority;
                obj.status=casesDataObj.status;

                caseDetailsList.add(obj);
            }
        }catch(exception e){
            System.debug('Exception in caseDetailsList:::'+e.getMessage()+'~~~~~Line'+e.getLineNumber());
        }
        // System.debug('caseDetailsList::::'+caseDetailsList);
        // System.debug('caseDetailsList Size:::'+caseDetailsList.size());
        return caseDetailsList;
    }

    public class OppDetails{
        /*
            "closeDate": "2022-05-23",
            "systemId": "test_id",
            "amount": "112000.0",
            "organizationName": "Salesforce Multiorg Demo",
            "stage": "Qualification",
            "name": "Optos Inc. - Add-On Business - 112K"
        */
        @AuraEnabled
        public String owner {get;set;}
        @AuraEnabled
        public String name {get;set;}
        @AuraEnabled
		public String organizationName {get;set;}
        @AuraEnabled
		public String systemId {get;set;}
        @AuraEnabled
		public String amount {get;set;}
        @AuraEnabled
		public String stage {get;set;}
        @AuraEnabled
		public String closeDate {get;set;}
    }


    public static HttpResponse getOppsfromOrgsAPI(){
        HttpResponse httpResponse;
        String endPoint='https://case-xapi.us-e2.cloudhub.io/api/opportunity/test_id';
        try {
            Http http= new Http();
            HttpRequest httpRequest= new HttpRequest();
            httpRequest.setHeader('Content-Type', 'application/json');
            httpRequest.setMethod('GET');
            httpRequest.setEndPoint(endPoint);
            // httpRequest.setTimeout(1300);
            httpResponse= http.send(httpRequest);
            // System.debug('HttpResponse for getEnterpriseOpps::::'+httpResponse);
            // System.debug('getEnterpriseOpps - HttpResponse.getBody::::'+httpResponse.getBody());
        }catch(Exception e){
            System.debug('Exception in getEnterpriseOpps:::::'+e.getLineNumber()+'~~ message:::'+e.getMessage());
        }
        return httpResponse;
    }

    @AuraEnabled(cacheable=true)
    public static List<OppDetails> getOppDetails(Boolean dummyData){
       
        List<OppDetails> oppDetailsList= new List<OppDetails>();
        List<JSON2ApexOpps> json2ApexOppsList;
        HttpResponse oppsResponse;
        try{
            if(dummyData){
                // System.debug('JD dummyData::'+dummyData);
                json2ApexOppsList=JSON2ApexOpps.parse(dummyDataOpps);
            }
            else{
                oppsResponse= multiOrgController.getOppsfromOrgsAPI();
                if(oppsResponse.getStatusCode() == 200){
                    // System.debug(oppsResponse.getBody());
                    // System.debug(JSON2ApexCases.parse(casesResponse.getBody()));
                    json2ApexOppsList=JSON2ApexOpps.parse(oppsResponse.getBody());
                }
            }
            Integer i=0;
            Integer[] daysAdd =new Integer[] {14,28,42,49,84};
            for(JSON2ApexOpps oppsDataObj :json2ApexOppsList){
                OppDetails obj= new OppDetails();
                obj.name=oppsDataObj.name;
                obj.organizationName=oppsDataObj.organizationName;
                obj.systemId=oppsDataObj.systemId;
                obj.amount=oppsDataObj.amount;
                obj.stage=oppsDataObj.stage;
                obj.owner=oppsDataObj.owner;
                if(dummyData){
                    // obj.closeDate=Date.valueOf(oppsDataObj.closeDate).addDays(Integer.valueof(daysAdd[i])).format();
                    obj.closeDate=addDaysToDate(oppsDataObj.closeDate,daysAdd[i]);
                }
                else{
                    obj.closeDate=oppsDataObj.closeDate;
                }
                if (i<5)
                {
                    i++;
                }

                oppDetailsList.add(obj);
                
            }
        }catch(exception e){
            System.debug('Exception in oppDetailsList:::'+e.getMessage()+'~~~~~Line'+e.getLineNumber());
        }
        // System.debug('oppDetailsList::::'+oppDetailsList);
        // System.debug('oppDetailsList Size:::'+oppDetailsList.size());
        return oppDetailsList;
    }

    public class ActivityDetails{
        /*
        "name": "Gather all Project Documents",
        "activityType": "Task",
        "dueDate": "2022-05-23",
        "assignedTo": "Hugo Mitchell",
        "status": "Late In Progress",
        */
        @AuraEnabled
        public String name {get;set;}
        @AuraEnabled
		public String activityType {get;set;}
        @AuraEnabled
		public String dueDate {get;set;}
        @AuraEnabled
        public String assignedTo {get;set;}
        @AuraEnabled
		public String status {get;set;}
    }

    @AuraEnabled(cacheable=true)
    public static List<ActivityDetails> getActivityDetails(Boolean dummyData){
       
        List<ActivityDetails> activityDetailsList= new List<activityDetails>();
        List<JSON2Apexactivities> json2ApexActivitiesList;
        HttpResponse activitiesResponse;
        try{
            // if(dummyData){
                json2ApexActivitiesList=JSON2ApexActivities.parse(dummyDataActivities);
            // }
            // else{
            //     activitiesResponse= multiOrgController.getActivitiesfromOrgsAPI();
            //     if(activitiesResponse.getStatusCode() == 200){
            //         System.debug(activitiesResponse.getBody());
            //         // System.debug(JSON2ApexCases.parse(casesResponse.getBody()));
            //         json2ApexActivitiesList=JSON2ApexActivities.parse(activitiesResponse.getBody());
            //     }
            // }
            for(JSON2ApexActivities activitiesDataObj :json2ApexActivitiesList){
                ActivityDetails obj= new ActivityDetails();
                obj.name=activitiesDataObj.name;
                obj.activityType=activitiesDataObj.activityType;
                // obj.dueDate=activitiesDataObj.dueDate;
                // obj.dueDate=system.today().addDays(Integer.valueof((Math.random() * 30))).format();
                obj.dueDate=getRandomFutureDate();
                obj.assignedTo=activitiesDataObj.assignedTo;
                obj.status=activitiesDataObj.status;
    
                activityDetailsList.add(obj);
            }
        }catch(exception e){
            System.debug('Exception in activityDetailsList:::'+e.getMessage()+'~~~~~Line'+e.getLineNumber());
        }
        // System.debug('activityDetailsList::::'+activityDetailsList);
        // System.debug('activityDetailsList Size:::'+activityDetailsList.size());
        return activityDetailsList;
    }

    public static String getRandomFutureDate()
    {
        Date d = system.today().addDays(Integer.valueof((Math.random() * 100)));
        String strDate = d.format().replace('-','/');
        Date dStart = Date.parse(strDate);
        DateTime dtDate=dStart;
        return dtDate.format('yyyy-MM-dd');
    }
    
    public static String addDaysToDate(String dt, Integer days)
    {
        Date d = Date.valueOf(dt).addDays(days);
        String strDate = d.format();
        Date dStart = Date.parse(strDate);
        DateTime dtDate=dStart;
        return dtDate.format('yyyy-MM-dd');
    }
}
