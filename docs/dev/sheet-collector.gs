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
 * Columns written: 수신시각 | 클라이언트시각 | cid | 퍽 | ids | 합계 | 언어 | 버전 | code | 시즌
 *
 * ── Both seasons share this one endpoint ─────────────────────────────────
 * docs/index.html (season 1, KORD BREACH) and docs/season2/index.html
 * (season 2, UNTAR CONTROL) post here. Two ways to tell them apart:
 *
 *   - 버전: season 1 sends a bare '0.25'; season 2 sends 'S2 2.0'.
 *     This works on an ALREADY DEPLOYED collector — nothing to redeploy.
 *   - 시즌: the last column below. Season 2 sends season:2; season 1 sends
 *     nothing, so its rows read 1. This needs a redeploy of this script.
 *
 * Redeploying is optional. An existing sheet keeps its old 9-column header
 * (HEADERS is only written to an empty sheet), so after a redeploy the season
 * values land in column 10 under a blank header — type 시즌 in there by hand.
 * Rows written before the redeploy stay blank in that column; filter those by
 * 버전 instead.
 */

var HEADERS = ['수신시각', '클라이언트시각', 'cid', '퍽', 'ids', '합계', '언어', '버전', 'code', '시즌'];

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
      Number(d.season) || 1,   // season 1 predates this field and sends nothing
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// A GET is handy to confirm the deployment is live in a browser.
function doGet() {
  return json_({ ok: true, service: 'kord-breach collector' });   // name kept: season 1 and 2 share it
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
