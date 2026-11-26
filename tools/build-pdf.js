// Yazdırılabilir vaka setlerini PDF'e çevirir: node tools/build-pdf.js  (veya npm run pdf)
// Microsoft Edge ya da Google Chrome gerekir. Yolu BROWSER ortam değişkeniyle de verebilirsiniz.
"use strict";
var fs = require("fs");
var path = require("path");
var os = require("os");
var url = require("url");
var cp = require("child_process");

var root = path.resolve(__dirname, "..");
var candidates = [
  process.env.BROWSER,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"
].filter(Boolean);
var browser = candidates.filter(function (p) { return fs.existsSync(p); })[0];
if (!browser) { console.error("Edge/Chrome bulunamadı. BROWSER=/yol/tarayici ile belirtin."); process.exit(1); }

var ids = fs.readdirSync(path.join(root, "cases")).filter(function (f) { return /\.js$/.test(f); })
  .map(function (f) { return require(path.join(root, "cases", f)).id; });

fs.mkdirSync(path.join(root, "pdf"), { recursive: true });
var profile = fs.mkdtempSync(path.join(os.tmpdir(), "pdf-profile-"));

ids.forEach(function (id) {
  var out = path.join(root, "pdf", id + ".pdf");
  var page = url.pathToFileURL(path.join(root, "print.html")).href + "?vaka=" + encodeURIComponent(id);
  cp.execFileSync(browser, [
    "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--allow-file-access-from-files",
    "--user-data-dir=" + profile, "--virtual-time-budget=15000",
    "--print-to-pdf=" + out, page
  ], { stdio: "ignore" });
  console.log("yazıldı: " + path.relative(root, out) + " (" + Math.round(fs.statSync(out).size / 1024) + " KB)");
});
