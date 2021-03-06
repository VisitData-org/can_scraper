#!/bin/bash

GEOS_TO_RETRIEVE="06001 06005 06007 06009 06013 06015 06017 06019 06021 06023 06025 06027 06029 06031 06037 06039 06041 06045 06047 06051 06053 06055 06057 06059 06061 06063 06065 06067 06069 06071 06073 06075 06077 06079 06081 06083 06085 06087 06089 06093 06095 06097 06099 06101 06103 06107 06109 06111 06113 06115"
SCENARIOS_TO_RETRIEVE="0 1 3"

TODAY=`date '+%Y%m%d'`
mkdir data/$TODAY
for SCENARIO in $SCENARIOS_TO_RETRIEVE; do
    wget https://covidactnow.org/data/CA.$SCENARIO.json  -O data/$TODAY/CA.$SCENARIO.json
    for GEO in $GEOS_TO_RETRIEVE; do
        FNAME="CA.$GEO.$SCENARIO.json"
        if [ ! -f "data/$TODAY/$FNAME" ]; then
            wget https://covidactnow.org/data/county/$FNAME -O data/$TODAY/$FNAME
        fi
    done
done

node ./state_csvs.js > data/$TODAY/CAN.csv

aws s3 cp data/$TODAY/CAN.csv s3://jhumodelaggregates/latest/CAN.csv
aws s3 cp data/$TODAY/CAN.csv s3://jhumodelaggregates/$TODAY/CAN.csv
