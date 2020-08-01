let myArray = [];

$.ajax({
  method: "GET",
  url: "data.json",
  success: function (response) {
    myArray = response;
    buildTable(myArray);
  },
});

const CreateMarks = () => {
  let Marks = [];
  for (let i = 0; i <= myArray.length; ++i) {
    Marks.push(
      Number(myArray[i].marks.English) +
        Number(myArray[i].marks.Science) +
        Number(myArray[i].marks.Maths).toString()
    );
  }
  return Marks;
};

const getStatus = (marks) => {
  const HigMarks = Math.max(CreateMarks);
  console.log(HigMarks);
  if (CreateMarks === HigMarks) {
    return "Topper";
  } else if (marks.Maths < 20 || marks.English < 20 || marks.Science < 20) {
    return "Fail";
  } else {
    return "Pass";
  }
};

const buildTable = (data) => {
  let table = document.getElementById("myTable");
  for (var i = 0; i < data.length; i++) {
    let TotalMarks =
      Number(data[i].marks.Maths) +
      Number(data[i].marks.English) +
      Number(data[i].marks.Science);
    //console.log(TotalMarks);
    const getStatus = (marks) => {
      const HigMarks = Math.max(TotalMarks);
      console.log(HigMarks);
      if (TotalMarks === HigMarks) {
        return "Topper";
      } else if (marks.Maths || marks.English || marks.Science < 20) {
        return "Fail";
      } else {
        return "Pass";
      }
    };
    let row = `<tr>
								<td>${data[i].name[0].toUpperCase() + data[i].name.slice(1)}</td>
								<td>${data[i].rollNumber}</td>
                <td>${TotalMarks}</td>
                  <td>${getStatus(data[i].marks)}</td>
							</tr>`;
    table.innerHTML += row;
  }
};
