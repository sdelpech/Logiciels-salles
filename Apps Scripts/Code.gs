function getFilteredSoftware() {
  // List of software to exclude from the spreadsheet
  var excludedSoftware = [
    "NVIDIA Pilote audio HD 1.4.3.2",
    "EShare",
    "Epson iProjection Ver.4.02",
    "Eclipse Temurin JRE avec Hotspot 8u402-b06 (x64)",
    "NVIDIA Pilote audio HD 1.4.3.2",
    "NVIDIA Pilote graphique 572.83",
    "NVIDIA RTX Desktop Manager 205.28",
    "Package for GodotEngin",
    "Print Client",
    "Teams Machine-Wide Installer",
    "U-WAVEPAK Ver1.022B",
    "WAPTAgent Community 1.8.2.7393",
    "Windows Subsystem for Linux",
    "Microsoft Office LTSC Professional Plus 2024 - uk-ua",
    "Microsoft Office LTSC Professional Plus 2024 - uk-ua.proof",
    "Microsoft Office LTSC Professional Plus 2024 - en-us",
    "Microsoft Office LTSC Professional Plus 2024 - en-us.proof",
    "Microsoft Office LTSC Professional Plus 2024 - en-us.proof",
    "Microsoft Project Professional 2021 - uk-ua.proof",
    "Microsoft Project Professional 2024 - en-us",
    "Microsoft Project Professional 2024 - en-us.proof",
    "Microsoft Project Professional 2024 - uk-ua",
    "Microsoft Project Professional 2024 - uk-ua.proof",
    "Microsoft Visio LTSC Professional 2024 - en-us",
    "Microsoft Visio LTSC Professional 2024 - en-us.proof",
    "Microsoft Visio LTSC Professional 2024 - uk-ua",
    "Microsoft Visio LTSC Professional 2024 - uk-ua.proof",
    "Microsoft Project Professional 2021 - en-us.proof",
    "CC0825"
    // Add more software names to exclude here
  ];
  return excludedSoftware;
}

function isExcludedSoftware(softwareName) {
  var excludedList = getFilteredSoftware();
  return excludedList.indexOf(softwareName) !== -1;
}

function ajout_lignes_logiciel(){
  var aujourdhui = new Date();
  var datedujour = aujourdhui.toISOString();
  datedujour = gooddate(datedujour)
  reset();
  var spreadsheet = SpreadsheetApp.openById(sheetId());
  var sheet = spreadsheet.getActiveSheet();
  
  // Add title row with formatting
  sheet.appendRow(["Logiciels par Salles"]);
  var titleRange = sheet.getRange("A1");
  titleRange.setFontWeight("bold");
  titleRange.setFontSize(18);
  
  sheet.appendRow(["Dernière actualisation : " + datedujour]) 
  sheet.appendRow(["--------------------------------------"])
  sheet_envoi = sheet.appendRow(["Logiciel","Version","A102","A103","A104","A105","A200","A201","A202","A203","A205","A300","A304","A307","B501","B502","C200","C303","CRDOC"]); 
  
  // Format header row in bold
  var headerRange = sheet.getRange("A4:S4");
  headerRange.setFontWeight("bold");
  
  // Center align column B (Version column)
  var columnBRange = sheet.getRange("B:B");
  columnBRange.setHorizontalAlignment("center");
  
  sheet.setFrozenRows(4);
  
  // Batch process all rooms at once instead of individual calls
  var rooms = ["A102", "A103", "A104", "A105", "A200", "A201", "A202", "A203", "A205", "A300", "A304", "A307", "B501", "B502", "C200", "C303", "CRDOC"];
  
  // Collect all unique software from all rooms
  var allSoftware = new Map();
  Logger.log("Récupération des données de toutes les salles...");
  
  rooms.forEach(room => {
    var fileread = getjson(room);
    var search = JSON.parse(fileread).result;
    Object.keys(search).forEach(item => {
      var soft = search[item];
      // Filter out excluded software
      if (!allSoftware.has(soft.name) && !isExcludedSoftware(soft.name)) {
        allSoftware.set(soft.name, soft.version);
      }
    });
  });
  
  // Insert all unique software at once using batch operation
  if (allSoftware.size > 0) {
    var rowsToAdd = Array.from(allSoftware).map(([name, version]) => [name, version]);
    Logger.log("Ajout de " + rowsToAdd.length + " logiciels en lot");
    var startRow = sheet.getLastRow() + 1;
    sheet.getRange(startRow, 1, rowsToAdd.length, 2).setValues(rowsToAdd);
  }
  
  order();
  
  // Batch process room checkmarks
  Logger.log("Application des couleurs...");
  rooms.forEach(room => coche_salle(room));
}

