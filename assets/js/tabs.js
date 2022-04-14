var tabsWithContent = (function () {
  var tabs = document.querySelectorAll('.tabs li');
  var tabsContent = document.querySelectorAll('.tab-content');

  var deactvateAllTabs = function () {
    tabs.forEach(function (tab) {
      tab.classList.remove('is-active');
    });
  };

  var hideTabsContent = function () {
    tabsContent.forEach(function (tabContent) {
      tabContent.classList.remove('is-active');
    });
  };

  var activateTabsContent = function (tab) {
    tabsContent[getIndex(tab)].classList.add('is-active');
  };

  var getIndex = function (el) {
    return [...el.parentElement.children].indexOf(el);
  };

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      deactvateAllTabs();
      hideTabsContent();
      tab.classList.add('is-active');
      activateTabsContent(tab);
    });
  })

  tabs[0].click();
})();