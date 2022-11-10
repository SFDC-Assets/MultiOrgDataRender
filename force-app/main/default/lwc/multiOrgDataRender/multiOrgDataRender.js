import {
    LightningElement,
    api,
    wire,
    track
} from 'lwc';
// import getTestData from '@salesforce/apex/multiOrgController.getTestData';
import getCaseDetails from '@salesforce/apex/multiOrgController.getCaseDetails';
import getOppDetails from '@salesforce/apex/multiOrgController.getOppDetails';
import getActivityDetails from '@salesforce/apex/multiOrgController.getActivityDetails';

const columnsCases = [{
        label: 'Org',
        fieldName: 'organizationName',
        type: 'text',
        hideDefaultActions: true
    },
    // {
    //     label: "Name",
    //     type: "button",
    //     wrapText: false,
    //     typeAttributes: {
    //         label: { fieldName: "subject" },
    //         name: "get_details",
    //         variant: "base"
    //     }
    // },
    // { label: 'Name', fieldName: 'subject', type: 'text', hideDefaultActions: true },
    {
        label: 'Name',
        fieldName: 'subject',
        type: 'url',
        typeAttributes: {
            label: {
                fieldName: 'subject'
            },
            target: '_blank'
        },
        hideDefaultActions: true
    },
    {
        label: 'Status',
        fieldName: 'status',
        type: 'text',
        hideDefaultActions: true
    },
    {
        label: 'Created Date',
        fieldName: 'createdDate',
        type: 'date',
        sortable: true,
        typeAttributes: {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        }
    },
    {
        label: 'Owner',
        fieldName: 'owner',
        type: 'text',
        hideDefaultActions: true
    },
    {
        type: 'action',
        typeAttributes: {
            rowActions: [{
                    label: 'Get Details',
                    name: 'get_details',
                    iconName: 'utility:zoomin'
                },
                {
                    label: 'Notify Owner',
                    name: 'notify_owner',
                    iconName: 'utility:privately_shared'
                },
                {
                    label: 'Share With Others',
                    name: 'share_with_others',
                    iconName: 'utility:share',
                    URL: 'https://www.lightningdesignsystem.com/components/data-tables/'
                }
            ]
        }
    }
];

const columnsOpps = [{
        label: 'Org',
        fieldName: 'organizationName',
        type: 'text',
        hideDefaultActions: true
    },
    {
        label: 'Name',
        fieldName: 'name',
        type: 'url',
        typeAttributes: {
            label: {
                fieldName: 'name'
            },
            target: '_blank'
        },
        hideDefaultActions: true
    },
    {
        label: 'Amount',
        fieldName: 'amount',
        type: 'currency',
        hideDefaultActions: true,
        typeAttributes: {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }
    },
    {
        label: 'Stage',
        fieldName: 'stage',
        type: 'text',
        hideDefaultActions: true
    },
    {
        label: 'Close Date',
        fieldName: 'closeDate',
        type: 'date',
        sortable: true,
        typeAttributes: {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        }
    },
    {
        label: 'Owner',
        fieldName: 'owner',
        type: 'text',
        hideDefaultActions: true
    },
    {
        type: 'action',
        typeAttributes: {
            rowActions: [{
                    label: 'Get Details',
                    name: 'get_details',
                    iconName: 'utility:zoomin'
                },
                {
                    label: 'Notify Owner',
                    name: 'notify_owner',
                    iconName: 'utility:privately_shared'
                },
                {
                    label: 'Share With Others',
                    name: 'share_with_others',
                    iconName: 'utility:share'
                }
            ]
        }
    }
];


const columnsActivities = [{
        label: 'Org',
        fieldName: 'organizationName',
        type: 'text',
        hideDefaultActions: true
    },
    // {
    //     label: "Name",
    //     type: "button",
    //     wrapText: false,
    //     typeAttributes: {
    //         label: { fieldName: "subject" },
    //         name: "get_details",
    //         variant: "base"
    //     }
    // },
    // { label: 'Name', fieldName: 'subject', type: 'text', hideDefaultActions: true },
    {
        label: 'Name',
        fieldName: 'name',
        type: 'url',
        typeAttributes: {
            label: {
                fieldName: 'name'
            },
            target: '_blank'
        },
        hideDefaultActions: true
    },
    {
        label: 'Activity Type',
        fieldName: 'activityType',
        type: 'text',
        hideDefaultActions: true
    },
    {
        label: 'Due Date',
        fieldName: 'dueDate',
        type: 'date',
        sortable: true,
        typeAttributes: {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        }
    },
    {
        label: 'Assigned To',
        fieldName: 'assignedTo',
        type: 'text',
        hideDefaultActions: true
    },
    {
        label: 'Status',
        fieldName: 'status',
        type: 'text',
        hideDefaultActions: true
    },
    {
        type: 'action',
        typeAttributes: {
            rowActions: [{
                    label: 'Get Details',
                    name: 'get_details',
                    iconName: 'utility:zoomin'
                },
                {
                    label: 'Notify Owner',
                    name: 'notify_owner',
                    iconName: 'utility:privately_shared'
                },
                {
                    label: 'Share With Others',
                    name: 'share_with_others',
                    iconName: 'utility:share',
                    URL: 'https://www.lightningdesignsystem.com/components/data-tables/'
                }
            ]
        }
    }
];

