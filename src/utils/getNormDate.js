exports.getNormDate = milsec => {
  const dateObj = new Date(milsec);
  return dateObj.toLocaleString('ru', {
    hour: 'numeric',
    minute: 'numeric'
  });
};
