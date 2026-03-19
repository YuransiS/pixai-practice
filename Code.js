// ==========================================
// НАЛАШТУВАННЯ
// ==========================================

// ЯКЩО СКРИПТ НЕ ПРИВ'ЯЗАНИЙ ДО ТАБЛИЦІ (Standalone):
// 1. Відкрийте вашу Google Таблицю
// 2. Скопіюйте ID з URL (між /d/ та /edit)
// 3. Вставте його сюди:
var SPREADSHEET_ID = ""; // ПРИКЛАД: "1a2b3c4d5e6f7g8h9i0j"

// ==========================================
// ОСНОВНА ЛОГІКА
// ==========================================

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    "status": "online",
    "message": "API is working. Send POST request to add leads."
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
    var ss = null;
    try {
        // Пробуємо отримати таблицю
        if (SPREADSHEET_ID && SPREADSHEET_ID !== "") {
          ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        } else {
          ss = SpreadsheetApp.getActiveSpreadsheet();
        }
        
        if (!ss) {
            throw new Error("Не вдалося знайти таблицю. Вкажіть SPREADSHEET_ID у коді скрипта.");
        }

        var data = {};
        if (e && e.postData && e.postData.contents) {
            try {
                data = JSON.parse(e.postData.contents);
            } catch (f) {
                data = e.parameter || {};
            }
        } else {
            data = e.parameter || {};
        }

        var timestamp = new Date();
        var formattedDate = Utilities.formatDate(timestamp, ss.getSpreadsheetTimeZone() || "GMT+2", "dd.MM.yyyy HH:mm:ss");

        // Визначаємо тип ліда по source або type
        var isPracticum = (data.source === "Hero Popup" || data.type === "practicum");
        var sheetName = isPracticum ? "Practicum_Leads" : "Valeria_VSL_Leads";
        
        var sheet = ss.getSheetByName(sheetName);

        // Масив заголовків (9 колонок, Telegram видалено)
        var headers = ["Дата/Час", "Ім'я", "Телефон", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "Повне посилання"];
        
        var rowData = [
            formattedDate,
            data.name || "",
            data.phone || "",
            data.utm_source || "",
            data.utm_medium || "",
            data.utm_campaign || "",
            data.utm_term || "",
            data.utm_content || "",
            data.page_url || ""
        ];

        if (!sheet) {
            sheet = ss.insertSheet(sheetName);
            sheet.appendRow(headers);
            var headerRange = sheet.getRange(1, 1, 1, headers.length);
            headerRange.setFontWeight("bold").setBackground("#ce103e").setFontColor("#ffffff").setHorizontalAlignment("center");
            sheet.setFrozenRows(1);
            
            sheet.setColumnWidth(1, 150);
            sheet.setColumnWidth(2, 150);
            for (var i = 3; i <= headers.length; i++) sheet.setColumnWidth(i, 130);
        }

        sheet.appendRow(rowData);
        SpreadsheetApp.flush(); // Гарантуємо запис

        return ContentService.createTextOutput(JSON.stringify({
            "status": "success",
            "message": "Lead added to " + sheetName,
            "data_received": data
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Діагностичне логування прямо в таблицю, якщо щось пішло не так
        try {
            if (ss) {
                var logSheet = ss.getSheetByName("Debug_Logs") || ss.insertSheet("Debug_Logs");
                logSheet.appendRow([new Date(), "ERROR", error.toString(), JSON.stringify(e || {})]);
            }
        } catch (logError) {}

        return ContentService.createTextOutput(JSON.stringify({
            "status": "error",
            "message": error.toString(),
            "stack": error.stack
        })).setMimeType(ContentService.MimeType.JSON);
    }
}



