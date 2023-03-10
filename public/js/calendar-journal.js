//check the console for date click event
function CalendarControl() {
  const calendar = new Date();
  const calendarControl = {
    localDate: new Date(),
    prevMonthLastDate: null,
    calWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    calMonthName: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    daysInMonth: function (month, year) {
      return new Date(year, month, 0).getDate();
    },
    firstDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
    },
    lastDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
    },
    firstDayNumber: function () {
      return calendarControl.firstDay().getDay() + 1;
    },
    lastDayNumber: function () {
      return calendarControl.lastDay().getDay() + 1;
    },
    getPreviousMonthLastDate: function () {
      let lastDate = new Date(
        calendar.getFullYear(),
        calendar.getMonth(),
        0
      ).getDate();
      return lastDate;
    },
    navigateToPreviousMonth: function () {
      calendar.setMonth(calendar.getMonth() - 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToNextMonth: function () {
      calendar.setMonth(calendar.getMonth() + 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToCurrentMonth: function () {
      let currentMonth = calendarControl.localDate.getMonth();
      let currentYear = calendarControl.localDate.getFullYear();
      calendar.setMonth(currentMonth);
      calendar.setYear(currentYear);
      calendarControl.attachEventsOnNextPrev();
    },
    displayYear: function () {
      let yearLabel = document.querySelector(".calendar .calendar-year-label");
      yearLabel.innerHTML = calendar.getFullYear();
    },
    displayMonth: function () {
      let monthLabel = document.querySelector(
        ".calendar .calendar-month-label"
      );
      monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
    },
    selectDate: function (e) {
      console.log(
        `${e.target.textContent} ${calendarControl.calMonthName[calendar.getMonth()]
        } ${calendar.getFullYear()}`
      );
      var clickedDate = `${e.target.textContent} ${calendarControl.calMonthName[calendar.getMonth()]
        } ${calendar.getFullYear()}`
      journalInput(clickedDate);
    },
    plotSelectors: function () {
      document.querySelector(
        ".calendar"
      ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
          <div class="calendar-prev"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
          <div class="calendar-year-month">
          <div class="calendar-month-label"></div>
          <div>-</div>
          <div class="calendar-year-label"></div>
          </div>
          <div class="calendar-next"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
          </div>
          <div class="calendar-today-date">Today: 
            ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]}, 
            ${calendarControl.localDate.getDate()}, 
            ${calendarControl.calMonthName[calendarControl.localDate.getMonth()]} 
            ${calendarControl.localDate.getFullYear()}
          </div>
          <div class="calendar-body"></div></div>`;
    },
    plotDayNames: function () {
      for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
        document.querySelector(
          ".calendar .calendar-body"
        ).innerHTML += `<div>${calendarControl.calWeekDays[i]}</div>`;
      }
    },
    plotDates: function () {
      document.querySelector(".calendar .calendar-body").innerHTML = "";
      calendarControl.plotDayNames();
      calendarControl.displayMonth();
      calendarControl.displayYear();
      let count = 1;
      let prevDateCount = 0;

      calendarControl.prevMonthLastDate = calendarControl.getPreviousMonthLastDate();
      let prevMonthDatesArray = [];
      let calendarDays = calendarControl.daysInMonth(
        calendar.getMonth() + 1,
        calendar.getFullYear()
      );
      // dates of current month
      for (let i = 1; i < calendarDays; i++) {
        if (i < calendarControl.firstDayNumber()) {
          prevDateCount += 1;
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="prev-dates"></div>`;
          prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
        } else {
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
        }
      }
      //remaining dates after month dates
      for (let j = 0; j < prevDateCount + 1; j++) {
        document.querySelector(
          ".calendar .calendar-body"
        ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
      }
      calendarControl.highlightToday();
      calendarControl.plotPrevMonthDates(prevMonthDatesArray);
      calendarControl.plotNextMonthDates();
    },
    attachEvents: function () {
      let prevBtn = document.querySelector(".calendar .calendar-prev a");
      let nextBtn = document.querySelector(".calendar .calendar-next a");
      let todayDate = document.querySelector(".calendar .calendar-today-date");
      let dateNumber = document.querySelectorAll(".calendar .dateNumber");
      prevBtn.addEventListener(
        "click",
        calendarControl.navigateToPreviousMonth
      );
      nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
      todayDate.addEventListener(
        "click",
        calendarControl.navigateToCurrentMonth
      );
      for (var i = 0; i < dateNumber.length; i++) {
        dateNumber[i].addEventListener(
          "click",
          calendarControl.selectDate,
          false
        );
      }
    },
    highlightToday: function () {
      let currentMonth = calendarControl.localDate.getMonth() + 1;
      let changedMonth = calendar.getMonth() + 1;
      let currentYear = calendarControl.localDate.getFullYear();
      let changedYear = calendar.getFullYear();
      if (
        currentYear === changedYear &&
        currentMonth === changedMonth &&
        document.querySelectorAll(".number-item")
      ) {
        document
          .querySelectorAll(".number-item")
        [calendar.getDate() - 1].classList.add("calendar-today");
      }
    },
    plotPrevMonthDates: function (dates) {
      dates.reverse();
      for (let i = 0; i < dates.length; i++) {
        if (document.querySelectorAll(".prev-dates")) {
          document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
        }
      }
    },
    plotNextMonthDates: function () {
      let childElemCount = document.querySelector('.calendar-body').childElementCount;
      //7 lines
      if (childElemCount > 42) {
        let diff = 49 - childElemCount;
        calendarControl.loopThroughNextDays(diff);
      }

      //6 lines
      if (childElemCount > 35 && childElemCount <= 42) {
        let diff = 42 - childElemCount;
        calendarControl.loopThroughNextDays(42 - childElemCount);
      }

    },
    loopThroughNextDays: function (count) {
      if (count > 0) {
        for (let i = 1; i <= count; i++) {
          document.querySelector('.calendar-body').innerHTML += `<div class="next-dates">${i}</div>`;
        }
      }
    },
    attachEventsOnNextPrev: function () {
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },
    init: function () {
      calendarControl.plotSelectors();
      calendarControl.plotDates();
      calendarControl.attachEvents();
    }
  };
  calendarControl.init();
}

