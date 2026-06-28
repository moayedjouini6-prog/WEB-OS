var content = [
  {
    title: "Welcome!",
    date: "2026/6/12",
    content: generate_note("Hi! Start Writing!", "2025/6/12", "Start Writing Here!")
  },
  {
    title: "Project List",
    date: "2026/6/12",
    content: generate_note("Project List", "2026/6/12", "Project #1: X<br>Project #2: XX<br>Project #3: XXX")
  }
];

function generate_note(heading, date, content){
  return `
  <div class = "first_div">
    <div class = "second_div>
      <p class = "heading_style">${heading}</p>
      <p class = "date_style">${date}</p>
      <div class = "not_style_set">
        <div contenteditable = "true" class = "note_style">
        ${content}
        </div>
      </div>
    </div>
  </div>
  `;
}

const default_cursor = document.getElementById('default_cursor');
const pointer_cursor = document.getElementById('pointer_cursor');
const crosshair_cursor = document.getElementById('crosshair_cursor');

var cucumbers = 0;
var cucumbers_auto_ps = 0;
var cucumber_farm_cost = 15;
var cucumber_farm_cps = 1;
var cucumber_greenhouse_cost = 100;
var cucumber_greenhouse_cps = 10;
var cucumber_lab_cost = 250;
var cucumber_lab_cps = 50;
var cucumber_ai_cost = 1000;
var cucumber_ai_cps = 1500;
var welcome_window = document.querySelector("#window");
var notetaker_window = document.querySelector("#notetaker");
var clicker_window = document.querySelector("#clicker");
var cursor_changer_window = document.querySelector("#CursorChanger");
var select_bar = document.querySelector("#top");
var note_list_container = document.querySelector("#noteList");
var note_contents_container = document.querySelector("#notesContent");
var selected_icon = undefined;
var biggest_index = 10;
var cpc = 1;

//copy pasted from the website that stardance provided: https://jams.hackclub.com/batch/webOS/part-3
function center_window(element){
  if(!element){
    return;
  }
  var original_display = element.style.display;
  element.style.display = "block";
  element.style.margin = "0px";
  element.style.transform = "none";
  var window_width = element.offsetWidth;
  var window_height = element.offsetHeight;
  var screen_width = window.innerWidth;
  var screen_height = window.innerHeight;
  var center_left = (screen_width - window_width) / 2;
  var center_top = (screen_height - window_height) / 2;
  if(center_top < 50){
    center_top = 50;
  }
  if(center_top < 0){
    center_top = 0;
  }
  element.style.position = "absolute";
  element.style.left = "center_left" + "px";
  element.style.top = "center_top" + "px";
  element.style.display = original_display;
}

function drag_element(element){
  if(!element){
    return;
  }
  var initial_x = 0, initial_y = 0; current_x = 0; current_y = 0;
  var header = document.getElementById(element.id + "header");
  if(header){
    header.onmousedown = startDragging;
  }
  else {
    element.onmousedown = startDragging;
  }
}

