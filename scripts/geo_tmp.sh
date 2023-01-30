#!/bin/sh

NAME=$(more CM_tmp.txt | tr -s '\t' '|' | cut  -d $'|' -f 2 >>CMNAME.txt)
CITY_NAME=$(more CM_tmp.txt | rev | tr -s '\t' '|' | cut  -d $'|' -f 2 | rev >>CMCITY_NAME.txt)
ASCINAME=$(more CM_tmp.txt | tr -s '\t' '|' | cut  -d $'|' -f 3 >>CMASCINAME.txt)
ALTERNATIVENAME=$(more CM_tmp.txt | tr -s '\t' '|' | cut  -d $'|' -f 4 >>CMALTERNATIVENAME.txt)
LATITUDE=$(more CM_tmp.txt | tr -s '\t' '|' | cut  -d $'|' -f 5 >>CMLATITUDE.txt)
LONGITUDE=$(more CM_tmp.txt | tr -s '\t' '|' | cut  -d $'|' -f 6 >>CMLONGITUDE.txt)

txt_to_json () {
    # concatenate
    paste -d ':' CMNAME.txt CMCITY_NAME.txt CMASCINAME.txt CMALTERNATIVENAME.txt CMLATITUDE.txt CMLONGITUDE.txt > CMGEOFinal.txt
    # transform
    jq -Rs '[
        split("\n")[] |
        select(length > 0) |
        split(":") |
        {name: .[0], city: .[1], asciiname: .[2], alternativenames: .[3],  lat: .[4], long: .[5]}
    ]' CMGEOFinal.txt > list_geo_tmp.json

    rm CMNAME.txt CMCITY_NAME.txt CMALTERNATIVENAME.txt CMASCINAME.txt CMLATITUDE.txt CMLONGITUDE.txt CMGEOFinal.txt
}

txt_to_json
