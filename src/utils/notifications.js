function notify(title, body) {
  new Notification(title, { body });
}

module.exports = { notify };