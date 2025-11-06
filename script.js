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

class TimetableTracker {
  constructor() {
    this.cacheKey = 'timetable_cache';
    this.cacheDuration = 24 * 60 * 60 * 1000; // 24 hours
    this.init();
  }

  init() {
    this.loadFromCache();
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  loadFromCache() {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (cached) {
        const data = JSON.parse(cached);
        if (Date.now() - data.timestamp < this.cacheDuration) {
          console.log('Loaded from cache');
        }
      }
    } catch (e) {
      console.log('No cache available');
    }
  }

  saveToCache() {
    try {
      const cacheData = {
        timetable: timetable,
        timestamp: Date.now()
      };
      localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    } catch (e) {
      console.log('Failed to save cache');
    }
  }

  updateFlipClock(now) {
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    this.flipDigit(document.querySelector('.flip-clock .flip-card:nth-child(1)'), hours[0]);
    this.flipDigit(document.querySelector('.flip-clock .flip-card:nth-child(2)'), hours[1]);
    this.flipDigit(document.querySelector('.flip-clock .flip-card:nth-child(4)'), minutes[0]);
    this.flipDigit(document.querySelector('.flip-clock .flip-card:nth-child(5)'), minutes[1]);
    this.flipDigit(document.querySelector('.flip-clock .flip-card:nth-child(7)'), seconds[0]);
    this.flipDigit(document.querySelector('.flip-clock .flip-card:nth-child(8)'), seconds[1]);
  }

  flipDigit(card, newDigit) {
    const top = card.querySelector('.top');
    const bottom = card.querySelector('.bottom');
    
    if (top.textContent !== newDigit) {
      top.textContent = newDigit;
      bottom.textContent = newDigit;
      
      card.classList.add('flipping');
      setTimeout(() => {
        card.classList.remove('flipping');
      }, 600);
    }
  }

  updateTime() {
    const now = new Date();
    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const day = dayNames[now.getDay()];

    // Update flip clock
    this.updateFlipClock(now);

    // Update day
    document.getElementById("day").textContent = day;

    const lessons = timetable[day];
    const lessonEl = document.getElementById("lesson");
    const timerEl = document.getElementById("timer");

    const nowSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    // WEEKEND
    if (!lessons) {
      lessonEl.textContent = "Weekend! No lessons 🥳";
      const minsUntilNext = (24 * 60 * 60 - nowSeconds) + this.getSeconds(timetable["Monday"][0].start);
      timerEl.textContent = `Next lesson in: ${this.formatTimeLeft(minsUntilNext)}`;
      document.getElementById("timetableList").textContent = "";
      this.saveToCache();
      return;
    }

    const currentLesson = this.findCurrentLesson(lessons, nowSeconds);
    const nextLesson = this.findNextLesson(lessons, nowSeconds);

    // Update lesson and timer
    if (currentLesson) {
      const endSec = this.getSeconds(currentLesson.end);
      const timeLeft = endSec - nowSeconds;

      lessonEl.textContent = currentLesson.subject;

      if (nextLesson) {
        const toNext = this.getSeconds(nextLesson.start) - nowSeconds;
        timerEl.textContent = `Ends in: ${this.formatTimeLeft(timeLeft)} | Next: ${this.formatTimeLeft(toNext)}`;
      } else {
        timerEl.textContent = `Ends in: ${this.formatTimeLeft(timeLeft)} | All done today ✅`;
      }
    } else if (nextLesson) {
      const untilNextSec = this.getSeconds(nextLesson.start) - nowSeconds;
      lessonEl.textContent = nextLesson.subject;
      timerEl.textContent = `Starts in: ${this.formatTimeLeft(untilNextSec)}`;
    } else {
      lessonEl.textContent = "No lessons right now 🫡";
      const nextDayLesson = this.findNextDayLesson(now);
      if (nextDayLesson) {
        timerEl.textContent = `Next lesson: ${this.formatTimeLeft(nextDayLesson.timeLeft)}`;
      } else {
        timerEl.textContent = "😴 Enjoy your break!";
      }
    }

    // Update timetable display
    this.updateTimetableUI(lessons, currentLesson, nextLesson);
    this.saveToCache();
  }

  findCurrentLesson(lessons, nowS) {
    return lessons.find(l => nowS >= this.getSeconds(l.start) && nowS < this.getSeconds(l.end)) || null;
  }

  findNextLesson(lessons, nowS) {
    return lessons.find(l => this.getSeconds(l.start) > nowS) || null;
  }

  findNextDayLesson(now) {
    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let nextDayIndex = (now.getDay() + 1) % 7;
    let nextDay = dayNames[nextDayIndex];
    
    while (!timetable[nextDay] && nextDayIndex !== now.getDay()) {
      nextDayIndex = (nextDayIndex + 1) % 7;
      nextDay = dayNames[nextDayIndex];
    }
    
    if (timetable[nextDay]) {
      const nowSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      const secondsUntilNext = (24 * 3600 - nowSeconds) + this.getSeconds(timetable[nextDay][0].start);
      return {
        day: nextDay,
        timeLeft: secondsUntilNext
      };
    }
    return null;
  }

  getSeconds(timeStr) {
    const [h, m, period] = timeStr.split(/[: ]/);
    let hour = parseInt(h);
    const min = parseInt(m);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    return hour * 3600 + min * 60;
  }

  formatTimeLeft(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  }

  updateTimetableUI(lessons, currentLesson, nextLesson) {
    const timetableHTML = lessons.map(lesson => {
      let className = "timetable-lesson";
      if (currentLesson && currentLesson.subject === lesson.subject) {
        className += " current";
      } else if (!currentLesson && nextLesson && nextLesson.subject === lesson.subject) {
        className += " next";
      }
      return `<span class="${className}">${lesson.start} - ${lesson.end}: ${lesson.subject}</span>`;
    }).join("");

    document.getElementById("timetableList").innerHTML = `<strong>Today's Schedule</strong>${timetableHTML}`;
  }
}

// Initialize the timetable tracker
new TimetableTracker();
