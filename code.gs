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
  // ... existing code ...
  coche_salle("CRDOC");
  setColumnWidths();
  setFrozenRowsAndColumns();
}

// ... existing code ...

function setFrozenRowsAndColumns() {
  var sheet = SpreadsheetApp.openById(sheetId()).getActiveSheet();
  sheet.setFrozenRows(3); // Fixer les 3 premières lignes
  sheet.setFrozenColumns(2); // Fixer les 2 premières colonnes
}

// ... existing code ...
