// ===================== WINDOWS =====================
const welcome_window = document.querySelector("#window");
const notetaker_window = document.querySelector("#notetaker");
const clicker_window = document.querySelector("#clicker");
const cursor_changer_window = document.querySelector("#CursorChanger");
const calculator_window = document.querySelector("#calculator");

// ===================== CURSOR =====================
const cursors = {
  default: document.getElementById("default_cursor"),
  pointer: document.getElementById("pointer_cursor"),
  crosshair: document.getElementById("crosshair_cursor")
};

let activeCursor = "default";

function setCursor(type) {
  activeCursor = type;

  Object.values(cursors).forEach(c => {
    if (c) c.style.display = "none";
  });

  if (cursors[type]) {
    cursors[type].style.display = "block";
  }
}

document.addEventListener("mousemove", (e) => {
  const c = cursors[activeCursor];
  if (!c) return;
  c.style.left = e.clientX + "px";
  c.style.top = e.clientY + "px";
});

// ===================== DRAG FIX =====================
function drag_element(element) {
  if (!element) return;

  let offsetX = 0;
  let offsetY = 0;
  let dragging = false;

  const header = document.getElementById(element.id + "header");
  const target = header || element;

  target.onmousedown = (e) => {
    dragging = true;

    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;

    document.onmousemove = move;
    document.onmouseup = stop;
  };

  function move(e) {
    if (!dragging) return;
    element.style.left = (e.clientX - offsetX) + "px";
    element.style.top = (e.clientY - offsetY) + "px";
  }

  function stop() {
    dragging = false;
    document.onmousemove = null;
    document.onmouseup = null;
  }
}

// ===================== WINDOW CONTROL =====================
function open_window(el) {
  if (el) el.style.display = "block";
}

function close_window(el) {
  if (el) el.style.display = "none";
}

// ===================== ICON CLICK =====================
function icon_tap(el) {
  const target = document.getElementById(el.dataset.target);
  if (target) open_window(target);
}

// ===================== CLOCK =====================
function update_time() {
  const t = document.querySelector("#TIME");
  if (t) t.innerHTML = new Date().toLocaleString();
}
setInterval(update_time, 1000);

// ===================== CALCULATOR =====================
const calcDisplay = document.getElementById("calcDisplay");

function appendCalc(v) {
  calcDisplay.value += v;
}

function clearCalc() {
  calcDisplay.value = "";
}

function deleteCalc() {
  calcDisplay.value = calcDisplay.value.slice(0, -1);
}

function calculateCalc() {
  try {
    calcDisplay.value = eval(calcDisplay.value);
  } catch {
    calcDisplay.value = "Error";
  }
}

// ===================== START =====================
window.addEventListener("load", () => {

  const windows = [
    welcome_window,
    notetaker_window,
    clicker_window,
    cursor_changer_window,
    calculator_window
  ];

  windows.forEach(w => drag_element(w));

  setCursor("default");
  update_time();

  // ===================== CURSOR BUTTONS =====================
  document.getElementById("default_cursor_btn")
    ?.addEventListener("click", () => setCursor("default"));

  document.getElementById("pointer_cursor_btn")
    ?.addEventListener("click", () => setCursor("pointer"));

  document.getElementById("crosshair_cursor_btn")
    ?.addEventListener("click", () => setCursor("crosshair"));

  // ===================== CLOSE BUTTONS (ALL FIXED) =====================
  document.getElementById("welcome_close")
    ?.addEventListener("click", (e) => {
      e.stopPropagation();
      close_window(welcome_window);
    });

  document.getElementById("notetaker_close")
    ?.addEventListener("click", (e) => {
      e.stopPropagation();
      close_window(notetaker_window);
    });

  document.getElementById("clicker_close")
    ?.addEventListener("click", (e) => {
      e.stopPropagation();
      close_window(clicker_window);
    });

  document.getElementById("CursorChanger_close")
    ?.addEventListener("click", (e) => {
      e.stopPropagation();
      close_window(cursor_changer_window);
    });

  document.getElementById("calculator_close")
    ?.addEventListener("click", (e) => {
      e.stopPropagation();
      close_window(calculator_window);
    });
});