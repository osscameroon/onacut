#!/bin/sh

ALERT_FILE=alerts.json
REGION_IDS=$(cat region_ids.txt | cut -d ":" -f 1)
COOKIE="_ga=GA1.2.1398056536.1632560903; PHPSESSID=2531bb3d10e02223eb3ce251ea6454b8; _gid=GA1.2.394447524.1635359903; _gat_gtag_UA_145904416_1=1"

request() {
	region=$1

	echo "Fetching eneo alerts for region $region..."
	curl -X POST "https://alert.eneo.cm/ajaxOutage.php?region=$region" -H "Cookie: $COOKIE" --silent | jq ".data" | tee -a $ALERT_FILE
	echo "Fetched eneo alerts for region $region."
}

delete_alert_file () {
	#delete alert file if exist
	if [ -n "$ALERT_FILE" ]; then
		rm -rf $ALERT_FILE
	fi
}

delete_alert_file

for id in $REGION_IDS; do
	request "$id"
	cat $ALERT_FILE | jq ".[]" | jq -s | tee $ALERT_FILE
	sleep 0.5
done
