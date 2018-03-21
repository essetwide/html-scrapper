const Navigation = require('./Navigation');

const navigations = [];

function register(pattern, navigation) {
  navigations.push({ pattern, navigation });
}

function check(url) {
  const { navigation } = navigations
    .filter(({ pattern }) => url.match(pattern))[0];

  if (navigation) {
    return navigation.parse(url);
  } else throw new Error();
}

module.exports = {
  Navigation,
  register,
  check,
};