#!/bin/sh

NAME=$(more CM.txt | cut -d $'\t' -f 2 >>CMNAME.txt)
ASCINAME=$(more CM.txt | cut -d $'\t' -f 3 >>CMASCINAME.txt)
ALTERNATIVENAME=$(more CM.txt | cut -d $'\t' -f 4 >>CMALTERNATIVENAME.txt)
LATITUDE=$(more CM.txt | cut -d $'\t' -f 5 >>CMLATITUDE.txt)
LONGITUDE=$(more CM.txt | cut -d $'\t' -f 6 >>CMLONGITUDE.txt)

txt_to_json () {
    # concatenate
    paste -d ':' CMNAME.txt CMASCINAME.txt CMALTERNATIVENAME.txt CMLATITUDE.txt CMLONGITUDE.txt > CMGEOFinal.txt
    # transform
    jq -Rs '[ split("\n")[] | select(length > 0) 
          | split(":") | {name: .[0], asciiname: .[1], alternativenames: .[2],  lat: .[3], long: .[4]} ]' CMGEOFinal.txt > list_geo_cm.json

    rm CMNAME.txt CMALTERNATIVENAME.txt CMASCINAME.txt CMLATITUDE.txt CMLONGITUDE.txt CMGEOFinal.txt
}

txt_to_json