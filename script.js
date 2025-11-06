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

function findCurrentLesson(lessons, nowS) {
  return lessons.find(lesson => {
    const startSec = getSeconds(lesson.start);
    const endSec = getSeconds(lesson.end);
    return nowS >= startSec && nowS < endSec;
  }) || null;
}

function findNextLesson(lessons, nowS) {
  return lessons.find(lesson => getSeconds(lesson.start) > nowS) || null;
}

function updateFlipClock(now) {
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  
  const cards = document.querySelectorAll('.flip-card');
  const digits = [hours[0], hours[1], minutes[0], minutes[1]];
  
  cards.forEach((card, index) => {
    const top = card.querySelector('.top');
    const bottom = card.querySelector('.bottom');
    
    if (top.textContent !== digits[index]) {
      top.textContent = digits[index];
      bottom.textContent = digits[index];
      
      // Add flip animation
      card.classList.add('flipping');
      setTimeout(() => card.classList.remove('flipping'), 600);
    }
  });
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

function updateTime() {
  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = dayNames[now.getDay()];
  
  // Update flip clock
  updateFlipClock(now);
  
  // Update day
  document.getElementById('day').textContent = dayName;
  
  const lessons = timetable[dayName];
  const lessonEl = document.getElementById('lesson');
  const timerEl = document.getElementById('timer');
  
  const nowSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  
  // Handle weekends
  if (!lessons) {
    lessonEl.textContent = "Weekend! No lessons 🥳";
    timerEl.textContent = "Enjoy your break!";
    document.getElementById('timetableList').innerHTML = '<strong>No lessons today</strong>';
    return;
  }
  
  const currentLesson = findCurrentLesson(lessons, nowSeconds);
  const nextLesson = findNextLesson(lessons, nowSeconds);
  
  // Update current/next lesson display
  if (currentLesson) {
    const endSec = getSeconds(currentLesson.end);
    const timeLeft = endSec - nowSeconds;
    
    lessonEl.textContent = currentLesson.subject;
    
    if (nextLesson) {
      const nextStartSec = getSeconds(nextLesson.start);
      const timeToNext = nextStartSec - nowSeconds;
      timerEl.textContent = `Ends in: ${formatTimeLeft(timeLeft)} | Next: ${formatTimeLeft(timeToNext)}`;
    } else {
      timerEl.textContent = `Ends in: ${formatTimeLeft(timeLeft)} | All done today ✅`;
    }
  } else if (nextLesson) {
    const nextStartSec = getSeconds(nextLesson.start);
    const timeToNext = nextStartSec - nowSeconds;
    
    lessonEl.textContent = nextLesson.subject;
    timerEl.textContent = `Starts in: ${formatTimeLeft(timeToNext)}`;
  } else {
    // No current or next lesson (after school)
    lessonEl.textContent = "School's out! 🎉";
    
    // Find next day's first lesson
    let nextDayIndex = (now.getDay() + 1) % 7;
    let nextDayName = dayNames[nextDayIndex];
    
    while (!timetable[nextDayName] && nextDayIndex !== now.getDay()) {
      nextDayIndex = (nextDayIndex + 1) % 7;
      nextDayName = dayNames[nextDayIndex];
    }
    
    if (timetable[nextDayName]) {
      const nextDayFirstLesson = timetable[nextDayName][0];
      const nextStartSec = getSeconds(nextDayFirstLesson.start);
      const secondsUntilTomorrow = (24 * 3600) - nowSeconds;
      const totalSeconds = secondsUntilTomorrow + nextStartSec;
      
      timerEl.textContent = `Next lesson: ${formatTimeLeft(totalSeconds)}`;
    } else {
      timerEl.textContent = "Enjoy your break! 🏖️";
    }
  }
  
  // Update timetable display
  updateTimetableUI(lessons, currentLesson, nextLesson);
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
