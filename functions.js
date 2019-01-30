exports.success = result => {
  return { status: "success", result };
};

exports.error = message => {
  return { status: "error", message };
};
