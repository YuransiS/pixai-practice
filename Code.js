function doPost(e) {
    try {
        var sheetName = "Valeria_VSL_Leads";
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        var sheet = ss.getSheetByName(sheetName);

        // Define the headers we want
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

        // Якщо листа немає, створюємо його і форматуємо
        if (!sheet) {
            sheet = ss.insertSheet(sheetName);

            // Додаємо заголовки
            sheet.appendRow(headers);

            // Красиве форматування першого рядка (заголовків)
            var headerRange = sheet.getRange(1, 1, 1, headers.length);
            headerRange.setFontWeight("bold");
            headerRange.setBackground("#ce103e"); // Фірмовий колір проекту
            headerRange.setFontColor("#ffffff");
            headerRange.setHorizontalAlignment("center");

            // Закріпити перший рядок
            sheet.setFrozenRows(1);

            // Налаштовуємо ширину колонок для зручності
            sheet.setColumnWidth(1, 150); // Дата
            sheet.setColumnWidth(2, 150); // Ім'я
            sheet.setColumnWidth(3, 150); // Telegram
            sheet.setColumnWidth(4, 150); // Телефон
            for (var i = 5; i <= 9; i++) sheet.setColumnWidth(i, 120); // UTMs
            sheet.setColumnWidth(10, 300); // Повне посилання
        }

        var data;
        try {
            data = JSON.parse(e.postData.contents);
        } catch (parseError) {
            data = e.parameter;
        }

        var timestamp = new Date();
        // Форматуємо дату для зручного читання
        var formattedDate = Utilities.formatDate(timestamp, ss.getSpreadsheetTimeZone(), "dd.MM.yyyy HH:mm:ss");

        // Додаємо рядок з даними та UTM мітками
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

// Функція для налаштувань CORS (відповіді на preflight запити)
function doOptions(e) {
    var headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400"
    };
    return ContentService.createTextOutput("").setHeaders(headers);
}