// Step 1: Define a function called `drag_element` that makes an HTML element draggable.
function drag_element(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDrag_element`).
    document.onmouseup = stopDragging;
    document.onmousemove = drag_element;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function drag_element(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
} //end of copy paste

function update_time(){
  var time = new Date().toLocaleString();
  var text = document.querySelector("#TIME");
  if(text){
    text.innerHTML = time;
  }
}

setInterval(update_time, 1000);
update_time()

function open_window(element){
  if(!element){
    return;
  }
  element.style.display = "block";
  biggest_index++;
  if(select_bar) select_bar.zIndex = biggest_index + 1;
}

function close_window(element){
  if(element){
    element.style.display = "none";
  }
}

function select_element(element){
  if(!element){
    return;
  }
  element.classList.add("selected");
  selected_icon = element;
}

function deselect_element(element){
  if(!element){
    return;
  }
  element.classList.remove("selected");
  selected_icon = undefined;
}

function layer(element){
  if(!element){
    return;
  }
  biggest_index++;
  element.style.zIndex = biggest_index;
}

function icon_tap(element){
  if(element.classList.contains("selected")){
    var target_id = element.getAttribute("data-target");
    var target_window = document.getElementById(target_id);
    if(target_window){
      open_window(target_window);
    }
    deselect_element(element);
  }
  else{
    var prev = document.querySelector(".selected");
    if(prev){
      prev.classList.remove("selected");
    }
    select_element(element);
  }
}

if (welcome_window) welcome_window.addEventListener("mousedown", () => layer(welcome_window));

if (notetaker_window) notetaker_window.addEventListener("mousedown", () => layer(notetaker_window));

if (clicker_window) clicker_window.addEventListener("mousedown", () => layer(clicker_window));

if (cursor_changer_window) cursor_changer_window.addEventListener("mousedown", () => layer(cursor_changer_window));

var welcome_close = document.querySelector("#close_welcome");
var welcome_open = document.querySelector("#open_welcome");
var notetaker_close = document.querySelector("#notetaker_close");
var clicker_close = document.querySelector("#clicker_close");
var cursor_changer_close = document.querySelector("#CursorChanger_close");

if(notetaker_close){
  notetaker_close.addEventListener("click", function(e){e.stopPropagation(); close_window(notetaker_window);});
}

if(clicker_close){
  clicker_close.addEventListener("click", function(e){e.stopPropagation(); close_window(clicker_window)});
}

if(welcome_close){
  welcome_close.addEventListener("click", function(e){e.stopPropagation(); close_window(welcome_window)});
}

if(welcome_open){
  welcome_open.addEventListener("click", function(){open_window(welcome_window);});
}

if(cursor_changer_close){
  cursor_changer_close.addEventListener("click", function(e){e.stopPropagation(); close_window(cursor_changer_window)});
}

function set_note_up(index){
  if(note_contents_container && content[index]){
    note_contents_container.innerHTML = content[index].content;
    var items = document.querySelectorAll(".sidebar-note-item");
    items.forEach(function(item, idx){
      if(idx === index){
        item.style.backgroundColor = "#e2d1d1";
        item.style.borderLeft = "4px solid #cc7a7a";
        item.style.fontWeight = "bold";
      }
      else{
        item.style.backgroundColor = "white";
        item.style.borderLeft = "1px solid #ddd";
        item.style.fontWeight = "normal";
      }
    });
  }
}

function render_note_sidebar(){
  if(!note_list_container) return;
  note_list_container.innerHTML="";
  content.forEach(function(note, index){
    var item = document.createElement("div");
    item.className = "sidebar-note-item";
    item.style.padding = "10px 12px";
    item.style.backgroundColor = "white";
    item.style.border = "1px solid #ddd";
    item.style.borderRadius = "8px";
    item.style.cursor = "pointer";
    item.style.fontSize = "13px";
    item.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
    item.style.display = "flex";
    item.style.flexDirection = "column";
    item.style.gap = "2px";
    item.style.boxSizing = "border-box";
    item.innerHTML = `<div style = "font-weight: 600; color: #222; text-overflow: "ellipsis; overflow: hidden; white-space: nowrap;">${note.title}</div>`;
    item.addEventListener("click", function(){
      set_note_up(index);
    });
    note_list_container.appendChild(item);
  });
}

function handle_add_note() {
  var titleInput = document.querySelector("#newNoteTitle");
  var descInput = document.querySelector("#newNoteDesc");
  if(!titleInput || !descInput){
    return;
  }
  var title = titleInput.value.trim();
  var desc = descInput.value.trim();
  if(title === "") { alert("Please enter a note title!"); return; }
  var today = new Date();
  var dateString = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
  var newNote = {
  title: title,
  date: dateString,
  content: generate_note(title.toUpperCase(), dateString, desc || "No content written.")
  };
  content.push(newNote);
  titleInput.value = "";
  descInput.value = "";
  render_note_sidebar();
  set_note_up(content.length - 1);
}

var addNoteBtn = document.querySelector("#addNoteBtn");

if(addNoteBtn){
  addNoteBtn.addEventListener("click", handle_add_note);
}

var big_cucumber_button = document.querySelector("#bigCucumber");
var score_display = document.querySelector("#scoreDisplay");
var cps_display = document.querySelector("#cpsDisplay");

var buy_farm_button = document.querySelector("#buyFarmBtn");
var buy_green_house_button = document.querySelector("#buyGreenhouseBtn");
var buy_lab_button = document.querySelector("#buyLabBtn");
var buy_ai_button = document.querySelector("#buyAiBtn");

var farm_cost_display = document.querySelector("#farmCostDisplay");
var greenhouse_cost_display = document.querySelector("#greenhouseCostDisplay");
var lab_cost_display = document.querySelector("#labCostDisplay");
var ai_cost_display = document.querySelector("#aiCostDisplay");

var default_cursor_button = document.querySelector("#default_cursor_btn");
var pointer_cursor_button = document.querySelector("#pointer_cursor_btn");
var crosshair_cursor_button = document.querySelector("#crosshair_cursor_btn");

