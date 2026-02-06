const fs = require('fs');
const path = require('path');
const notesDir = path.join(__dirname, '../../notes');

function getTags() {
  const notes = fs.readdirSync(notesDir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(notesDir, f))));
  const allTags = notes.flatMap(n => n.tags || []);
  return [...new Set(allTags)]; // unique tags
}

function addTag(noteFile, tag) {
  const notePath = path.join(notesDir, noteFile);
  const note = JSON.parse(fs.readFileSync(notePath));
  note.tags = note.tags || [];
  if(!note.tags.includes(tag)) note.tags.push(tag);
  fs.writeFileSync(notePath, JSON.stringify(note));
}

module.exports = { getTags, addTag };