export default class BasicDatatable extends LightningElement {

    @api heading = 'Enterprise Cases';
    @api objType = 'Case';
    @api useDummyData = 'true';
    @api orgTitleA = 'Agency Org';
    @api orgTitleB = 'Agency Org';
    @api orgTitleC = 'Mergers Subsidiary';
    @api orgTitleD = 'Mergers Subsidiary';
    @api orgTitleE = 'Group Insurance';
    @track modalHTML;
    @track modalHeader;
    @track casesData;
    @track casesError;
    @track oppsData;
    @track oppsError;
    @track isCases;
    @track isOpps;
    @track columnsCases;
    @track columnsOpps;
    @track activitiesData;
    @track activitiesError;
    @track isActivities;
    @track columnsActivities;
    @track sortByCases;
    @track sortDirectionCases;
    @track sortByOpps;
    @track sortDirectionOpps;
    @track sortByActivities;
    @track sortDirectionActivities;

    @wire(getCaseDetails, {
        dummyData: '$useDummyData'
    })
    casesData({
        data,
        error
    }) {
        if (data) {
            if (this.objType == 'Case') {
                this.isCases = true;
            }
            console.log('Callout JS');
            console.log(data);
            this.columnsCases = columnsCases;
            var tmpData = JSON.parse(JSON.stringify(data));
            if (this.useDummyData == true) {
                tmpData[0].organizationName = this.orgTitleA;
                tmpData[1].organizationName = this.orgTitleB;
                tmpData[3].organizationName = this.orgTitleC;
                tmpData[2].organizationName = this.orgTitleD;
                tmpData[4].organizationName = this.orgTitleE;
            }
            this.casesData = tmpData;
            this.sortDataCases('createdDate', 'asc');
            this.error = undefined;
        } else if (error) {
            console.log('An error has occurred:');
            this.casesData = undefined;
            this.casesError = error;
            console.log(error);
        }
    }

