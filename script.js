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

// Utility functions
function getSeconds(timeStr) {
  const [time, period] = timeStr.split(' ');
  const [h, m] = time.split(':');
  let hour = parseInt(h);
  const min = parseInt(m);
  
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  
  return hour * 3600 + min * 60;
}

function formatTimeLeft(seconds) {
  if (seconds <= 0) return "00h 00m 00s";
  
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
}

function updateFlipClock(now) {
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  // Convert to 12-hour format
  hours = hours % 12 || 12;
  const hoursStr = hours.toString().padStart(2, '0');
  const minutesStr = minutes.toString().padStart(2, '0');
  
  // Update hour cards
  const hourCards = document.querySelectorAll('.flip-card');
  const hourTop1 = hourCards[0].querySelector('.top');
  const hourBottom1 = hourCards[0].querySelector('.bottom');
  const hourTop2 = hourCards[1].querySelector('.top');
  const hourBottom2 = hourCards[1].querySelector('.bottom');
  
  if (hourTop1.textContent !== hoursStr[0]) {
    hourTop1.textContent = hoursStr[0];
    hourBottom1.textContent = hoursStr[0];
    hourCards[0].classList.add('flipping');
    setTimeout(() => hourCards[0].classList.remove('flipping'), 600);
  }
  
  if (hourTop2.textContent !== hoursStr[1]) {
    hourTop2.textContent = hoursStr[1];
    hourBottom2.textContent = hoursStr[1];
    hourCards[1].classList.add('flipping');
    setTimeout(() => hourCards[1].classList.remove('flipping'), 600);
  }
  
  // Update minutes cards
  const minTop1 = hourCards[2].querySelector('.top');
  const minBottom1 = hourCards[2].querySelector('.bottom');
  const minTop2 = hourCards[3].querySelector('.top');
  const minBottom2 = hourCards[3].querySelector('.bottom');
  
  if (minTop1.textContent !== minutesStr[0]) {
    minTop1.textContent = minutesStr[0];
    minBottom1.textContent = minutesStr[0];
    hourCards[2].classList.add('flipping');
    setTimeout(() => hourCards[2].classList.remove('flipping'), 600);
  }
  
  if (minTop2.textContent !== minutesStr[1]) {
    minTop2.textContent = minutesStr[1];
    minBottom2.textContent = minutesStr[1];
    hourCards[3].classList.add('flipping');
    setTimeout(() => hourCards[3].classList.remove('flipping'), 600);
  }
  
  // Update AM/PM
  document.querySelector('.ampm').textContent = ampm;
}

function updateTime() {
  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = dayNames[now.getDay()];
  
  // Update flip clock
  updateFlipClock(now);
  
  // Update day with real current day
  document.getElementById('day').textContent = dayName;
  
  const lessons = timetable[dayName];
  const currentLessonEl = document.getElementById('currentLesson');
  const nextLessonEl = document.getElementById('nextLesson');
  const currentTimerEl = document.getElementById('currentTimer');
  const nextTimerEl = document.getElementById('nextTimer');
  
  const nowSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  
  // Handle weekends
  if (!lessons) {
    currentLessonEl.textContent = "No lessons today";
    nextLessonEl.textContent = "Enjoy your weekend!";
    currentTimerEl.textContent = "🥳";
    nextTimerEl.textContent = "Next week starts soon";
    document.getElementById('timetableList').innerHTML = '<strong>Weekend Schedule</strong><div class="timetable-lesson">No classes - Relax and recharge!</div>';
    return;
  }
  
  // Find current and next lessons
  let currentLesson = null;
  let nextLesson = null;
  
  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    const startSec = getSeconds(lesson.start);
    const endSec = getSeconds(lesson.end);
    
    if (nowSeconds >= startSec && nowSeconds < endSec) {
      currentLesson = lesson;
      // Next lesson is the one after current, if any
      if (i + 1 < lessons.length) {
        nextLesson = lessons[i + 1];
      }
      break;
    } else if (nowSeconds < startSec) {
      // This is the next upcoming lesson
      nextLesson = lesson;
      break;
    }
  }
  
  // If no current lesson found, but we're after the last lesson
  if (!currentLesson && !nextLesson && lessons.length > 0) {
    const lastLesson = lessons[lessons.length - 1];
    if (nowSeconds >= getSeconds(lastLesson.end)) {
      currentLesson = null;
      nextLesson = null;
    }
  }
  
  // Update current lesson display
  if (currentLesson) {
    const endSec = getSeconds(currentLesson.end);
    const timeLeft = endSec - nowSeconds;
    
    currentLessonEl.textContent = currentLesson.subject;
    currentTimerEl.textContent = `Ends in: ${formatTimeLeft(timeLeft)}`;
  } else {
    currentLessonEl.textContent = "No current lesson";
    currentTimerEl.textContent = "Free period";
  }
  
  // Update next lesson display
  if (nextLesson) {
    const startSec = getSeconds(nextLesson.start);
    const timeToNext = startSec - nowSeconds;
    
    nextLessonEl.textContent = nextLesson.subject;
    nextTimerEl.textContent = `Starts in: ${formatTimeLeft(timeToNext)}`;
  } else {
    nextLessonEl.textContent = "No more lessons today";
    nextTimerEl.textContent = "School's out! 🎉";
  }
  
  // Update timetable display
  updateTimetableUI(lessons, currentLesson, nextLesson);
}

function updateTimetableUI(lessons, currentLesson, nextLesson) {
  const timetableList = document.getElementById('timetableList');
  
  let html = '<strong>Today\'s Schedule</strong>';
  lessons.forEach(lesson => {
    let className = 'timetable-lesson';
    
    if (currentLesson && currentLesson.subject === lesson.subject) {
      className += ' current';
    } else if (nextLesson && nextLesson.subject === lesson.subject) {
      className += ' next';
    }
    
    html += `<div class="${className}">${lesson.start} - ${lesson.end}: ${lesson.subject}</div>`;
  });
  
  timetableList.innerHTML = html;
}

// Initialize everything
function init() {
  // Set initial state
  updateTime();
  
  // Update every second
  setInterval(updateTime, 1000);
}

// Start the application
init();
