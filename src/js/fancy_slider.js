$("#minus").click(function(event) {
  zoom("out");
});

$("#plus").click(function(event) {
  zoom("in");
});

$("#range").on('input change', function(event) {
  $('#output').text($(event.currentTarget).val());
});

function zoom(direction) {
  var slider = $("#range");
  var step = parseInt(slider.attr('step'), 10);
  var currentSliderValue = parseInt(slider.val(), 10);
  var newStepValue = currentSliderValue + step;

  if (direction === "out") {
    newStepValue = currentSliderValue - step;
  } else {
    newStepValue = currentSliderValue + step;
  }

  slider.val(newStepValue).change();
};
