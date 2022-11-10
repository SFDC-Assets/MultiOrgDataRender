public with sharing class JSON2ApexOpps {
    public JSON2ApexOpps() {

    }

    public String name;
    public String organizationName;
    public String systemId;
    public String amount;
    public String stage;
    public String closeDate;
    public String owner;
	
	public static List<JSON2ApexOpps> parse(String json) {
		return (List<JSON2ApexOpps>) System.JSON.deserialize(json, List<JSON2ApexOpps>.class);
	}
}
