const fs = require('fs');
const path = require('path');
const { BrowserWindow } = require('electron');

function exportPDF(content, filename='note.pdf') {
  const win = new BrowserWindow({show:false});
  win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`<pre>${content}</pre>`));
  win.webContents.on('did-finish-load', () => {
    win.webContents.printToPDF({}).then(data => {
      fs.writeFileSync(path.join(__dirname, '../../notes', filename), data);
      win.close();
    });
  });
}

function exportTXT(content, filename='note.txt') {
  fs.writeFileSync(path.join(__dirname, '../../notes', filename), content);
}

module.exports = { exportPDF, exportTXT };