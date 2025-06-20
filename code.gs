 function ajout_lignes_logiciel(){
  var aujourdhui = new Date();
  var datedujour = aujourdhui.toISOString();
  datedujour = gooddate(datedujour)
  reset();
  var sheet = SpreadsheetApp.openById(sheetId());
  sheet.appendRow(["Dernière actualisation : " + datedujour])
  sheet.appendRow(["--------------------------------------"])
  sheet_envoi = sheet.appendRow(["Logiciel","Version","A102","A103","A104","A105","A200","A201","A202","A203","A205","A300","A304","A307","B501","B502","C200","C303","CRDOC"]); 
  sheet.setFrozenRows(3);
  Logger.log("Ajout des logiciels de la A102")
  insertsheet("A102");
  Logger.log("Ajout des logiciels de la A103")
  insertsheet("A103");
  Logger.log("Ajout des logiciels de la A104")
  insertsheet("A104");
  Logger.log("Ajout des logiciels de la A105")
  insertsheet("A105");
  Logger.log("Ajout des logiciels de la A200")
  insertsheet("A200");
  Logger.log("Ajout des logiciels de la A201")
  insertsheet("A201");
  Logger.log("Ajout des logiciels de la A202")
  insertsheet("A202");
  Logger.log("Ajout des logiciels de la A203")
  insertsheet("A203");
  Logger.log("Ajout des logiciels de la A205")
  insertsheet("A205");
  Logger.log("Ajout des logiciels de la A300")
  insertsheet("A300");
  Logger.log("Ajout des logiciels de la A304")
  insertsheet("A304");
  Logger.log("Ajout des logiciels de la A307")
  insertsheet("A307");
  Logger.log("Ajout des logiciels de la B501")
  insertsheet("B501");
  Logger.log("Ajout des logiciels de la B502")
  insertsheet("B502");
  Logger.log("Ajout des logiciels de la C200")
  insertsheet("C200");
  Logger.log("Ajout des logiciels de la C303")
  insertsheet("C303");
  Logger.log("Ajout des logiciels de la CRDOC")
  insertsheet("CRDOC");
  order();
  coche_salle("A102");
  coche_salle("A103");
  coche_salle("A104");
  coche_salle("A105");
  coche_salle("A200");
  coche_salle("A201");
  coche_salle("A202");
  coche_salle("A203");
  coche_salle("A205");
  coche_salle("A300");
  coche_salle("A304");
  coche_salle("A307");
  coche_salle("B501");
  coche_salle("B502");
  coche_salle("C200");
  coche_salle("C303");
  coche_salle("CRDOC");
}

function col_salle(salle){
  switch (salle) {
    case "A102":
      return "C";
      break;
    case "A103":
      return "D";
      break;
    case "A104":
      return "E";
      break;
    case "A105":
      return "F";
      break;
    case "A200":
      return "G";
      break;
    case "A201":
      return "H";
      break;
    case "A202":
      return "I";
      break;
    case "A203":
      return "J";
      break;
    case "A205":
      return "K";
      break;
    case "A300":
      return "L";
      break;
    case "A304":
      return "M";
      break;
    case "A307":
      return "N";
      break;
    case "B501":
      return "O";
      break;
    case "B502":
      return "P";
      break;
    case "C200":
      return "Q";
      break;
    case "C303":
      return "R";
      break;
    case "CRDOC":
      return "S";
  }
}

function sheetId(){
  return("SHEETID");
}

function order(){
  sheet = SpreadsheetApp.openById(sheetId());
  sheet.getRange("A6:Q300").sort(1);
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

function reset() {
  const sheet = SpreadsheetApp.openById(sheetId());
  const lastRow = sheet.getLastRow();
  
  // Si il y a des lignes à supprimer
  if (lastRow > 0) {
    // Supprime toutes les lignes en une seule opération
    sheet.deleteRows(1, lastRow);
  }
}

function coche_salle(salle){
  //salle="A201"
  var fileread = getjson(salle);
  var search = JSON.parse(fileread).result
  // Ouverture du tableau
  Object.keys(search).forEach(item => coche_case(search[item]["name"],salle))
}

function coche_case(soft,salle){
  soft_row = isDansletab(soft);
  salle_colone = col_salle(salle)
  cellule = salle_colone + soft_row;
  //Logger.log("Cellule à colorer : " + cellule)
  sheet = SpreadsheetApp.openById(sheetId());
  sheet.getRange(cellule).setBackgroundColor('#1A9900');
}

function isDansletab(searchString) {
  var sh = SpreadsheetApp.openById(sheetId());
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
    //Logger.log("Ajout de " + nom +" "+version)
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
  search = search_in_salle(soft,"C303")
  if(search != false){
    liste = liste + " - C303<br>";
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