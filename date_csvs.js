
// Make 32 x 3 CSVs, one for each date and scenario
// each csv has one row per geography (county and whole state)

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

// returns a string of the CSV file for the given scenario for the whole state
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

_.each(scenarioNums, doScenario);
