
// Make 3 CSVs, for CALIFORNIA REPUBLIC
// each csv has one row per date,

const fs = require('fs');
const _ = require('./underscore-min.js');

// from models_Model.js
const COLUMNS = {
  hospitalizations: 8 + 1,
  beds: 11 + 1,
  deaths: 10 + 1,
  infected: 9 + 1,
  totalPopulation: 16 + 1,
  date: 0 + 1,
};

const COLS_IN_ORDER = [
  'date',
  'infected',
  'hospitalizations',
  'beds',
  'deaths',
  'infected',
  'totalPopulation'
];

function jsonToCSV(jsonFile) {
  var csv = "";
  csv += COLS_IN_ORDER.join(', ') + '\n';
  const thejson = fs.readFileSync(jsonFile)
  const fileJSON = JSON.parse(thejson);
  _.each(fileJSON, function(elem) {
    var rowData = _.map(COLS_IN_ORDER, colName => elem[COLUMNS[colName]]);
    csv += rowData.join(', ') + '\n';
  });
  const outfileName = jsonFile.replace('.json', '.csv');
  fs.writeFileSync(outfileName, csv);
}

// returns a string of the CSV file for the given scenario for the whole state
// UNUSED
function doScenario(scenarioNum) {
  var csv = "";
  csv += COLS_IN_ORDER.join(', ') + '\n';
  const thejson = fs.readFileSync(`data/20200412/CA.${scenarioNum}.json`)
  const fileJSON = JSON.parse(thejson);
  _.each(fileJSON, function(elem) {
    var rowData = _.map(COLS_IN_ORDER, colName => elem[COLUMNS[colName]]);
    csv += rowData.join(', ') + '\n';
  });
  fs.writeFileSync(`data/20200412/CA.${scenarioNum}.csv`, csv);
}

const scenarioNums = [0, 1, 3];
const countyFIPS = ['06001', '06005', '06007', '06009', '06013', '06015', '06017', '06019', '06021', '06023', '06025', '06027', '06029', '06031', '06037', '06039', '06041', '06045', '06047', '06051', '06053', '06055', '06057', '06059', '06061', '06063', '06065', '06067', '06069', '06071', '06073', '06075', '06077', '06079', '06081', '06083', '06085', '06087', '06089', '06093', '06095', '06097', '06099', '06101', '06103', '06107', '06109', '06111', '06113', '06115'];

_.each(scenarioNums, function(scenarioNum) {
  jsonToCSV(`data/20200412/CA.${scenarioNum}.json`);
  _.each(countyFIPS, fipsCode => jsonToCSV(`data/20200412/CA.${fipsCode}.${scenarioNum}.json`));
});
