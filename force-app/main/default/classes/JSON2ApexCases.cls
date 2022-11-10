public with sharing class JSON2ApexCases {
    public JSON2ApexCases() {

    }

    public String owner;
    public String organizationName;
    public String caseNumber;
    public String subject;
    public String createdDate;
    public String caseId;
    public String priority;
    public String status;
	
	public static List<JSON2ApexCases> parse(String json) {
		return (List<JSON2ApexCases>) System.JSON.deserialize(json, List<JSON2ApexCases>.class);
	}
}
