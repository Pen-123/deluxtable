// 7B ONLY GANG 💪
const timetable = {
  Monday: [
    { start: "7:40 AM", end: "8:00 AM", subject: "Registration / Wellbeing" },
    { start: "8:00 AM", end: "8:50 AM", subject: "Assembly" },
    { start: "8:50 AM", end: "9:40 AM", subject: "Swimming" },
    { start: "9:40 AM", end: "10:30 AM", subject: "Humanities" },
    { start: "10:30 AM", end: "10:50 AM", subject: "Break ☕" },
    { start: "10:50 AM", end: "11:40 AM", subject: "English" },
    { start: "11:40 AM", end: "12:30 PM", subject: "Maths" },
    { start: "12:40 PM", end: "1:20 PM", subject: "Science" },
    { start: "1:20 PM", end: "1:50 PM", subject: "Break ☕" },
    { start: "1:50 PM", end: "2:40 PM", subject: "Science" },
  ],
  Tuesday: [
    { start: "7:40 AM", end: "8:00 AM", subject: "Registration / Wellbeing" },
    { start: "8:00 AM", end: "8:50 AM", subject: "Art" },
    { start: "8:50 AM", end: "9:40 AM", subject: "French" },
    { start: "9:40 AM", end: "10:30 AM", subject: "ICT/AI" },
    { start: "10:30 AM", end: "10:50 AM", subject: "Break ☕" },
    { start: "10:50 AM", end: "11:40 AM", subject: "English" },
    { start: "11:40 AM", end: "12:30 PM", subject: "MSC" },
    { start: "12:40 PM", end: "1:20 PM", subject: "Maths" },
    { start: "1:20 PM", end: "1:50 PM", subject: "Break ☕" },
    { start: "1:50 AM", end: "2:40 PM", subject: "Science" },
    { start: "3:00 PM", end: "3:40 PM", subject: "ECA" },
  ],
  Wednesday: [
    { start: "7:40 AM", end: "8:00 AM", subject: "Registration / Wellbeing" },
    { start: "8:00 AM", end: "8:50 AM", subject: "Arabic" },
    { start: "8:50 AM", end: "9:40 AM", subject: "ICT/AI" },
    { start: "9:40 AM", end: "10:30 AM", subject: "English" },
    { start: "10:30 AM", end: "10:50 AM", subject: "Break ☕" },
    { start: "10:50 AM", end: "11:40 AM", subject: "Maths" },
    { start: "11:40 AM", end: "12:30 PM", subject: "Humanities" },
    { start: "12:40 PM", end: "1:20 PM", subject: "PE" },
    { start: "1:20 PM", end: "1:50 PM", subject: "Break ☕" },
    { start: "1:50 PM", end: "2:40 PM", subject: "Islamic" },
  ],
  Thursday: [
    { start: "7:40 AM", end: "8:00 AM", subject: "Registration / Wellbeing" },
    { start: "8:00 AM", end: "8:50 AM", subject: "French" },
    { start: "8:50 AM", end: "9:40 AM", subject: "Math" },
    { start: "9:40 AM", end: "10:30 AM", subject: "English" },
    { start: "10:30 AM", end: "10:50 AM", subject: "Break ☕" },
    { start: "10:50 AM", end: "11:40 AM", subject: "Music" },
    { start: "11:40 AM", end: "12:30 PM", subject: "Islamic" },
    { start: "12:40 PM", end: "1:20 PM", subject: "Arabic" },
    { start: "1:20 PM", end: "1:50 PM", subject: "Break ☕" },
    { start: "1:50 PM", end: "2:40 PM", subject: "ICT/AI" },
  ],
  Friday: [
    { start: "7:40 AM", end: "8:00 AM", subject: "Registration / Wellbeing" },
    { start: "8:00 AM", end: "8:50 AM", subject: "English" },
    { start: "8:50 AM", end: "9:40 AM", subject: "Science" },
    { start: "9:40 AM", end: "10:30 AM", subject: "UAE Social Studies" },
    { start: "10:30 AM", end: "10:50 AM", subject: "Break ☕" },
    { start: "10:50 AM", end: "11:40 AM", subject: "Arabic" },
  ],
};