    doSortingCases(event) {
        this.sortByCases = event.detail.fieldName;
        this.sortDirectionCases = event.detail.sortDirection;
        console.log("sortBy::" + this.sortByCases);
        console.log("sortDirection::" + this.sortDirectionCases);
        this.sortDataCases(this.sortByCases, this.sortDirectionCases);

    }
    sortDataCases(fieldname, direction) {
        console.log("inside sortdata");
        let parseData = JSON.parse(JSON.stringify(this.casesData));
        console.log("parseData:" + parseData);
        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };
        // cheking reverse direction
        let isReverse = direction === 'asc' ? 1 : -1;
        // sorting data
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });
        this.casesData = parseData;
    }

    @wire(getOppDetails, {
        dummyData: '$useDummyData'
    })
    oppsData({
        data,
        error
    }) {
        if (data) {
            if (this.objType == 'Opportunity') {
                this.isOpps = true;
            }

            console.log('Callout JS Opps');
            console.log(data);
            this.columnsOpps = columnsOpps;
            var tmpData = JSON.parse(JSON.stringify(data));
            if (this.useDummyData == true) {
                tmpData[0].organizationName = this.orgTitleA;
                tmpData[1].organizationName = this.orgTitleB;
                tmpData[3].organizationName = this.orgTitleC;
                tmpData[2].organizationName = this.orgTitleD;
                tmpData[4].organizationName = this.orgTitleE;
            }
            this.oppsData = tmpData;
            this.sortDataOpps('closeDate', 'asc');
            this.error = undefined;
        } else if (error) {
            console.log('An error has occurred:');
            this.oppsData = undefined;
            this.oppsError = error;
            console.log(error);
        }
    }

    doSortingOpps(event) {
        this.sortByOpps = event.detail.fieldName;
        this.sortDirectionOpps = event.detail.sortDirection;
        console.log("sortBy::" + this.sortByOpps);
        console.log("sortDirection::" + this.sortDirectionOpps);
        this.sortDataOpps(this.sortByOpps, this.sortDirectionOpps);

    }
    sortDataOpps(fieldname, direction) {
        console.log("inside sortdata");
        let parseData = JSON.parse(JSON.stringify(this.oppsData));
        console.log("parseData:" + parseData);
        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };
        // cheking reverse direction
        let isReverse = direction === 'asc' ? 1 : -1;
        // sorting data
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });
        this.oppsData = parseData;
    }

    @wire(getActivityDetails, {
        dummyData: '$useDummyData'
    })
    activitiesData({
        data,
        error
    }) {
        if (data) {
            if (this.objType == 'Activity') {
                this.isActivities = true;
            }

            console.log('Callout JS Activities');
            console.log(data);
            this.columnsActivities = columnsActivities;
            var tmpData = JSON.parse(JSON.stringify(data));
            if (this.useDummyData == true) {
                tmpData[0].organizationName = this.orgTitleA;
                tmpData[1].organizationName = this.orgTitleB;
                tmpData[3].organizationName = this.orgTitleC;
                tmpData[2].organizationName = this.orgTitleD;
                tmpData[4].organizationName = this.orgTitleE;
            }
            this.activitiesData = tmpData;
            this.sortDataActivities('dueDate', 'asc');
            this.error = undefined;
        } else if (error) {
            console.log('An error has occurred:');
            this.activitiesData = undefined;
            this.activitiesError = error;
            console.log(error);
        }
    }

    doSortingActivities(event) {
        this.sortByActivities = event.detail.fieldName;
        this.sortDirectionActivities = event.detail.sortDirection;
        console.log("sortBy::" + this.sortByActivities);
        console.log("sortDirection::" + this.sortDirectionActivities);
        this.sortDataActivities(this.sortByActivities, this.sortDirectionActivities);

    }
    sortDataActivities(fieldname, direction) {
        console.log("inside sortdata");
        let parseData = JSON.parse(JSON.stringify(this.activitiesData));
        console.log("parseData:" + parseData);
        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };
        // cheking reverse direction
        let isReverse = direction === 'asc' ? 1 : -1;
        // sorting data
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });
        this.activitiesData = parseData;
    }

    @track isShowModal = false;
    @track record = {};

    showModalBox() {
        this.isShowModal = true;
    }

    hideModalBox() {
        this.isShowModal = false;
    }
    @track isShowNotifyModal = false;

    showNotifyModalBox() {
        this.isShowNotifyModal = true;
    }

    hideNotifyModalBox() {
        this.isShowNotifyModal = false;
    }

    @track isShowSharingModal = false;

    showSharingModalBox() {
        this.isShowSharingModal = true;
    }

    hideSharingModalBox() {
        this.isShowSharingModal = false;
    }

    handleRowActions(event) {

        const actionName = event.detail.action.name;
        const row = event.detail.row;
        // const selectedRows = event.detail.selectedRows

        this.rowId = row.Id;
        switch (actionName) {
            case 'get_details':
                this.record = row;
                if (this.objType == 'Opportunity') {
                    this.modalHeader = 'Enterprise Opportunity Details';
                    this.modalHTML = `
                        <b>Org Name:</b> ${JSON.stringify(row.organizationName)}<br/>
                        <b>Subject:</b> ${JSON.stringify(row.name)}<br/>
                        <b>Amount:</b> ${JSON.stringify(row.amount)}<br/>
                        <b>Stage:</b> ${JSON.stringify(row.stage)}<br/>
                        <b>Close Date:</b> ${JSON.stringify(row.closeDate)}<br/>
                        <b>Owner:</b> ${JSON.stringify(row.owner)}<br/>
                        <b>Expected Revenue:</b> $20,500.00<br/>
                        <b>Probability (%):</b> 50%<br/>
                        <b>Type:</b> Add-On Business<br/>
                        <b>Lead & Referral Source:</b> Website<br/>
                        `;
                } else if (this.objType == 'Case') {
                    this.modalHeader = 'Enterprise Case Details';
                    this.modalHTML = `
                        <b>Org Name:</b> ${JSON.stringify(row.organizationName)}<br/>
                        <b>Subject:</b> ${JSON.stringify(row.subject)}<br/>
                        <b>Case Numer:</b> ${JSON.stringify(row.caseNumber)}<br/>
                        <b>Status:</b> ${JSON.stringify(row.status)}<br/>
                        <b>Priority:</b> ${JSON.stringify(row.priority)}<br/>
                        <b>Created Date:</b> ${JSON.stringify(row.createdDate)}<br/>
                        <b>Owner:</b> ${JSON.stringify(row.owner)}<br/>
                        <b>Case Record Type:</b> Technical Service<br/>
                        <b>Type:</b> Product Support<br/>
                        <b>Case Origin:</b> Phone<br/>
                        <b>Contact Name:</b> Lisa Jones<br/>
                        `;

                } else if (this.objType == 'Activity') {
                    this.modalHeader = 'Enterprise Activity Details';
                    this.modalHTML = `
                        <b>Org Name:</b> ${JSON.stringify(row.organizationName)}<br/>
                        <b>Name:</b> ${JSON.stringify(row.name)}<br/>
                        <b>Activity Type:</b> ${JSON.stringify(row.activityType)}<br/>
                        <b>Due Date:</b> ${JSON.stringify(row.dueDate)}<br/>
                        <b>Assigned To:</b> ${JSON.stringify(row.assignedTo)}<br/>
                        <b>Status:</b> ${JSON.stringify(row.status)}<br/>
                        `;

                }
                this.modalHTML = this.modalHTML.replace(/\"/g, "");

                this.showModalBox();

                break;
            case 'notify_owner':
                this.showNotifyModalBox();
                break;
            case 'share_with_others':
                this.showSharingModalBox();
                break;
        }
    }

}