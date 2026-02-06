// Accès aux fonctions preload
const { saveNote, loadNotes, deleteNote } = window.mNotesAPI;

const noteArea = document.getElementById('noteArea');
const saveBtn = document.getElementById('saveBtn');
const deleteBtn = document.getElementById('deleteBtn');
const notesList = document.getElementById('notesList');

// Sauvegarde note
saveBtn.addEventListener('click', async () => {
  const content = noteArea.value;
  if (!content) return alert('Écris quelque chose !');
  await saveNote({ content, date: new Date().toISOString() });
  alert('Note sauvegardée ✅');
  noteArea.value = '';
  renderNotes();
});

// Supprimer note
deleteBtn.addEventListener('click', async () => {
  const selected = notesList.querySelector('.selected');
  if (!selected) return alert('Sélectionne une note !');
  await deleteNote(selected.dataset.filename);
  renderNotes();
});

// Afficher les notes
async function renderNotes() {
  const notes = await loadNotes();
  notesList.innerHTML = '';
  notes.forEach(n => {
    const div = document.createElement('div');
    div.classList.add('noteCard');
    div.dataset.filename = n.filename;
    div.innerHTML = `<strong>${n.filename}</strong><p>${n.content.substring(0,50)}...</p>`;
    div.addEventListener('click', () => {
      noteArea.value = n.content;
      notesList.querySelectorAll('.noteCard').forEach(el => el.classList.remove('selected'));
      div.classList.add('selected');
    });
    notesList.appendChild(div);
  });
}

// Initial render
renderNotes();