function pad(n, len = 2) {
  return n.toString().padStart(len, "0");
}
function formatClock(date) {
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${pad(h,2)}:${pad(m,2)}:${pad(s,2)} ${ampm}`;
}
function formatTime(date) {
  let h = date.getHours();
  const m = pad(date.getMinutes());
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}
function getMinutes(timeStr) {
  const [h, m, period] = timeStr.split(/[: ]/);
  let hour = parseInt(h);
  const min = parseInt(m);
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return hour * 60 + min;
}
function getSeconds(timeStr) {
  // "7:40 AM" => return seconds from midnight
  const [h, m, period] = timeStr.split(/[: ]/);
  let hour = parseInt(h);
  const min = parseInt(m);
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return hour * 3600 + min * 60;
}

function findCurrentLesson(lessons, nowS) {
  return lessons.find(l => nowS >= getSeconds(l.start) && nowS < getSeconds(l.end)) || null;
}

function findNextLesson(lessons, nowS) {
  // First lesson that starts after nowS
  return lessons.find(l => getSeconds(l.start) > nowS) || null;
}

function updateTime() {
  const now = new Date();
  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const day = dayNames[now.getDay()];

  // Digital Clock
  let clockEl = document.getElementById("digitalClock");
  if (!clockEl) {
    clockEl = document.createElement("div");
    clockEl.id = "digitalClock";
    clockEl.className = "digital-clock fade";
    document.querySelector('.container').prepend(clockEl);
  }
  clockEl.textContent = formatClock(now);

  document.getElementById("day").textContent = day;

  const lessons = timetable[day];
  const lessonEl = document.getElementById("lesson");

  // Find or create the timer element
  let timerEl = document.getElementById("timer");
  if (!timerEl) {
    const p = document.createElement("div");
    p.id = "timer";
    lessonEl.parentNode.appendChild(p);
    timerEl = p;
  }

  const nowSeconds = now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();

  // WEEKEND
  if (!lessons) {
    lessonEl.textContent = "You're on the weekend, No lessons, No boredom 🥳";
    const minsUntilNext = (24*60*60 - nowSeconds) + getSeconds(timetable["Monday"][0].start);
    timerEl.textContent = `🕒 ${pad(Math.floor(minsUntilNext/3600))}h ${pad(Math.floor((minsUntilNext%3600)/60))}m ${pad(minsUntilNext%60)}s until next lesson`;
    document.getElementById("timetableList").textContent = "";
    return;
  }

  const currentLesson = findCurrentLesson(lessons, nowSeconds);
  const nextLesson = findNextLesson(lessons, nowSeconds);

  // Timer logic
  if (currentLesson) {
    const endSec = getSeconds(currentLesson.end);
    const timeLeft = endSec - nowSeconds;

    const nextStartSec = nextLesson ? getSeconds(nextLesson.start) : null;
    lessonEl.textContent = currentLesson.subject;

    if (nextLesson) {
      const toNext = nextStartSec - nowSeconds;
      timerEl.textContent =
        `⏳ ${pad(Math.floor(timeLeft/3600))}h ${pad(Math.floor((timeLeft%3600)/60))}m ${pad(timeLeft%60)}s until lesson ends | ` +
        `🕒 ${pad(Math.floor(toNext/3600))}h ${pad(Math.floor((toNext%3600)/60))}m ${pad(toNext%60)}s until next lesson`;
    } else {
      timerEl.textContent =
        `⏳ ${pad(Math.floor(timeLeft/3600))}h ${pad(Math.floor((timeLeft%3600)/60))}m ${pad(timeLeft%60)}s until lesson ends | All lessons done for today ✅`;
    }
  } else if (nextLesson) {
    const untilNextSec = getSeconds(nextLesson.start) - nowSeconds;
    lessonEl.textContent = nextLesson.subject;
    timerEl.textContent =
      `🕒 ${pad(Math.floor(untilNextSec/3600))}h ${pad(Math.floor((untilNextSec%3600)/60))}m ${pad(untilNextSec%60)}s until next lesson`;
  } else {
    lessonEl.textContent = "You don't have any lessons right now 🫡";
    // Find next lesson from tomorrow
    let nextDayIndex = (now.getDay() + 1) % 7;
    let nextDay = dayNames[nextDayIndex];
    let foundNext = false, dayOffset = 1;
    while (dayOffset <= 7 && !timetable[nextDay]) {
      nextDayIndex = (nextDayIndex + 1) % 7;
      nextDay = dayNames[nextDayIndex];
      dayOffset++;
    }
    const nextDayLessons = timetable[nextDay];
    if (nextDayLessons) {
      const secondsUntilNext =
        (24*3600 - nowSeconds) + getSeconds(nextDayLessons[0].start);
      timerEl.textContent =
        `🕒 ${pad(Math.floor(secondsUntilNext/3600))}h ${pad(Math.floor((secondsUntilNext%3600)/60))}m ${pad(secondsUntilNext%60)}s until next lesson`;
    } else {
      timerEl.textContent = "😴 Enjoy your break!";
    }
  }

  // Timetable UI
  document.getElementById("timetableList").innerHTML =
    `<strong>Today's Timetable:</strong><br>` +
    lessons.map(l => {
      // Highlight current and next lesson
      let cn = "timetable-lesson";
      if (currentLesson && currentLesson.subject === l.subject) cn += " current";
      else if (!currentLesson && nextLesson && nextLesson.subject === l.subject) cn += " next";
      return `<span class="${cn}">${l.start} - ${l.end}: ${l.subject}</span>`;
    }).join("<br>");
}

// If extra font family is desired for clock, inject it:
(function addClockFont(){
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css?family=Share+Tech+Mono:400|Orbitron:600';
  document.head.appendChild(link);
})();

setInterval(updateTime, 300);
updateTime();
