public with sharing class JSON2ApexActivities {
    public JSON2ApexActivities() {

    }

    public String name;
    public String activityType;
    public String dueDate;
    public String assignedTo;
    public String status;
	
	public static List<JSON2ApexActivities> parse(String json) {
		return (List<JSON2ApexActivities>) System.JSON.deserialize(json, List<JSON2ApexActivities>.class);

    }
}