function col_salle(salle){
  if( salle =="A102" ){
    return "C";
  }
  if( salle =="A103" ){
    return "D";
  }
  if( salle =="A104" ){
    return "E";
  }
  if( salle =="A105" ){
    return "F";
  }
  if( salle =="A200" ){
    return "G";
  }
  if( salle =="A201" ){
    return "H";
  }
  if( salle =="A202" ){
    return "I";
  }
  if( salle =="A203" ){
    return "J";
  }
  if( salle =="A205" ){
    return "K";
  }
  if( salle =="A300" ){
    return "L";
  }
  if( salle =="A304" ){
    return "M";
  }
  if( salle =="A307" ){
    return "N";
  }
  if( salle =="B501" ){
    return "O";
  }
  if( salle =="B502" ){
    return "P";
  }
  if( salle =="C200" ){
    return "Q";
  }
  if( salle =="C303" ){
    return "R";
  }
  if( salle =="CRDOC" ){
    return "S";
  }
}

function sheetId(){
  return("1agjrM3zPMM-kqjnfbnl54THq_xQRzGAOOqtShB0lyKQ");
}

function order(){
  sheet = SpreadsheetApp.openById(sheetId());
  sheet.getRange("A6:S300").sort(1);
}

function getjson(salle){
  var url = "https://winlog.iut-rodez.fr/admin/liste/" + salle + ".json";
  Logger.log(url);
  var response = UrlFetchApp.fetch(url);
  return(response);
}

function gooddate(datepasgood){
  //Date vs Heure
  var tabDXH = datepasgood.split("T");
  var date = tabDXH[0];
  var heure = tabDXH[1];
  
  var tabDJMA = date.split("-");
  var jour = tabDJMA[2];
  var mois = tabDJMA[1];
  var annee = tabDJMA[0];

  var tabHMS = heure.split(":");
  var heure = tabHMS[0];
  var minute = tabHMS[1];
  var seconde = tabHMS[2];
  var rab = tabHMS[3];

  var dategood = jour + "-" + mois + "-" + annee + " " + heure + ":" + minute;
  Logger.log(dategood)
  return(dategood);
}

function reset(){
  var sheet = SpreadsheetApp.openById(sheetId());
  // Clear all content using the correct method
  sheet.getDataRange().clear();
  // Reset formatting
  sheet.getDataRange().clearFormat();
  // Reset frozen rows
  sheet.setFrozenRows(0);
}

function coche_salle(salle){
  var fileread = getjson(salle);
  var search = JSON.parse(fileread).result;
  var sheet = SpreadsheetApp.openById(sheetId()).getActiveSheet();
  var values = sheet.getDataRange().getValues();
  
  // Build a map of software names to row numbers for faster lookup
  var softwareRowMap = {};
  for(var i = 0; i < values.length; i++) {
    if(values[i][0]) {
      softwareRowMap[values[i][0]] = i + 1;
    }
  }
  
  // Collect all cells to color for this room
  var cellsToColor = [];
  var salle_colone = col_salle(salle);
  
  Object.keys(search).forEach(item => {
    var softName = search[item]["name"];
    // Only color cells for software that's not excluded
    if(softwareRowMap[softName] && !isExcludedSoftware(softName)) {
      cellsToColor.push(salle_colone + softwareRowMap[softName]);
    }
  });
  
  // Apply all colors at once using batch operation
  if(cellsToColor.length > 0) {
    cellsToColor.forEach(cellule => {
      sheet.getRange(cellule).setBackgroundColor('#1A9900');
    });
  }
}

function coche_case(soft,salle){
  // This function is now handled by the optimized coche_salle
  // Keep for compatibility
}

function isDansletab(searchString) {
  // This function is now optimized within coche_salle
  // Keep for compatibility with other functions
  var sh = SpreadsheetApp.openById(sheetId()).getActiveSheet();
  var values = sh.getDataRange().getValues();
  for(var i=0, iLen=values.length; i<iLen; i++) {
    if(values[i][0] == searchString) {
      row = i + 1;
      return row;
    }
  }     
}

