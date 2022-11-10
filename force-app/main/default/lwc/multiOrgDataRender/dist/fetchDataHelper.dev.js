"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.oppsTestData = exports.casesTestData = void 0;
// export default function fetchDataHelper({ amountOfRecords }) {
//     return fetch('https://data-faker.herokuapp.com/collection', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json; charset=utf-8',
//         },
//         body: JSON.stringify({
//             amountOfRecords,
//             recordMetadata,
//         }),
//     }).then((response) => response.json());
// }
// export default function fetchDataHelper({ amountOfRecords }) {
//     return fetch('https://32b267a0-5ad3-4e15-aece-4ac347a0fac3.mock.pstmn.io/get').then((response) => response.json());
// }
var casesTestData = [{
    "recordId": '0',
    "organizationName": "Agency Org",
    "caseNumber": "00001164",
    "subject": "Product setup issues",
    "createdDate": "05/18/2022",
    "status": "New",
    "owner": "Natalie Alexander"
}, {
    "recordId": '1',
    "organizationName": "Agency Org",
    "caseNumber": "00001168",
    "subject": "Technical Service",
    "createdDate": "04/15/2022",
    "status": "Escalated",
    "owner": "Atticus Green"
}, {
    "recordId": '2',
    "organizationName": "Mergers Subsidiary",
    "caseNumber": "99001101",
    "subject": "Product Question",
    "createdDate": "05/29/2022",
    "status": "Closed",
    "owner": "Dorian Garcia"
}, {
    "recordId": '3',
    "organizationName": "Mergers Subsidiary",
    "caseNumber": "99001122",
    "subject": "Account Support",
    "createdDate": "04/13/2022",
    "status": "New",
    "owner": "Orlando Price"
}, {
    "recordId": '4',
    "organizationName": "Group Insurance",
    "caseNumber": "11002101",
    "subject": "Product Help",
    "createdDate": "02/02/2022",
    "status": "Closed",
    "owner": "Julianna Wong"
}];
exports.casesTestData = casesTestData;
var oppsTestData = [{
    "recordId": '0',
    "organizationName": "Agency Org",
    "oppNumber": "00001164",
    "amount": "$41,000",
    "subject": "Portfolio Management Quote",
    "closeDate": "06/18/2022",
    "stage": "New",
    "owner": "Adam Smith"
}, {
    "recordId": '1',
    "organizationName": "Agency Org",
    "oppNumber": "00001168",
    "amount": "$112,000",
    "subject": "Mobile Service Add-On",
    "closeDate": "06/15/2022",
    "stage": "Escalated",
    "owner": "Campbell Holland"
}, {
    "recordId": '2',
    "organizationName": "Mergers Subsidiary",
    "oppNumber": "99001101",
    "amount": "$22,500",
    "subject": "Insurance Renewal",
    "closeDate": "04/29/2022",
    "stage": "Closed",
    "owner": "Song Arthur"
}, {
    "recordId": '3',
    "organizationName": "Mergers Subsidiary",
    "oppNumber": "99001122",
    "amount": "$62,000",
    "subject": "Service Agreement",
    "closeDate": "06/13/2022",
    "stage": "New",
    "owner": "Bonnie Brown"
}, {
    "recordId": '4',
    "organizationName": "Add-On Business",
    "oppNumber": "11002101",
    "amount": "$85,000",
    "subject": "Product Help",
    "closeDate": "06/02/2022",
    "stage": "Closed",
    "owner": "Cal Watkins"
}];
exports.oppsTestData = oppsTestData;