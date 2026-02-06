export function createNoteCard(note, onClick) {
  const div = document.createElement('div');
  div.classList.add('noteCard');
  div.dataset.filename = note.filename;
  div.dataset.tags = note.tags ? note.tags.join(',') : '';
  
  div.innerHTML = `
    <strong>${note.filename}</strong>
    <p>${note.content.substring(0, 50)}...</p>
    <div class="noteTags">${note.tags ? note.tags.map(t => `<span class="tag">${t}</span>`).join(' ') : ''}</div>
  `;

  div.addEventListener('click', () => onClick(note));
  return div;
}