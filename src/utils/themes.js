const fs = require('fs');
const path = require('path');

const configFile = path.join(__dirname, '../../config.json');

// Charger le thème depuis config
function getTheme() {
  if (!fs.existsSync(configFile)) return 'light';
  const config = JSON.parse(fs.readFileSync(configFile));
  return config.theme || 'light';
}

// Sauvegarder le thème dans config
function setTheme(theme) {
  let config = {};
  if (fs.existsSync(configFile)) config = JSON.parse(fs.readFileSync(configFile));
  config.theme = theme;
  fs.writeFileSync(configFile, JSON.stringify(config));
}

module.exports = { getTheme, setTheme };