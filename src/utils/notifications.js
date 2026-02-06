function notify(title, body) {
  if (Notification.permission === 'granted') {
    new Notification(title, { body });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if(permission === 'granted') new Notification(title, { body });
    });
  }
}

// Exemple : rappel pour note importante
function scheduleReminder(noteName, delayMs) {
  setTimeout(() => {
    notify('Rappel mNotes', `Ta note "${noteName}" doit être consultée !`);
  }, delayMs);
}

module.exports = { notify, scheduleReminder };