function insert_row(nom,version,salle){
  sheet = SpreadsheetApp.openById(sheetId());
  var deja = isDansletab(nom);
  if( deja != null){
    //Logger.log("Logiciel déjà présent dans le tableau");
  }
  else{
    Logger.log("Ajout de " + nom +" "+version)
    sheet_envoi = sheet.appendRow([nom,version]);
  } 
}

function insertsheet(salle){
  //recup du json
  var fileread = getjson(salle);
  var search = JSON.parse(fileread).result
  // Ouverture du tableau
  Object.keys(search).forEach(item => insert_row(search[item]["name"],search[item]["version"],salle))
}

//////////////////////////////////////////////////////////////////////////////////
/////////////////////////            PAGE WEB            /////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function search_in_salle(soft,salle){
  var fileread = getjson(salle);
  var search = JSON.parse(fileread).result
  // Ouverture du tableau
  var recherche = false;
  Object.keys(search).forEach(item => {if(search[item]["name"] == soft){recherche = ["test",search[item]["install_date"]]}})
  return(recherche)
}

function cherche_soft(soft){
  var liste = "<div class='alert alert-light mb-2' role='alert'><h5>Ce logiciel est présent en : <br><br></h4>";

  search_A102 = search_in_salle(soft,"A102")
  if(search_A102 != false){
    liste = liste + " - A102<br>";
  }

  search = search_in_salle(soft,"A103")
  if(search != false){
    liste = liste + " - A103<br>";
  }

  search = search_in_salle(soft,"A104")
  if(search != false){
    liste = liste + " - A104<br>";
  }

  search = search_in_salle(soft,"A105")
  if(search != false){
    liste = liste + " - A105<br>";
  }

  search = search_in_salle(soft,"A200")
  if(search != false){
    liste = liste + " - A200<br>";
  }

  search = search_in_salle(soft,"A201")
  if(search != false){
    liste = liste + " - A201<br>";
  } 

  search = search_in_salle(soft,"A202")
  if(search != false){
    liste = liste + " - A202<br>";
  }

  search = search_in_salle(soft,"A205")
  if(search != false){
    liste = liste + " - A205<br>";
  }

  search = search_in_salle(soft,"A300")
  if(search != false){
    liste = liste + " - A300<br>";
  }

  search = search_in_salle(soft,"A304")
  if(search != false){
    liste = liste + " - A304<br>";
  }

  search = search_in_salle(soft,"A307")
  if(search != false){
    liste = liste + " - A307<br>";
  }

  search = search_in_salle(soft,"B501")
  if(search != false){
    liste = liste + " - B501<br>";
  }

  search = search_in_salle(soft,"B502")
  if(search != false){
    liste = liste + " - B502<br>";
  }

  search = search_in_salle(soft,"C200")
  if(search != false){
    liste = liste + " - C200<br>";
  }

  liste = liste +"</div><br><br>"
  return(liste)
}

function cherche_salle(salle){
  var liste = "<div class='alert alert-light mb-2' role='alert'><h5>Les logiciels installés en salle " + salle + " sont : <br><br></h4>"
  liste = liste + "<table width='100%' class='table table-light'><thead><tr><th scope='col'>Logiciel</th><th scope=col>Version</th></tr></thead><tbody>";
  var fileread = getjson(salle);
  var search = JSON.parse(fileread).result;
  Object.keys(search).forEach(item => {
    liste = liste + "<tr>";
    liste = liste + "<th><h6>" + search[item]["name"] + "</h6></th>";
    liste = liste + "<th><h6>" + search[item]["version"] + "</h6></th>";
    liste = liste + "</tr>";
  })
  liste = liste + "</tbody></table>";
  return(liste);
}

function getSelectSoft(){
  var result="<option selected>Selectionnez un logiciel dans cette liste </option>";
  var sh = SpreadsheetApp.openById(sheetId());
  var values = sh.getDataRange().getValues();
  for(var i=5, iLen=values.length; i<iLen; i++) {
    result =  result + "<option value='" + values[i][0] + "'>" + values[i][0] + " " + values[i][2] +"</option>";
  }     
  return(result);
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}