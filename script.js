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

function convertTo24Hour(timeStr) {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  
  hours = parseInt(hours);
  minutes = parseInt(minutes);
  
  if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return { hours, minutes };
}

function getTimeInSeconds(timeStr) {
  const { hours, minutes } = convertTo24Hour(timeStr);
  return hours * 3600 + minutes * 60;
}

function formatCountdown(seconds) {
  if (seconds <= 0) return "00:00:00";
  
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateClock() {
  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = dayNames[now.getDay()];
  
  // Update time display
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12 || 12;
  
  document.getElementById('time').textContent = 
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  
  // Update day
  document.getElementById('day').textContent = currentDay;
  
  // Get today's lessons
  const todayLessons = timetable[currentDay];
  
  if (!todayLessons) {
    // Weekend
    document.getElementById('currentLesson').textContent = "No school today!";
    document.getElementById('nextLesson').textContent = "Enjoy your weekend!";
    document.getElementById('currentTimer').textContent = "🥳";
    document.getElementById('nextTimer').textContent = "🎉";
    
    document.getElementById('timetableList').innerHTML = '<div class="timetable-lesson">Weekend - No classes scheduled</div>';
    return;
  }
  
  const currentTimeInSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  let currentLesson = null;
  let nextLesson = null;
  
  // Find current and next lessons
  for (let i = 0; i < todayLessons.length; i++) {
    const lesson = todayLessons[i];
    const lessonStart = getTimeInSeconds(lesson.start);
    const lessonEnd = getTimeInSeconds(lesson.end);
    
    if (currentTimeInSeconds >= lessonStart && currentTimeInSeconds < lessonEnd) {
      currentLesson = lesson;
      // Next lesson is the one after this, if it exists
      if (i + 1 < todayLessons.length) {
        nextLesson = todayLessons[i + 1];
      }
      break;
    } else if (currentTimeInSeconds < lessonStart) {
      // This is the next upcoming lesson
      nextLesson = lesson;
      break;
    }
  }
  
  // Update current lesson display with live countdown
  if (currentLesson) {
    const endTime = getTimeInSeconds(currentLesson.end);
    const timeLeft = endTime - currentTimeInSeconds;
    
    document.getElementById('currentLesson').textContent = currentLesson.subject;
    document.getElementById('currentTimer').textContent = formatCountdown(timeLeft);
  } else {
    document.getElementById('currentLesson').textContent = "No current lesson";
    document.getElementById('currentTimer').textContent = "--:--:--";
  }
  
  // Update next lesson display with live countdown
  if (nextLesson) {
    const startTime = getTimeInSeconds(nextLesson.start);
    const timeUntil = startTime - currentTimeInSeconds;
    
    document.getElementById('nextLesson').textContent = nextLesson.subject;
    document.getElementById('nextTimer').textContent = formatCountdown(timeUntil);
  } else {
    document.getElementById('nextLesson').textContent = "No more lessons today";
    document.getElementById('nextTimer').textContent = "00:00:00";
  }
  
  // Update timetable
  updateTimetable(todayLessons, currentLesson, nextLesson);
}

function updateTimetable(lessons, currentLesson, nextLesson) {
  const timetableContent = document.getElementById('timetableList');
  timetableContent.innerHTML = '';
  
  lessons.forEach(lesson => {
    const lessonElement = document.createElement('div');
    lessonElement.className = 'timetable-lesson';
    
    if (currentLesson && lesson.subject === currentLesson.subject) {
      lessonElement.classList.add('current');
    } else if (nextLesson && lesson.subject === nextLesson.subject) {
      lessonElement.classList.add('next');
    }
    
    lessonElement.textContent = `${lesson.start} - ${lesson.end}: ${lesson.subject}`;
    timetableContent.appendChild(lessonElement);
  });
}

// Initialize and update every second
updateClock();
setInterval(updateClock, 1000);
