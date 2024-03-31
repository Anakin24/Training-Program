document.addEventListener('DOMContentLoaded', () => {
  // Calculate the start time: 1st April 2024, 12am
  let startTime = new Date('March 31, 2024 00:00:00').getTime() / 1000;

  // Calculate the end time: 1st April 2025, 12am
  let endTime = new Date('April 1, 2025 00:00:00').getTime() / 1000;

  // Current time in Unix timestamp
  let now = Date.now() / 1000;

  // Check if the current time is before the start time
  if (now < startTime) {
    console.log('Countdown has not started yet. Waiting to start...');
    // Calculate the time left until the countdown starts
    let timeUntilStart = startTime - now;
    // Set a timeout to start the countdown when it reaches the start time
    setTimeout(() => {
      startCountdown(endTime);
    }, timeUntilStart * 1000); // Convert to milliseconds
  } else {
    // Start the countdown immediately if the start time has passed
    startCountdown(endTime);
  }
});

function startCountdown(endTime) {
  // Set up FlipDown with the end time
  var flipdown = new FlipDown(endTime)

  // Start the countdown
  .start()

  // Do something when the countdown ends
  .ifEnded(() => {
    console.log('The countdown has ended!');
  });
}


const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    let isPast =
      new Date(currYear, currMonth, i) <
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );
    // adding crossed class if the day is in the past and not in the current month view
    let isCrossed = isPast && !isToday ? "strikethrough" : "";

    if (isCrossed) {
      liTag += `<li class="${isToday} ${isCrossed} inactive">${i}</li>`; // creating li of days
    } else {
      liTag += `<li class="${isToday}">${i}</li>`; // creating li of days
    }
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};
renderCalendar();

prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
  });
});

// Clock
var Format = 2,
  TimeHolder = 0,
  StopChecker = 0;

function resetTimer() {
  $(".S1").removeClass().addClass("NumberHolder S1 show0");
  $(".S2").removeClass().addClass("NumberHolder S2 show0");

  $(".M1").removeClass().addClass("NumberHolder M1 show0");
  $(".M2").removeClass().addClass("NumberHolder M2 show0");

  $(".H1").removeClass().addClass("NumberHolder H1 show0");
  $(".H2").removeClass().addClass("NumberHolder H2 show0");
}

function SetDay(DD) {
  $(".WeekDays span:nth-child(" + ((DD + 2) % 7) + ")").addClass("active");
}

function Run24hr(S1, S2, M1, M2, H1, H2) {
  $(".S1")
    .removeClass()
    .addClass("NumberHolder S1 show" + S1);
  $(".S2")
    .removeClass()
    .addClass("NumberHolder S2 show" + S2);

  $(".M1")
    .removeClass()
    .addClass("NumberHolder M1 show" + M1);
  $(".M2")
    .removeClass()
    .addClass("NumberHolder M2 show" + M2);

  $(".H1")
    .removeClass()
    .addClass("NumberHolder H1 show" + H1);
  $(".H2")
    .removeClass()
    .addClass("NumberHolder H2 show" + H2);
}

function Run12hr(S1, S2, M1, M2, HH) {
  if (HH > 12) {
    HH = HH - 12;
    $(".Formats span:nth-child(2)").addClass("active");
  } else {
    $(".Formats span:nth-child(1)").addClass("active");
  }
  var H1 = Math.floor(HH / 10),
    H2 = HH % 10;

  $(".S1")
    .removeClass()
    .addClass("NumberHolder S1 show" + S1);
  $(".S2")
    .removeClass()
    .addClass("NumberHolder S2 show" + S2);

  $(".M1")
    .removeClass()
    .addClass("NumberHolder M1 show" + M1);
  $(".M2")
    .removeClass()
    .addClass("NumberHolder M2 show" + M2);

  if (H1 === 0) {
    $(".H1").fadeOut(0);
  } else {
    $(".H1")
      .fadeIn()
      .removeClass()
      .addClass("NumberHolder H1 show" + H1);
  }
  $(".H2")
    .removeClass()
    .addClass("NumberHolder H2 show" + H2);
}

function Stopwatch(TimeHolder) {
  var HH = Math.floor(TimeHolder / 3600),
    MM = Math.floor((TimeHolder - HH * 3600) / 60),
    SS = Math.floor(TimeHolder - HH * 3600 - MM * 60);

  var S1 = Math.floor(SS / 10),
    S2 = SS % 10,
    M1 = Math.floor(MM / 10),
    M2 = MM % 10,
    H1 = Math.floor(HH / 10),
    H2 = HH % 10;

  Run24hr(S1, S2, M1, M2, H1, H2);
}

