$(document).ready(function(){
  tableCreate(16,16);

  $("#userClear").click(function(){
    $("td").removeClass("colored");
  });

  $("#userSubmit").click(function(){
    tableCreate($("#rows").val(),$("#columns").val());
  })



  function tableCreate(row,col) {
    $("#tableContainer").empty();
    $("#tableContainer").append("<tbody>");
    for (var i = 0; i < row; i++) {
      $("#tableContainer").append("<tr>");
      for (var j = 0; j < col; j++){
        $("#tableContainer tr").eq(i).append("<td></td>");
      };
      $("#tableContainer").append("</tr>");
    };
    $("#tableContainer").append("</tbody>");
    $("td").mouseover(function(){
      $(this).css("background-color", $("#color").val());
    });
  };
});
