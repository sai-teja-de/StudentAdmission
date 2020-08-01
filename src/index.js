let myArray = [];

//ajax api call using jquery
$.ajax({
  method: "GET",
  url: "data.json",
  success: function (response) {
    myArray = response;
    buildTable(myArray);
  },
});

//sorting names in order
$("th").on("click", function () {
  var column = $(this).data("column");
  var order = $(this).data("order");
  var text = $(this).html();
  text = text.substring(0, text.length - 1);

  if (order == "desc") {
    $(this).data("order", "asc");
    myArray = myArray.sort((a, b) => (a[column] > b[column] ? 1 : -1));
    text += "&#9660";
  } else {
    $(this).data("order", "desc");
    myArray = myArray.sort((a, b) => (a[column] < b[column] ? 1 : -1));
    text += "&#9650";
  }
  $(this).html(text);
  buildTable(myArray);
});

//extracting highest marks
const getHighestMarks = (data) => {
  let marks = [];
  for (var i = 0; i < data.length; i++) {
    let TotalMarks =
      Number(data[i].marks.Maths) +
      Number(data[i].marks.English) +
      Number(data[i].marks.Science);
    marks.push(TotalMarks);
  }
  return Math.max(...marks);
};

//updating status of students
const getStatus = (marks, HigMarks) => {
  const TotalMarks = getTotalMarks(marks);
  if (TotalMarks === HigMarks) {
    return "Topper";
  } else if (marks.Maths < 20 || marks.English < 20 || marks.Science < 20) {
    return "Fail";
  } else {
    return "Pass";
  }
};

//sum of marks of students
const getTotalMarks = (marks) => {
  let TotalMarks =
    Number(marks.Maths) + Number(marks.English) + Number(marks.Science);
  return TotalMarks;
};

//updating color
const getColor = (data, HigMarks) => {
  const status = getStatus(data, HigMarks);
  if (status === "Fail") return "red";
  if (status === "Pass") return "green";
  if (status === "Topper") return "blue";
};

//filling the data to the table
const buildTable = (data) => {
  let table = document.getElementById("myTable");
  table.innerHTML = "";
  const HigMarks = getHighestMarks(data);
  for (var i = 0; i < data.length; i++) {
    let row = `<tr>
								<td style="color:${getColor(data[i].marks, HigMarks)}">${
      data[i].name[0].toUpperCase() + data[i].name.slice(1)
    }</td>
								<td style="color:${getColor(data[i].marks, HigMarks)}">${
      data[i].rollNumber
    }</td>
                <td style="color:${getColor(
                  data[i].marks,
                  HigMarks
                )}">${getTotalMarks(data[i].marks)}</td>
                <td style="color:${getColor(data[i].marks, HigMarks)}">
                ${getStatus(data[i].marks, HigMarks)}</td>
							</tr>`;
    table.innerHTML += row;
  }
};
