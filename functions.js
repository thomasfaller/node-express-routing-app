exports.success = result => {
  return { status: "success", result };
};

exports.error = message => {
  return { status: "error", message };
};

exports.getIndex = (array, id) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == id) return i;
  }
  return "Wrong id";
};

exports.createId = array => array[array.length - 1].id + 1;
