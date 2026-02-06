const fs = require('fs');
const path = require('path');
const notesDir = path.join(__dirname, '../../notes');

if (!fs.existsSync(notesDir)) fs.mkdirSync(notesDir);

async function saveNote({ content, date }) {
  const filename = `note_${Date.now()}.json`;
  fs.writeFileSync(path.join(notesDir, filename), JSON.stringify({ content, date }));
}

async function loadNotes() {
  return fs.readdirSync(notesDir)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const data = JSON.parse(fs.readFileSync(path.join(notesDir, f)));
      return { filename: f, content: data.content };
    });
}

async function deleteNote(filename) {
  fs.unlinkSync(path.join(notesDir, filename));
}

module.exports = { saveNote, loadNotes, deleteNote };