const calendarControl = new CalendarControl();


async function journalInput(clickedDate) {
  //get userID number
  const user = document.querySelector('#user_id');
  let user_id = user.textContent;
  //fetch based on userid
  const response = await fetch('/api/journal/user_id/' + user_id)
  const journalDB = await response.json();
  //find clicked date from fetched array
  function isSavedDate(journalDB) {
    return journalDB.date === clickedDate
  }
  let activeJournal = (journalDB.find(isSavedDate));
  //calls for journal input based on fetched data

  //dynamically creates input to make a new journal
  if (!activeJournal) {
    emptyDiv();
    document.querySelector(
      ".card"
    ).innerHTML += `<div class="mb-3">
      <h3 class ="todayDateJournal" id="date" style="align-items:center">${clickedDate}</h3>
      <h5>General Mood</h5>
      <select class="form-select" aria-label="Default select example" id="mood">
      <option value="Happy">Happy</option>
      <option value="Content">Content</option>
      <option value="Sad">Sad</option>
      </select>
      </div>
      <div>
  <h5>Cycle</h5>
  <select class="form-select" aria-label="Default select example" id="period">
  <option value="No Period">No Period</option>
  <option value="Light">Light</option>
  <option value="Medium">Medium</option>
  <option value="Heavy">Heavy</option>
  </select>
  </div>
  <div class="mb-3">
  <h5>Journal</h5>
  <textarea class="form-control" id="journal" rows="3"></textarea>
  </div>
  <div>
  <button type="button" class="btn btn-secondary" id="saveBtn" onclick="saveJournal()">Save</button>
  </div>`
  }
  //dynamically creates input to update or delete journal
  if (activeJournal) {
    let fetchID = activeJournal.id;
    let fetchMood = activeJournal.mood;
    let fetchDate = activeJournal.date;
    let fetchPeriod = activeJournal.period;
    let fetchJournal = activeJournal.journal;
    emptyDiv();
    document.querySelector(
      ".card"
    ).innerHTML += `<div class="mb-3">
      <h3 class ="todayDateJournal" id="date" style="align-items:center">${fetchDate}</h3>
      <h5>General Mood</h5>
      <select class="form-select" aria-label="Default select example" id="mood">
      <option value="${fetchMood}">${fetchMood}</option>
      <option value="Happy">Happy</option>
      <option value="Content">Content</option>
      <option value="Sad">Sad</option>
      </select>
      </div>
      <div>
  <h5>Cycle</h5>
  <select class="form-select" aria-label="Default select example" id="period">
  <option value="${fetchPeriod}">${fetchPeriod}</option>
  <option value="No Period">No Period</option>
  <option value="Light">Light</option>
  <option value="Medium">Medium</option>
  <option value="Heavy">Heavy</option>
  </select>
  </div>
  <div class="mb-3">
  <h5>Journal</h5>
  <textarea class="form-control" id="journal" rows="3">${fetchJournal}</textarea>
  </div>
  <div>
  <button type="button" class="btn btn-secondary" id="updateBtn" onclick="updateJournal()">Update</button>  <button type="button" class="btn btn-secondary" id="deleteBtn" onclick="deleteJournal()">Delete</button><p id="fetchID" style="display:none">${fetchID}</p>
  </div>`
  }
}

