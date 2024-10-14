sf demoutil org create scratch -f config/project-scratch-def.json -d 5 -s -p platform -e multiOrgDataRender.demo

sf project deploy start
sf demoutil user password set -p salesforce1 -g User -l User
sf data upsert bulk -s Account -f data/Accounts.csv -i ID -w 3
sf org open -p /lightning/o/Account/list
