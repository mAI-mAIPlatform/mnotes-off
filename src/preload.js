const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mNotesAPI', {
  saveNote: (note) => ipcRenderer.invoke('save-note', note),
  loadNotes: () => ipcRenderer.invoke('load-notes'),
  deleteNote: (filename) => ipcRenderer.invoke('delete-note', filename),
  getThemes: () => ipcRenderer.invoke('get-themes')
});