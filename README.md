# can_scraper

export AWS_ACCESS_KEY_ID=foo
export AWS_SECRET_ACCESS_KEY=bar
`./retrieve_jsons.sh`

That will:
* retrieve the JSONs,
* create data/<YYYYMMDD>/all.csv
* upload it to S3