function update_ui(){
  if(score_display){
    score_display.innerHTML = " " + cucumbers + "";
  }
  if(cps_display){
    cps_display.innerHTML = "Cucumbers Per Second:" + cucumbers_auto_ps;
  }
  if(farm_cost_display){
    farm_cost_display.innerHTML = "Cost: " + cucumber_farm_cost + " : +" + cucumber_farm_cps + "CPS";
  }
  if(greenhouse_cost_display){
    greenhouse_cost_display.innerHTML = "Cost: " + cucumber_greenhouse_cost + "  : +" + cucumber_greenhouse_cps + "CPS";
  }
  if(lab_cost_display){
    lab_cost_display.innerHTML = "Cost: " + cucumber_lab_cost + "  : +" + cucumber_lab_cps + "CPS";
  }
  if(ai_cost_display){
    ai_cost_display.innerHTML = "Cost: " + cucumber_ai_cost + "  : +" + cucumber_ai_cps + "CPS";
  }
}

setInterval(function() {
  if (cucumbers_auto_ps > 0) {
    cucumbers += cucumbers_auto_ps;
    update_ui();
  }
}, 1000);

window.onload = function() {
  // center_window(welcome_window);
  // center_window(notetaker_window);
  // center_window(clicker_window);
  drag_element(welcome_window);
  drag_element(notetaker_window);
  drag_element(clicker_window);
  drag_element(cursor_changer_window);
  render_note_sidebar();

  default_cursor.style.display = "block";

  document.addEventListener('mousemove', (e) => {
      default_cursor.style.left = `${e.pageX}px`;
      default_cursor.style.top = `${e.pageY}px`;
  });

  document.addEventListener('mousemove', (e) => {
      pointer_cursor.style.left = `${e.pageX}px`;
      pointer_cursor.style.top = `${e.pageY}px`;
  });

  document.addEventListener('mousemove', (e) => {
      crosshair_cursor.style.left = `${e.pageX}px`;
      crosshair_cursor.style.top = `${e.pageY}px`;
  });

  default_cursor_button.addEventListener("click", function(){
    default_cursor.style.display = "block";
    pointer_cursor.style.display = "none";
    crosshair_cursor.style.display = "none";
  }
  );
  pointer_cursor_button.addEventListener("click", function(){
    default_cursor.style.display = "none";
    pointer_cursor.style.display = "block";
    crosshair_cursor.style.display = "none";
  }
  );
  crosshair_cursor_button.addEventListener("click", function(){
    default_cursor.style.display = "none";
    pointer_cursor.style.display = "none";
    crosshair_cursor.style.display = "block";
  }
  );

  buy_farm_button.addEventListener("click", function(){
    if(cucumbers >= cucumber_farm_cost){
      cucumbers -= cucumber_farm_cost;
      cucumbers_auto_ps += cucumber_farm_cps;
      cucumber_farm_cost = Math.floor(cucumber_farm_cost * 1.5);
      update_ui();
    }
    else{
      alert("Not enough cucumbers! Can't buy the farm!")
    }
  });
  buy_green_house_button.addEventListener("click", function(){
    if(cucumbers >= cucumber_greenhouse_cost){
      cucumbers -= cucumber_greenhouse_cost;
      cucumbers_auto_ps += cucumber_greenhouse_cps;
      cucumber_greenhouse_cost = Math.floor(cucumber_greenhouse_cost * 1.5);
      update_ui();
    }
    else{
      alert("Not enough cucumbers! Can't buy the greenhouse!")
    }
  });
  buy_lab_button.addEventListener("click", function(){
    if(cucumbers >= cucumber_lab_cost){
      cucumbers -= cucumber_lab_cost;
      cucumbers_auto_ps += cucumber_lab_cps;
      cucumber_lab_cost = Math.floor(cucumber_lab_cost * 1.5);
      update_ui();
    }
    else{
      alert("Not enough cucumbers! Can't buy the lab!")
    }
  });
  buy_ai_button.addEventListener("click", function(){
    if(cucumbers >= cucumber_ai_cost){
      cucumbers -= cucumber_ai_cost;
      cucumbers_auto_ps += cucumber_ai_cps;
      cucumber_ai_cost = Math.floor(cucumber_ai_cost * 1.5);
      update_ui();
    }
    else{
      alert("Not enough cucumbers! Can't buy the AI!")
    }
  });
  big_cucumber_button.addEventListener("click", function(){
    cucumbers += cpc;
    update_ui();
    big_cucumber_button.style.transform = "scale(0.85)";
    setTimeout(function(){
      big_cucumber_button.style.transform = "scale(1)";
    }, 100);
  });
  update_ui();
  if (content.length > 0) {
    set_note_up(0);
  }
};