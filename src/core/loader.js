module.exports = function (
  text = "",
  chars = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"],
  delay = 100
) {
  let initial = 0;
  if (delay === 0) console.log("STOP");
  return setInterval(function () {
    process.stdout.write("\r" + chars[initial++] + " " + text);
    initial = initial % chars.length;
  }, delay);
};
