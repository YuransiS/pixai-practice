function doPost(e) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = "Practicum_Leads"; // Default
    
    try {
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

        if (!ss) {
            throw new Error("Скрипт не прив'язаний до таблиці. Використовуйте 'File > Project Settings' або прив'яжіть через контейнер.");
        }

        var timestamp = new Date();
        var formattedDate = Utilities.formatDate(timestamp, ss.getSpreadsheetTimeZone() || "GMT+2", "dd.MM.yyyy HH:mm:ss");

        // Визначаємо тип ліда по source або type
        var isPracticum = (data.source === "Hero Popup" || data.type === "practicum");
        sheetName = isPracticum ? "Practicum_Leads" : "Valeria_VSL_Leads";
        
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


        return ContentService.createTextOutput(JSON.stringify({
            "status": "success",
            "message": "Lead added to " + sheetName
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
            "message": error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}


