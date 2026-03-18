function doPost(e) {
    try {
        var data;
        try {
            data = JSON.parse(e.postData.contents);
        } catch (parseError) {
            data = e.parameter;
        }

        var ss = SpreadsheetApp.getActiveSpreadsheet();
        var timestamp = new Date();
        // Форматуємо дату для зручного читання
        var formattedDate = Utilities.formatDate(timestamp, ss.getSpreadsheetTimeZone(), "dd.MM.yyyy HH:mm:ss");

        // Перевіряємо, чи це лід з нового практикуму (наявність поля telegram)
        var isPracticum = (data.telegram !== undefined || data.source === "Hero Popup");
        var sheetName = isPracticum ? "Practicum_Leads" : "Valeria_VSL_Leads";
        var sheet = ss.getSheetByName(sheetName);

        if (isPracticum) {
            // Нова логіка для практикуму (на 10 колонок з Telegram)
            var headers = [
                "Дата/Час",
                "Ім'я",
                "Telegram",
                "Телефон",
                "utm_source",
                "utm_medium",
                "utm_campaign",
                "utm_term",
                "utm_content",
                "Повне посилання"
            ];

            if (!sheet) {
                sheet = ss.insertSheet(sheetName);
                sheet.appendRow(headers);
                var headerRange = sheet.getRange(1, 1, 1, headers.length);
                headerRange.setFontWeight("bold");
                headerRange.setBackground("#ce103e");
                headerRange.setFontColor("#ffffff");
                headerRange.setHorizontalAlignment("center");
                sheet.setFrozenRows(1);

                sheet.setColumnWidth(1, 150);
                sheet.setColumnWidth(2, 150);
                sheet.setColumnWidth(3, 150); // Telegram
                sheet.setColumnWidth(4, 150); // Телефон
                for (var i = 5; i <= 9; i++) sheet.setColumnWidth(i, 120);
                sheet.setColumnWidth(10, 300);
            }

            sheet.appendRow([
                formattedDate,
                data.name || "",
                data.telegram || "",
                data.phone || "",
                data.utm_source || "",
                data.utm_medium || "",
                data.utm_campaign || "",
                data.utm_term || "",
                data.utm_content || "",
                data.page_url || ""
            ]);

        } else {
            // Стара логіка для VSL (на 9 колонок)
            var headers = [
                "Дата/Час",
                "Ім'я",
                "Телефон",
                "utm_source",
                "utm_medium",
                "utm_campaign",
                "utm_term",
                "utm_content",
                "Повне посилання"
            ];

            if (!sheet) {
                sheet = ss.insertSheet(sheetName);
                sheet.appendRow(headers);
                var headerRange = sheet.getRange(1, 1, 1, headers.length);
                headerRange.setFontWeight("bold");
                headerRange.setBackground("#ce103e");
                headerRange.setFontColor("#ffffff");
                headerRange.setHorizontalAlignment("center");
                sheet.setFrozenRows(1);

                sheet.setColumnWidth(1, 150);
                sheet.setColumnWidth(2, 150);
                sheet.setColumnWidth(3, 150); // Телефон
                for (var i = 4; i <= 8; i++) sheet.setColumnWidth(i, 120);
                sheet.setColumnWidth(9, 300);
            }

            sheet.appendRow([
                formattedDate,
                data.name || "",
                data.phone || "",
                data.utm_source || "",
                data.utm_medium || "",
                data.utm_campaign || "",
                data.utm_term || "",
                data.utm_content || "",
                data.page_url || ""
            ]);
        }

        return ContentService.createTextOutput(JSON.stringify({
            "status": "success",
            "message": "Lead added successfully to " + sheetName
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({
            "status": "error",
            "message": error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

function doOptions(e) {
    var headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400"
    };
    return ContentService.createTextOutput("").setHeaders(headers);
}
