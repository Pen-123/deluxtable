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

function formatTime(date) {
  let h = date.getHours();
  const m = date.getMinutes().toString().padStart(2, "0");
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

function findCurrentLesson(lessons, nowMin) {
  return lessons.find(l => nowMin >= getMinutes(l.start) && nowMin < getMinutes(l.end)) || null;
}

function findNextLesson(lessons, nowMin) {
  return lessons.find(l => getMinutes(l.start) > nowMin) || null;
}

function updateTime() {
  const now = new Date();
  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const day = dayNames[now.getDay()];
  const nowMin = now.getHours()*60 + now.getMinutes();

  document.getElementById("time").textContent = formatTime(now);
  document.getElementById("day").textContent = day;

  const lessons = timetable[day];
  const lessonEl = document.getElementById("lesson");

  let timerEl = document.getElementById("timer");
  if (!timerEl) {
    const p = document.createElement("p");
    p.id = "timer";
    lessonEl.parentNode.appendChild(p);
    timerEl = p;
  }

  // handle weekend
  if (!lessons) {
    lessonEl.textContent = "Your on the weekend, No lessons, No boredom 🥳";
    const minsUntilNext = (24*60 - nowMin) + getMinutes(timetable["Monday"][0].start);
    timerEl.textContent = `🕒 ${Math.floor(minsUntilNext/60)}h ${minsUntilNext%60}m until next lesson`;
    document.getElementById("timetableList").textContent = "";
    return;
  }

  const currentLesson = findCurrentLesson(lessons, nowMin);
  const nextLesson = findNextLesson(lessons, nowMin);

  if (currentLesson) {
    const endMin = getMinutes(currentLesson.end);
    const minsLeft = endMin - nowMin;
    const nextStartMin = nextLesson ? getMinutes(nextLesson.start) : null;
    lessonEl.textContent = currentLesson.subject;

    if (nextLesson) {
      const minsToNext = nextStartMin - nowMin;
      timerEl.textContent = `⏳ ${Math.floor(minsLeft/60)}h ${minsLeft%60}m until lesson ends | 🕒 ${Math.floor(minsToNext/60)}h ${minsToNext%60}m until next lesson`;
    } else {
      timerEl.textContent = `⏳ ${Math.floor(minsLeft/60)}h ${minsLeft%60}m until lesson ends | All lessons done for today ✅`;
    }

  } else if (nextLesson) {
    const minsUntilNext = getMinutes(nextLesson.start) - nowMin;
    lessonEl.textContent = nextLesson.subject;
    timerEl.textContent = `🕒 ${Math.floor(minsUntilNext/60)}h ${minsUntilNext%60}m until next lesson`;
  } else {
    lessonEl.textContent = "You don't have any lessons right now 🫡";
    const nextDayIndex = (now.getDay() + 1) % 7;
    const nextDay = dayNames[nextDayIndex];
    const nextDayLessons = timetable[nextDay];
    if (nextDayLessons) {
      const minsUntilNext = (24*60 - nowMin) + getMinutes(nextDayLessons[0].start);
      timerEl.textContent = `🕒 ${Math.floor(minsUntilNext/60)}h ${minsUntilNext%60}m until next lesson`;
    } else {
      timerEl.textContent = "😴 Enjoy your break!";
    }
  }

  // highlight current
  document.getElementById("timetableList").innerHTML = `<strong>Today's Timetable:</strong><br>` +
    lessons.map(l => {
      const isCurrent = currentLesson && currentLesson.subject === l.subject;
      return `<span style="${isCurrent ? "background:#00ffc3; color:#101010; padding:2px 5px; border-radius:5px;" : ""}">${l.start} - ${l.end}: ${l.subject}</span>`;
    }).join("<br>");
}

setInterval(updateTime, 1000);
updateTime();
