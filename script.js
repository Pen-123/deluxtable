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
    { start: "1:50 PM", end: "2:40 PM", subject: "Science" },
    { start: "3:00 PM", end: "3:40 PM", subject: "ECA" }, // extra lesson
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
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

function getMinutes(timeStr) {
  const [h, m, period] = timeStr.split(/[: ]/);
  let hour = parseInt(h);
  const min = parseInt(m);
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return hour * 60 + min;
}

function updateTime() {
  const now = new Date();
  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const day = dayNames[now.getDay()];
  document.getElementById("time").textContent = formatTime(now);
  document.getElementById("day").textContent = day;

  const lessons = timetable[day];
  if (!lessons || lessons.length === 0) {
    document.getElementById("lesson").textContent = "No lessons today 💤";
    document.getElementById("timetableList").textContent = "";
    const existingTimer = document.getElementById("timer");
    if (existingTimer) existingTimer.remove();
    return;
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  let currentLesson = null;
  let nextLesson = null;

  for (let i = 0; i < lessons.length; i++) {
    const startMin = getMinutes(lessons[i].start);
    const endMin = getMinutes(lessons[i].end);

    if (currentMinutes >= startMin && currentMinutes < endMin) {
      currentLesson = { ...lessons[i], endMin };
      if (i + 1 < lessons.length) nextLesson = lessons[i + 1];
      break;
    }

    if (currentMinutes < startMin) {
      nextLesson = lessons[i];
      break;
    }
  }

  // Display current or next lesson
  const lessonEl = document.getElementById("lesson");
  let timerEl = document.getElementById("timer");
  if (!timerEl) {
    timerEl = document.createElement("p");
    timerEl.id = "timer";
    document.querySelector(".card").appendChild(timerEl);
  }

  if (currentLesson) {
    lessonEl.textContent = currentLesson.subject;
    const remaining = currentLesson.endMin - currentMinutes;
    const mins = Math.floor(remaining);
    const secs = 59 - now.getSeconds();
    timerEl.textContent = `⏱ ${mins}:${secs.toString().padStart(2,"0")} until lesson ends`;
  } else if (nextLesson) {
    lessonEl.textContent = `Next: ${nextLesson.subject} (${nextLesson.start})`;
    timerEl.textContent = "";
  } else {
    lessonEl.textContent = "All lessons done, Mission accomplished ✅";
    timerEl.textContent = "";
  }

  // Today's timetable
  document.getElementById("timetableList").innerHTML = `<strong>Today's Timetable:</strong><br>` +
    lessons.map(l => `${l.start} - ${l.end}: ${l.subject}`).join("<br>");
}

// Create button for full week timetable
function createWeekButton() {
  const btn = document.createElement("button");
  btn.textContent = "View Full Week Timetable";
  btn.style.marginTop = "10px";
  btn.style.padding = "8px 15px";
  btn.style.borderRadius = "10px";
  btn.style.border = "none";
  btn.style.cursor = "pointer";
  btn.style.background = "#00ffc3";
  btn.style.color = "#101010";
  btn.onclick = () => {
    let html = "<strong>Full Week Timetable:</strong><br>";
    for (const d in timetable) {
      html += `<br><u>${d}:</u><br>`;
      html += timetable[d].map(l => `${l.start} - ${l.end}: ${l.subject}`).join("<br>");
    }
    const listEl = document.getElementById("timetableList");
    listEl.innerHTML = html;
  };
  document.querySelector(".container").appendChild(btn);
}

setInterval(updateTime, 1000);
updateTime();
createWeekButton();
