"use strict";

{
  const menu = document.getElementById("header-menu");

  class Menu {
    constructor(elem) {
      elem.onclick = this.onClick.bind(this);
    }

    save() {
      alert("Saveing");
    }

    load() {
      alert("Loading");
    }

    search() {
      alert("Searching");
    }

    onClick(event) {
      let action = event.target.dataset.action;

      if (action) {
        this[action]();
      }
    }
  }

  function sayHi() {
    alert(1);
  }

  new Menu(menu);
}

{
  const table = document.getElementById("bagua-table");
  let selectedTd;

  table.onclick = function (event) {
    let target = event.target.closest("TD"); // где был клик?

    if (!target) return; // не на TD? тогда не интересует

    if (!table.contains(target)) return;

    highlight(target); // подсветить TD
  };

  function highlight(td) {
    if (selectedTd) {
      // убрать существующую подсветку, если есть
      selectedTd.classList.remove("highlight");
    }
    selectedTd = td;
    selectedTd.classList.add("highlight"); // подсветить новый td
  }
}

{
  const lis = document.querySelectorAll(".tree li");

  for (let li of lis) {
    const span = document.createElement("span");
    span.className = "list-title";

    span.append(li.firstChild);
    li.prepend(span);
  }
}

{
  function toggleElem(event) {
    if (!event.target.classList.contains("list-title")) return;

    const li = event.target.closest("li");

    const ul = li.querySelector("ul");
    if (!ul) return;

    event.target.classList.toggle("toggle-button-hidden");
    ul.classList.toggle("hidden");
  }
  const asideMenu = document.querySelector(".aside-menu");

  asideMenu.addEventListener("click", toggleElem);
}

{
  const grid = document.getElementById("grid");
  grid.onclick = function (e) {
    if (!e.target.dataset.type) return;

    let th = e.target;

    sortByCells(th.cellIndex, th.dataset.type);
  };

  function sortByCells(colNum, type) {
    const tbody = grid.querySelector(".user-table tbody");
    const rowsArray = Array.from(tbody.rows);
    let compare;

    switch (type) {
      case "number":
        compare = function (rowA, rowB) {
          return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
        };
        break;
      case "string":
        compare = function (rowA, rowB) {
          return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML
            ? 1
            : -1;
        };
        break;
    }

    rowsArray.sort(compare);
    tbody.append(...rowsArray);
  }
}

{
  function showTip(e) {
    if (!e.target.dataset.tooltip) return;

    const tooltip = e.target.dataset.tooltip;
    spanTip = document.createElement("span");
    spanTip.className = "tooltip";
    spanTip.innerHTML = tooltip;
    document.body.prepend(spanTip);

    let coords = e.target.getBoundingClientRect();
    let centerX = (e.target.offsetWidth - spanTip.offsetWidth) / 2;

    if (coords.left + centerX < 0) {
      spanTip.style.left = "5px";
    } else {
      spanTip.style.left = coords.left + centerX + "px";
    }

    if (coords.top - spanTip.offsetHeight - 5 < 0) {
      spanTip.style.top = coords.top + coords.height + 5 + "px";
    } else {
      spanTip.style.top = coords.top - spanTip.offsetHeight - 5 + "px";
    }
  }

  function removeTip(e) {
    if (!e.target.dataset.tooltip) return;

    spanTip.remove();
  }

  const tipsSection = document.querySelector(".tips");
  let spanTip;
  document.addEventListener("mouseover", showTip);
  document.addEventListener("mouseout", removeTip);
}
