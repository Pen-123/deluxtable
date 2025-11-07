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

// Add this function to get subject icon and type
function getSubjectInfo(subject) {
  const lowerSubject = subject.toLowerCase();
  
  if (lowerSubject.includes('math') || lowerSubject.includes('maths')) {
    return { icon: '∑', type: 'math' };
  } else if (lowerSubject.includes('english')) {
    return { icon: 'A', type: 'english' };
  } else if (lowerSubject.includes('science')) {
    return { icon: '⚗', type: 'science' };
  } else if (lowerSubject.includes('break') || lowerSubject.includes('☕')) {
    return { icon: '☕', type: 'break' };
  } else if (lowerSubject.includes('assembly') || lowerSubject.includes('registration')) {
    return { icon: '📋', type: 'other' };
  } else if (lowerSubject.includes('swimming') || lowerSubject.includes('pe')) {
    return { icon: '🏊', type: 'other' };
  } else if (lowerSubject.includes('art') || lowerSubject.includes('music')) {
    return { icon: '🎨', type: 'other' };
  } else if (lowerSubject.includes('french') || lowerSubject.includes('arabic')) {
    return { icon: '🌍', type: 'other' };
  } else {
    return { icon: '📚', type: 'other' };
  }
}

// Helper function to calculate total lesson time
function getTotalLessonTime(lessons) {
  let totalMinutes = 0;
  lessons.forEach(lesson => {
    const start = getTimeInSeconds(lesson.start);
    const end = getTimeInSeconds(lesson.end);
    totalMinutes += (end - start) / 60;
  });
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function updateTimetable(lessons, currentLesson, nextLesson) {
  const timetableContent = document.getElementById('timetableList');
  const scheduleSummary = document.getElementById('scheduleSummary');
  
  // Update schedule summary
  if (lessons && lessons.length > 0) {
    scheduleSummary.textContent = `${lessons.length} lessons • ${getTotalLessonTime(lessons)}`;
  } else {
    scheduleSummary.textContent = "No lessons today";
  }
  
  timetableContent.innerHTML = '';
  
  if (!lessons) {
    // Weekend
    const weekendElement = document.createElement('div');
    weekendElement.className = 'weekend-message';
    weekendElement.innerHTML = `
      <div class="weekend-icon">🎉</div>
      <div class="weekend-title">No School Today!</div>
      <div class="weekend-subtitle">Enjoy your weekend!</div>
    `;
    timetableContent.appendChild(weekendElement);
    return;
  }
  
  const currentTimeInSeconds = new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds();
  
  lessons.forEach((lesson, index) => {
    const lessonElement = document.createElement('div');
    const subjectInfo = getSubjectInfo(lesson.subject);
    const lessonStart = getTimeInSeconds(lesson.start);
    const lessonEnd = getTimeInSeconds(lesson.end);
    
    let status = 'Upcoming';
    let statusClass = '';
    
    if (currentLesson && lesson.subject === currentLesson.subject) {
      status = 'NOW';
      statusClass = 'current';
    } else if (nextLesson && lesson.subject === nextLesson.subject) {
      status = 'NEXT';
      statusClass = 'next';
    } else if (currentTimeInSeconds > lessonEnd) {
      status = 'Completed';
      statusClass = 'completed';
    }
    
    lessonElement.className = `timetable-lesson ${statusClass} subject-${subjectInfo.type}`;
    lessonElement.innerHTML = `
      <div class="timetable-lesson-icon">${subjectInfo.icon}</div>
      <div class="timetable-lesson-content">
        <div class="timetable-lesson-info">
          <div class="timetable-lesson-subject">${lesson.subject}</div>
          <div class="timetable-lesson-time">${lesson.start} - ${lesson.end}</div>
        </div>
        <div class="timetable-lesson-status">${status}</div>
      </div>
    `;
    
    timetableContent.appendChild(lessonElement);
  });
}

function updateBreakAndSchoolTimers(lessons, currentTimeInSeconds) {
  const breakTimer = document.getElementById('breakTimer');
  const schoolEndTimer = document.getElementById('schoolEndTimer');
  
  if (!lessons || lessons.length === 0) {
    breakTimer.textContent = "No school";
    schoolEndTimer.textContent = "No school";
    return;
  }
  
  // Find next break
  let nextBreak = null;
  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    if (lesson.subject.toLowerCase().includes('break') || lesson.subject.includes('☕')) {
      const breakStart = getTimeInSeconds(lesson.start);
      const breakEnd = getTimeInSeconds(lesson.end);
      
      // If we're currently in a break
      if (currentTimeInSeconds >= breakStart && currentTimeInSeconds < breakEnd) {
        const timeLeftInBreak = breakEnd - currentTimeInSeconds;
        breakTimer.textContent = formatCountdown(timeLeftInBreak);
        breakTimer.parentElement.querySelector('.timer-label').textContent = 'Break Ends';
        nextBreak = null; // We're in a break, so no "next break"
        break;
      }
      // If this break is in the future
      else if (currentTimeInSeconds < breakStart) {
        nextBreak = lesson;
        breakTimer.parentElement.querySelector('.timer-label').textContent = 'Next Break';
        break;
      }
    }
  }
  
  // Update break timer
  if (nextBreak) {
    const breakStart = getTimeInSeconds(nextBreak.start);
    const timeUntilBreak = breakStart - currentTimeInSeconds;
    breakTimer.textContent = formatCountdown(timeUntilBreak);
  } else if (!breakTimer.textContent.includes(':')) {
    // If we're not in a break and no next break found
    breakTimer.textContent = "No more breaks";
  }
  
  // Update school end timer
  const lastLesson = lessons[lessons.length - 1];
  const schoolEndTime = getTimeInSeconds(lastLesson.end);
  const timeUntilSchoolEnds = schoolEndTime - currentTimeInSeconds;
  
  if (timeUntilSchoolEnds > 0) {
    schoolEndTimer.textContent = formatCountdown(timeUntilSchoolEnds);
  } else {
    schoolEndTimer.textContent = "School ended";
  }
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
    
    updateBreakAndSchoolTimers(null, 0);
    updateTimetable(null);
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
  
  // Update break and school end timers
  updateBreakAndSchoolTimers(todayLessons, currentTimeInSeconds);
  
  // Update timetable
  updateTimetable(todayLessons, currentLesson, nextLesson);
}

// Initialize and update every second
updateClock();
setInterval(updateClock, 1000);
