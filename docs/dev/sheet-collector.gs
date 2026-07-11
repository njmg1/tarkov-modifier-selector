/**
 * KORD BREACH — build-stats collector (Google Apps Script).
 *
 * Receives one row per explicit save from the web app (index.html's
 * sendToSheet) and appends it to the bound spreadsheet. No login, no PII
 * beyond an anonymous per-browser id the client generates.
 *
 * ── Setup (one time) ──────────────────────────────────────────────────────
 * 1. Create a Google Sheet. Extensions → Apps Script.
 * 2. Paste this whole file, save.
 * 3. Deploy → New deployment → type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Copy the /exec URL it gives you.
 * 4. Put that URL into SHEET_URL in docs/index.html, then commit + deploy.
 *
 * The client POSTs JSON as text/plain (no-cors, fire-and-forget), so it never
 * reads a response — doPost just needs to not throw.
 *
 * Columns written: 수신시각 | 클라이언트시각 | cid | 퍽 | ids | 합계 | 언어 | 버전 | code
 */

var HEADERS = ['수신시각', '클라이언트시각', 'cid', '퍽', 'ids', '합계', '언어', '버전', 'code'];

function doPost(e) {
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    var clientTs = d.ts ? new Date(Number(d.ts)) : '';
    sheet.appendRow([
      new Date(),          // server receive time
      clientTs,            // client-reported time
      String(d.cid || ''),
      String(d.perks || ''),
      String(d.ids || ''),
      d.sum,
      String(d.lang || ''),
      String(d.ver || ''),
      String(d.code || ''),
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// A GET is handy to confirm the deployment is live in a browser.
function doGet() {
  return json_({ ok: true, service: 'kord-breach collector' });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
