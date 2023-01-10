sfdx shane:org:create -f config/project-scratch-def.json -d 3 -s --wait 60 --userprefix platform -o multiOrgDataRender.demo
sfdx force:source:push
sfdx shane:user:password:set -g User -l User -p salesforce1
sfdx force:org:open
