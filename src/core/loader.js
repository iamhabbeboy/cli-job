module.exports = function (
  text = "",
  chars = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"],
  delay = 100
) {
  let initial = 0;

  return setInterval(function () {
    process.stdout.write("\r" + chars[initial++] + " " + text);
    initial = initial % chars.length;
  }, delay);
};
