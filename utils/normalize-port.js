module.exports = function normalizePort(val) {
  const tempPort = parseInt(val, 10);

  if (Number.isNaN(tempPort)) return val;

  if (tempPort >= 0) return tempPort;
  return false;
};
