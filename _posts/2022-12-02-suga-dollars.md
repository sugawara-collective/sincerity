---
layout: work
title: Suga Dollars
relationships: [Sugawara & Karasuno]
creator: Pep
permalink: /2022/visual/:title
scripts: [/assets/js/slides.js]
---
<div class="fullscreen-image-slider">
  <div class="slides" role="region" aria-label="FullScreen Pictures" data-slide>
    <div class="slide-buttons">
      <button class="slide-previous hide" onclick="prevSlide()">
        <span class="show-for-sr">Back</span>
      </button>
      <button class="slide-next" onclick="nextSlide()">
        <span class="show-for-sr">Next</span>
      </button>
    </div>
    <ul class="slide-container">
      <li data-slide=1 class="is-active slide">
        <img class="visual" id="comic_pep_1" src="/assets/images/watermark.png" alt="page1">
      </li>
      <li data-slide=2 class="slide">
        <img class="visual" id="comic_pep_2" src="/assets/images/watermark.png" alt="page2">
      </li>
      <li data-slide=3 class="slide">
        <img class="visual" id="comic_pep_3" src="/assets/images/watermark.png" alt="page3">
      </li>
    </ul>
    <div class="slide-buttons">
      <button class="slide-previous hide" onclick="prevSlide()">
        <span class="show-for-sr">Back</span>
      </button>
      <button class="slide-next" onclick="nextSlide()">
        <span class="show-for-sr">Next</span>
      </button>
    </div>
  </div>
</div>