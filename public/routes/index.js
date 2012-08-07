define(["templates/navbar"], function (navbar) {
  return function (args, view) {
    $("#navbar").html(navbar());
    $("#content").html(view());
  };
});