//POST journal fetch
const saveJournal = async () => {
  let btn = document.getElementById('saveBtn');

  const dateID = document.querySelector('#date');
  const moodID = document.querySelector('#mood');
  const periodID = document.querySelector('#period');
  const journal = document.querySelector('#journal').value.trim();
  const user = document.querySelector('#user_id');

  let date = dateID.textContent;
  let mood = moodID.value;
  let period = periodID.value;
  let user_id = user.textContent;

  if (mood && period) {
    const response = await fetch('/api/journal/', {
      method: 'POST',
      body: JSON.stringify({ date, mood, period, journal, user_id }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      alert("Journal Saved!")
      // document.location.replace('/journal');
    } else {
      alert('Failed to save entry.');
    }
  }

  btn.addEventListener('click', saveJournal);
  console.log(date, mood, period, journal)
}

//PUT journal fetch
const updateJournal = async () => {
  let btn = document.getElementById('updateBtn');

  const fetchID = document.querySelector('#fetchID');
  const dateID = document.querySelector('#date');
  const moodID = document.querySelector('#mood');
  const periodID = document.querySelector('#period');
  const journal = document.querySelector('#journal').value.trim();
  const user = document.querySelector('#user_id');

  let id = fetchID.textContent;
  let date = dateID.textContent;
  let mood = moodID.value;
  let period = periodID.value;
  let user_id = user.textContent;

  if (mood && period) {
    const response = await fetch('/api/journal/' + id, {
      method: 'PUT',
      body: JSON.stringify({ date, mood, period, journal, user_id }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      alert("Journal Updated!")
      document.location.replace('/journal');
    } else {
      alert('Failed to update entry.');
    }
  }

  btn.addEventListener('click', updateJournal);
}

//DELETE journal fetch
async function deleteJournal() {
  let btn = document.getElementById('deleteBtn');

  const fetchID = document.querySelector('#fetchID');
  const dateID = document.querySelector('#date');
  let id = fetchID.textContent;
  let date = dateID.textContent;

  const response = await fetch('/api/journal/' + id, {
    method: 'DELETE',
    body: JSON.stringify({ date, mood, period, journal, user_id }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    alert("Journal Deleted!")
    emptyDiv();
    document.querySelector(
      ".card"
    ).innerHTML += `<div class="mb-3">
      <h3 class ="todayDateJournal" id="date" style="align-items:center">${date}</h3>
      <h5>General Mood</h5>
      <select class="form-select" aria-label="Default select example" id="mood">
      <option value="Happy">Happy</option>
      <option value="Content">Content</option>
      <option value="Sad">Sad</option>
      </select>
      </div>
      <div>
  <h5>Cycle</h5>
  <select class="form-select" aria-label="Default select example" id="period">
  <option value="No Period">No Period</option>
  <option value="Light">Light</option>
  <option value="Medium">Medium</option>
  <option value="Heavy">Heavy</option>
  </select>
  </div>
  <div class="mb-3">
  <h5>Journal</h5>
  <textarea class="form-control" id="journal" rows="3"></textarea>
  </div>
  <div>
  <button type="button" class="btn btn-secondary" id="saveBtn" onclick="saveJournal()">Save</button>
  </div>`
  } else {
    alert('Failed to delete entry.');
  }
  

btn.addEventListener('click', deleteJournal);
}

function emptyDiv() {
  document.querySelector(".card").innerHTML = " "
}