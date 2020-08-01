let LimitYear = 2017,
  options = "";

for (let Y = LimitYear; Y >= 1990; Y--) {
  options += "<option>" + Y + "</option>";
}

$("#years").append(options);
