back_buttons = $('button.slide-previous');
next_buttons = $('button.slide-next');
current_slide = $('li.slide.is-active');
total_slides = $('li.slide').length;

current_id = parseInt(current_slide[0].dataset.slide);

if (current_id == 1) {
  back_buttons.each(function() {
    $(this).addClass('hide');
  });
} else if (current_id == total_slides) {
  next_buttons.each(function() {
    $(this).addClass('hide');
  });
}

function nextSlide() {
  if (current_id == 1) {
    back_buttons.each(function() {
      $(this).removeClass('hide');
    });
  }
  if (current_id < total_slides) {
    next_slide = current_slide.next();
    current_slide.removeClass('is-active');
    current_slide = next_slide;
    current_slide.addClass('is-active');
    current_id = parseInt(current_slide[0].dataset.slide);
  }
  if (current_id == total_slides) {
    next_buttons.each(function() {
      $(this).addClass('hide');
    });
  }
}

function prevSlide() {
  if (current_id == total_slides) {
    next_buttons.each(function() {
      $(this).removeClass('hide');
    });
  }
  if (current_id > 1 ) {
    prev_slide = current_slide.prev();
    current_slide.removeClass('is-active');
    current_slide = prev_slide;
    current_slide.addClass('is-active');
    current_id = parseInt(current_slide[0].dataset.slide);
  }
  if (current_id == 1) {
    back_buttons.each(function() {
      $(this).addClass('hide');
    });
  }
}