function update_time() {
  var dt = new Date(),
    HH = dt.getHours(),
    MM = dt.getMinutes(),
    SS = dt.getSeconds(),
    DD = dt.getDay();
  SetDay(DD);

  var S1 = Math.floor(SS / 10),
    S2 = SS % 10,
    M1 = Math.floor(MM / 10),
    M2 = MM % 10,
    H1 = Math.floor(HH / 10),
    H2 = HH % 10;

  if (Format === 1) {
    Run24hr(S1, S2, M1, M2, H1, H2);
  } else if (Format === 2) {
    Run12hr(S1, S2, M1, M2, HH);
  } else if (Format === 3 && StopChecker === 0) {
    TimeHolder++;
    Stopwatch(TimeHolder);
  } else if (Format === 4 && StopChecker === 0) {
    TimeHolder--;
    if (TimeHolder === 0) {
      AlarmOut();
    } else {
      Stopwatch(TimeHolder);
    }
  }

  setTimeout(update_time, 1000);
}

$(".Type span").on("click", function () {
  $(".Type .active").removeClass("active");
  $(this).addClass("active");
  var T = $(this).html();
  if (T === "24hr") {
    Format = 1;
    $(".H1").fadeIn();
    $(".Formats span").removeClass("active");
  } else {
    Format = 2;
  }
});

$(".fa-stopwatch").on("click", function () {
  $("body").removeClass("BgAnimation");
  $(".H1").fadeIn();
  if (!$(".TimeHolder").hasClass("StopWatch")) {
    Format = 3;
    resetTimer();
    StopChecker = 1;
    $(".TimeHolder").removeClass().addClass("TimeHolder StopWatch");
    $(".Numbers").fadeIn(0);
    $(".Pause").removeClass("active");
    $(".Start").addClass("active");
    TimeHolder = 0;
  }
});

$(".Start").on("click", function () {
  $("body").removeClass("BgAnimation");
  if (Format === 3) {
    StopChecker = 0;
    $(this).removeClass("active");
    $(".Pause").addClass("active");
  } else if (Format === 4) {
    TimeHolder = $(".AlarmInput input").val();
    if (TimeHolder > 0) {
      StopChecker = 0;
      resetTimer();
      $(this).removeClass("active");
      $(".Pause").addClass("active");
      $(".AlarmInput").addClass("DisNone");
      $(".Numbers").fadeIn(0);
    }
  }
});

$(".Pause").on("click", function () {
  StopChecker = 1;
  $(this).removeClass("active");
  $(".Start").addClass("active");
});

$(".Stop").on("click", function () {
  $("body").removeClass("BgAnimation");
  if (Format === 3) {
    StopChecker = 1;
    TimeHolder = 0;
    resetTimer();
    $(".Pause").removeClass("active");
    $(".Start").addClass("active");
  } else if (Format === 4) {
    resetTimer();
    StopChecker = 1;
    $(".AlarmInput").removeClass("DisNone");
    $(".Numbers").fadeOut(0);
    $(".AlarmInput input").val("");
    $(".Pause").removeClass("active");
    $(".Start").addClass("active");
  }
});

$(".fas.fa-clock").on("click", function () {
  $("body").removeClass("BgAnimation");

  if ($(".Type .active").html() === "12hr") {
    Format = 2;
  } else {
    Format = 1;
  }

  StopChecker = 0;
  $(".TimeHolder").removeClass().addClass("TimeHolder");
  $(".Numbers").fadeIn(0);
});

$(".far.fa-clock").on("click", function () {
  $("body").removeClass("BgAnimation");
  $(".H1").fadeIn();
  if (!$(".TimeHolder").hasClass("Alarm")) {
    $(".TimeHolder").removeClass().addClass("TimeHolder Alarm");
    Format = 4;
    resetTimer();
    StopChecker = 1;
    $(".AlarmInput").removeClass("DisNone");
    $(".TimeHolder").addClass("Alarm");
    $(".Numbers").fadeOut(0);
    $(".Pause").removeClass("active");
    $(".Start").addClass("active");
  }
});

// Alarm Out
function AlarmOut() {
  $("body").addClass("BgAnimation");
  resetTimer();
  StopChecker = 1;
}

update_time();







