/* DeluxTable: Year 8 timetable + portable import/export + image OCR */

const DEFAULT_TIMETABLE = {
  Monday: [
    { start: "7:40 AM", end: "8:00 AM", subject: "Registration & Wellbeing Check" },
    { start: "8:00 AM", end: "8:50 AM", subject: "Assembly", room: "46" },
    { start: "8:50 AM", end: "9:40 AM", subject: "Arabic" },
    { start: "9:40 AM", end: "10:30 AM", subject: "Islamic" },
    { start: "10:30 AM", end: "10:50 AM", subject: "Break", kind: "break" },
    { start: "10:50 AM", end: "11:40 AM", subject: "English" },
    { start: "11:40 AM", end: "12:30 PM", subject: "Maths" },
    { start: "12:30 PM", end: "1:20 PM", subject: "Science" },
    { start: "1:20 PM", end: "1:50 PM", subject: "Lunch", kind: "lunch" },
    { start: "1:50 PM", end: "2:40 PM", subject: "Humanities" },
  ],
  Tuesday: [
    { start: "7:40 AM", end: "8:00 AM", subject: "Registration & Wellbeing Check" },
    { start: "8:00 AM", end: "8:50 AM", subject: "French" },
    { start: "8:50 AM", end: "9:40 AM", subject: "PE (Boys PE / Girls Swimming)" },
    { start: "9:40 AM", end: "10:30 AM", subject: "Science" },
    { start: "10:30 AM", end: "10:50 AM", subject: "Break", kind: "break" },
    { start: "10:50 AM", end: "11:40 AM", subject: "English" },
    { start: "11:40 AM", end: "12:30 PM", subject: "Arabic" },
    { start: "12:30 PM", end: "1:20 PM", subject: "Islamic" },
    { start: "1:20 PM", end: "1:50 PM", subject: "Lunch", kind: "lunch" },
    { start: "1:50 PM", end: "2:40 PM", subject: "Maths" },
  ],
  Wednesday: [
    { start: "7:40 AM", end: "8:00 AM", subject: "Registration & Wellbeing Check" },
    { start: "8:00 AM", end: "8:50 AM", subject: "Arabic" },
    { start: "8:50 AM", end: "9:40 AM", subject: "Science" },
    { start: "9:40 AM", end: "10:30 AM", subject: "ICT" },
    { start: "10:30 AM", end: "10:50 AM", subject: "Break", kind: "break" },
    { start: "10:50 AM", end: "11:40 AM", subject: "Maths" },
    { start: "11:40 AM", end: "12:30 PM", subject: "English" },
    { start: "12:30 PM", end: "1:20 PM", subject: "Music" },
    { start: "1:20 PM", end: "1:50 PM", subject: "Lunch", kind: "lunch" },
    { start: "1:50 PM", end: "2:40 PM", subject: "Humanities" },
  ],
  Thursday: [
    { start: "7:40 AM", end: "8:00 AM", subject: "Registration & Wellbeing Check" },
    { start: "8:00 AM", end: "8:50 AM", subject: "PE (Girls PE / Boys Swimming)" },
    { start: "8:50 AM", end: "9:40 AM", subject: "UAE SST" },
    { start: "9:40 AM", end: "10:30 AM", subject: "Art" },
    { start: "10:30 AM", end: "10:50 AM", subject: "Break", kind: "break" },
    { start: "10:50 AM", end: "11:40 AM", subject: "Maths" },
    { start: "11:40 AM", end: "12:30 PM", subject: "English" },
    { start: "12:30 PM", end: "1:20 PM", subject: "Arabic" },
    { start: "1:20 PM", end: "1:50 PM", subject: "Lunch", kind: "lunch" },
    { start: "1:50 PM", end: "2:40 PM", subject: "Science" },
  ],
  Friday: [
    { start: "7:40 AM", end: "8:00 AM", subject: "Registration & Wellbeing Check" },
    { start: "8:00 AM", end: "8:50 AM", subject: "MSC / MED" },
    { start: "8:50 AM", end: "9:40 AM", subject: "English" },
    { start: "9:40 AM", end: "10:00 AM", subject: "Break", kind: "break" },
    { start: "10:00 AM", end: "11:00 AM", subject: "Maths" },
  ],
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SUBJECT_ALIASES = {
  "PE": "PE", "IT": "ICT", "ICT": "ICT", "ENG": "English", "ENGLISH": "English",
  "MAT": "Maths", "MATH": "Maths", "MATHS": "Maths", "SCI": "Science", "SCIENCE": "Science",
  "ARA": "Arabic", "ARABIC": "Arabic", "ISL": "Islamic", "ISLAMIC": "Islamic",
  "MUS": "Music", "MUSIC": "Music", "HUM": "Humanities", "HUMANITIES": "Humanities",
  "FRE": "French", "FRENCH": "French", "ART": "Art", "MSC": "MSC / MED", "MED": "MSC / MED",
  "UAE": "UAE SST", "UAE SS": "UAE SST", "UAE SST": "UAE SST",
  "BREAK": "Break", "LUNCH": "Lunch", "ASSEMBLY": "Assembly"
};

let timetable = loadTimetable();
let timetableMeta = loadMeta();
let ocrBusy = false;

function deepCopy(value) { return JSON.parse(JSON.stringify(value)); }

function loadTimetable() {
  try {
    const saved = localStorage.getItem("deluxtable-timetable");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") return parsed;
    }
  } catch (error) { console.warn("Could not load saved timetable:", error); }
  return deepCopy(DEFAULT_TIMETABLE);
}

function loadMeta() {
  try { return JSON.parse(localStorage.getItem("deluxtable-meta") || '{"year":"8"}'); }
  catch { return { year: "8" }; }
}

function saveTimetable() {
  localStorage.setItem("deluxtable-timetable", JSON.stringify(timetable));
  localStorage.setItem("deluxtable-meta", JSON.stringify(timetableMeta));
}

function convertTo24Hour(timeStr) {
  const match = String(timeStr).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return { hours: 0, minutes: 0 };
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const modifier = match[3].toUpperCase();
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return { hours, minutes };
}

function getTimeInSeconds(timeStr) { const { hours, minutes } = convertTo24Hour(timeStr); return hours * 3600 + minutes * 60; }

function formatCountdown(seconds) {
  if (seconds <= 0) return "00:00:00";
  const h = Math.floor(seconds / 3600), m = Math.floor((seconds % 3600) / 60), s = Math.floor(seconds % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function getSubjectInfo(subject, kind) {
  const lower = String(subject).toLowerCase();
  if (kind === "break" || lower.includes("break")) return { icon: "☕", type: "break" };
  if (kind === "lunch" || lower.includes("lunch")) return { icon: "🍴", type: "break" };
  if (lower.includes("math")) return { icon: "∑", type: "math" };
  if (lower.includes("english")) return { icon: "A", type: "english" };
  if (lower.includes("science")) return { icon: "⚗", type: "science" };
  if (lower.includes("assembly") || lower.includes("registration")) return { icon: "📋", type: "other" };
  if (lower.includes("swim") || lower.includes("pe")) return { icon: "🏊", type: "other" };
  if (lower.includes("art") || lower.includes("music")) return { icon: "🎨", type: "other" };
  if (lower.includes("french") || lower.includes("arabic") || lower.includes("uae")) return { icon: "🌍", type: "other" };
  return { icon: "📚", type: "other" };
}

function isBreak(lesson) { return lesson.kind === "break" || String(lesson.subject).toLowerCase().includes("break"); }
function isLunch(lesson) { return lesson.kind === "lunch" || String(lesson.subject).toLowerCase().includes("lunch"); }
function secondsSinceMidnight(date) { return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds(); }

function getTotalLessonTime(lessons) {
  let totalMinutes = 0;
  lessons.forEach(lesson => { if (!isBreak(lesson) && !isLunch(lesson)) totalMinutes += Math.max(0, getTimeInSeconds(lesson.end) - getTimeInSeconds(lesson.start)) / 60; });
  const hours = Math.floor(totalMinutes / 60), minutes = totalMinutes % 60;
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function getSchoolEndTime(lessons) {
  const actual = lessons.filter(lesson => !isBreak(lesson) && !isLunch(lesson));
  return actual.length ? getTimeInSeconds(actual[actual.length - 1].end) : null;
}

function updateTimetable(lessons, currentLesson, nextLesson) {
  const content = document.getElementById("timetableList"), summary = document.getElementById("scheduleSummary");
  if (!content || !summary) return;
  content.innerHTML = "";
  if (!lessons) {
    summary.textContent = "Weekend";
    content.innerHTML = `<div class="weekend-message"><div class="weekend-icon">🎉</div><div class="weekend-title">No School Today!</div><div class="weekend-subtitle">Enjoy your weekend!</div></div>`;
    return;
  }
  const teachingLessons = lessons.filter(lesson => !isBreak(lesson) && !isLunch(lesson));
  summary.textContent = `${teachingLessons.length} lessons • ${getTotalLessonTime(lessons)}`;
  const nowSeconds = secondsSinceMidnight(new Date());
  lessons.forEach(lesson => {
    const subjectInfo = getSubjectInfo(lesson.subject, lesson.kind), lessonEnd = getTimeInSeconds(lesson.end);
    let status = "Upcoming", statusClass = "";
    if (currentLesson === lesson) { status = "NOW"; statusClass = "current"; }
    else if (nextLesson === lesson) { status = "NEXT"; statusClass = "next"; }
    else if (nowSeconds >= lessonEnd) { status = "Completed"; statusClass = "completed"; }
    const room = lesson.room ? `<span class="lesson-room">Room ${escapeHtml(lesson.room)}</span>` : "";
    const element = document.createElement("div");
    element.className = `timetable-lesson ${statusClass} subject-${subjectInfo.type}`;
    element.innerHTML = `<div class="timetable-lesson-icon">${subjectInfo.icon}</div><div class="timetable-lesson-content"><div class="timetable-lesson-info"><div class="timetable-lesson-subject">${escapeHtml(lesson.subject)} ${room}</div><div class="timetable-lesson-time">${escapeHtml(lesson.start)} - ${escapeHtml(lesson.end)}</div></div><div class="timetable-lesson-status">${status}</div></div>`;
    content.appendChild(element);
  });
}

function updateBreakAndSchoolTimers(lessons, nowSeconds) {
  const breakTimer = document.getElementById("breakTimer"), schoolEndTimer = document.getElementById("schoolEndTimer");
  const breakLabel = breakTimer?.parentElement?.querySelector(".timer-label");
  if (!lessons || lessons.length === 0) {
    if (breakTimer) breakTimer.textContent = "No school";
    if (schoolEndTimer) schoolEndTimer.textContent = "No school";
    return;
  }
  let activeBreak = null, nextBreak = null;
  for (const lesson of lessons) {
    if (!isBreak(lesson)) continue;
    const start = getTimeInSeconds(lesson.start), end = getTimeInSeconds(lesson.end);
    if (nowSeconds >= start && nowSeconds < end) { activeBreak = lesson; break; }
    if (nowSeconds < start) { nextBreak = lesson; break; }
  }
  if (activeBreak) { if (breakLabel) breakLabel.textContent = "Break Ends"; breakTimer.textContent = formatCountdown(getTimeInSeconds(activeBreak.end) - nowSeconds); }
  else if (nextBreak) { if (breakLabel) breakLabel.textContent = "Next Break"; breakTimer.textContent = formatCountdown(getTimeInSeconds(nextBreak.start) - nowSeconds); }
  else { if (breakLabel) breakLabel.textContent = "Breaks Done"; breakTimer.textContent = "00:00:00"; }
  const schoolEnd = getSchoolEndTime(lessons);
  if (schoolEnd === null) schoolEndTimer.textContent = "No school";
  else if (nowSeconds < schoolEnd) schoolEndTimer.textContent = formatCountdown(schoolEnd - nowSeconds);
  else schoolEndTimer.textContent = "School ended";
}

function updateClock() {
  const now = new Date(), currentDay = DAY_NAMES[now.getDay()];
  const time = document.getElementById("time"), day = document.getElementById("day"), yearTitle = document.getElementById("yearTitle");
  if (!time || !day) return;
  let hours = now.getHours();
  const minutes = now.getMinutes(), seconds = now.getSeconds(), ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  time.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${ampm}`;
  day.textContent = currentDay;
  if (yearTitle) yearTitle.textContent = `YEAR ${timetableMeta.year || "8"}`;

  const todayLessons = timetable[currentDay];
  if (!todayLessons) {
    document.getElementById("currentLesson").textContent = "No school today!";
    document.getElementById("nextLesson").textContent = "Enjoy your weekend!";
    document.getElementById("currentTimer").textContent = "🥳";
    document.getElementById("nextTimer").textContent = "🎉";
    updateBreakAndSchoolTimers(null, 0); updateTimetable(null); return;
  }

  const nowSeconds = secondsSinceMidnight(now);
  let currentLesson = null, nextLesson = null;
  for (let i = 0; i < todayLessons.length; i++) {
    const lesson = todayLessons[i], start = getTimeInSeconds(lesson.start), end = getTimeInSeconds(lesson.end);
    if (nowSeconds >= start && nowSeconds < end) { currentLesson = lesson; nextLesson = todayLessons[i + 1] || null; break; }
    if (nowSeconds < start) { nextLesson = lesson; break; }
  }
  const currentTitle = document.getElementById("currentLesson"), currentTimer = document.getElementById("currentTimer");
  const nextTitle = document.getElementById("nextLesson"), nextTimer = document.getElementById("nextTimer");
  if (currentLesson) { currentTitle.textContent = currentLesson.subject; currentTimer.textContent = formatCountdown(getTimeInSeconds(currentLesson.end) - nowSeconds); }
  else { currentTitle.textContent = nowSeconds >= (getSchoolEndTime(todayLessons) || 0) ? "School finished" : "No current lesson"; currentTimer.textContent = "--:--:--"; }
  if (nextLesson) { nextTitle.textContent = nextLesson.subject; nextTimer.textContent = formatCountdown(getTimeInSeconds(nextLesson.start) - nowSeconds); }
  else { nextTitle.textContent = "No more lessons today"; nextTimer.textContent = "00:00:00"; }
  updateBreakAndSchoolTimers(todayLessons, nowSeconds); updateTimetable(todayLessons, currentLesson, nextLesson);
}

function exportTimetable() {
  const payload = { format: "DeluxTable", version: 2, exportedAt: new Date().toISOString(), year: String(timetableMeta.year || "8"), timetable };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  downloadBlob(blob, `deluxtable-year-${payload.year}.json`); showToast("Timetable exported ✓");
}

function importJSONFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result), imported = payload.timetable || payload;
      validateTimetable(imported); timetable = normaliseTimetable(imported); timetableMeta.year = String(payload.year || timetableMeta.year || "8");
      saveTimetable(); closeImportModal(); updateClock(); showToast("Timetable imported ✓");
    } catch (error) { console.error(error); showToast("That timetable file could not be imported.", true); }
  };
  reader.readAsText(file);
}

function validateTimetable(data) {
  if (!data || typeof data !== "object") throw new Error("Invalid timetable");
  const days = Object.keys(data).filter(day => DAY_NAMES.includes(day));
  if (!days.length) throw new Error("No days found");
  for (const day of days) {
    if (!Array.isArray(data[day])) throw new Error(`Invalid ${day} schedule`);
    data[day].forEach(lesson => { if (!lesson.start || !lesson.end || !lesson.subject) throw new Error(`Invalid lesson in ${day}`); });
  }
}

function normaliseTimetable(data) {
  const result = {};
  DAY_NAMES.slice(1, 6).forEach(day => {
    if (Array.isArray(data[day])) result[day] = data[day].map(lesson => ({ start: String(lesson.start), end: String(lesson.end), subject: String(lesson.subject), ...(lesson.room ? { room: String(lesson.room) } : {}), ...(lesson.kind ? { kind: String(lesson.kind) } : {}) }));
  });
  return result;
}

/* Image Preprocessing to maximize OCR accuracy */
function preprocessImageCanvas(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      // Upscale for high resolution text extraction
      const scale = Math.max(1, 2000 / Math.max(img.width, img.height));
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      
      // High-contrast grayscale conversion
      for (let i = 0; i < data.length; i += 4) {
        const v = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
        const contrastFactor = 1.4;
        const adjusted = ((v / 255 - 0.5) * contrastFactor + 0.5) * 255;
        const clamped = Math.min(255, Math.max(0, adjusted));
        data[i] = clamped;
        data[i + 1] = clamped;
        data[i + 2] = clamped;
      }
      ctx.putImageData(imgData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

async function importImageFile(file) {
  if (ocrBusy) return;
  ocrBusy = true;
  const status = document.getElementById("ocrStatus"), progress = document.getElementById("ocrProgress");
  status.textContent = "Enhancing timetable photo clarity…"; progress.style.width = "8%";
  try {
    const processedImageDataUrl = await preprocessImageCanvas(file);
    status.textContent = "Loading OCR engine…"; progress.style.width = "18%";
    await ensureTesseract(); 
    
    progress.style.width = "25%";
    const result = await Tesseract.recognize(processedImageDataUrl, "eng", { logger: message => {
      if (message.status === "recognizing text" && Number.isFinite(message.progress)) {
        progress.style.width = `${25 + Math.round(message.progress * 65)}%`;
        status.textContent = `Analyzing grid text… ${Math.round(message.progress * 100)}%`;
      }
    }});
    
    progress.style.width = "92%";
    const parsed = parseTimetableOCR(result.data);
    if (!parsed || !Object.keys(parsed.timetable).length) throw new Error("No timetable cells were detected.");
    
    progress.style.width = "100%"; timetable = parsed.timetable; timetableMeta.year = parsed.year || timetableMeta.year || "8";
    saveTimetable(); closeImportModal(); updateClock(); showToast(`Image imported${parsed.year ? ` for Year ${parsed.year}` : ""} ✓`);
  } catch (error) {
    console.error("OCR import failed:", error);
    status.textContent = "Could not read image clearly. Re-trying baseline OCR scan...";
    
    // Fallback: Run baseline without heavy preprocessing if binarization failed
    try {
      const fallbackResult = await Tesseract.recognize(file, "eng");
      const parsedFallback = parseTimetableOCR(fallbackResult.data);
      if (parsedFallback && Object.keys(parsedFallback.timetable).length) {
        timetable = parsedFallback.timetable; 
        timetableMeta.year = parsedFallback.year || timetableMeta.year || "8";
        saveTimetable(); closeImportModal(); updateClock(); showToast(`Image imported successfully ✓`);
        return;
      }
    } catch (fallbackErr) {
      console.error("Fallback OCR failed:", fallbackErr);
    }
    
    status.textContent = "OCR couldn't read the layout. Try a straighter, lit photo or JSON import.";
    progress.style.width = "0%"; showToast("Failed to parse image timetable.", true);
  } finally { ocrBusy = false; }
}

function ensureTesseract() {
  if (window.Tesseract) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    script.onload = () => window.Tesseract ? resolve() : reject(new Error("Tesseract unavailable"));
    script.onerror = () => reject(new Error("Could not load OCR engine")); document.head.appendChild(script);
  });
}

function parseTimetableOCR(data) {
  const lines = (Array.isArray(data.lines) ? data.lines : []).map(line => ({
    text: normaliseOCR(line.text || ""), x: line.bbox ? (line.bbox.x0 + line.bbox.x1) / 2 : 0, y: line.bbox ? (line.bbox.y0 + line.bbox.y1) / 2 : 0
  })).filter(line => line.text);
  
  const yearMatch = lines.map(line => line.text.match(/\bYEAR\s*(\d{1,2})\b/i)).find(Boolean), year = yearMatch ? yearMatch[1] : null;
  const dayPositions = {};
  for (const line of lines) for (const day of ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY"]) if (line.text === day || line.text.includes(day)) dayPositions[day[0] + day.slice(1).toLowerCase()] = line.x;
  
  const xs = Object.values(dayPositions), fallback = xs.length >= 2 ? interpolateFiveColumns(Math.min(...xs), Math.max(...xs)) : [0,1,2,3,4];
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
  days.forEach((day, index) => { if (!dayPositions[day]) dayPositions[day] = fallback[index]; });
  
  const subjectLines = lines.filter(line => isLikelySubjectLine(line.text)), cells = {};
  days.forEach(day => cells[day] = []);
  for (const line of groupOCRLines(subjectLines, dayPositions)) {
    const day = nearestDay(line.x, dayPositions), parsed = parseSubjectLine(line.text);
    if (day && parsed) cells[day].push({ ...parsed, y: line.y });
  }
  
  days.forEach(day => { cells[day] = dedupeOCRCells(cells[day].sort((a,b) => a.y-b.y)); });
  
  if (looksLikeSchoolGrid(lines)) {
    const exact = buildKnownGridFromOCR(cells);
    if (exact) return { year, timetable: exact };
  }
  
  const timetableOut = {}; days.forEach(day => { timetableOut[day] = buildScheduleFromOCR(day, cells[day]); });
  return { year, timetable: timetableOut };
}

function looksLikeSchoolGrid(lines) {
  const text = lines.map(line => line.text).join(" ");
  return /REGISTRATION|WELLBEING/i.test(text) && /MONDAY/i.test(text) && /FRIDAY/i.test(text) && /7[.:]40/i.test(text);
}

function buildKnownGridFromOCR(cells) {
  const expected = {
    Monday: ["Assembly","Arabic","Islamic","Break","English","Maths","Science","Lunch","Humanities"],
    Tuesday: ["French","PE","Science","Break","English","Arabic","Islamic","Lunch","Maths"],
    Wednesday: ["Arabic","Science","ICT","Break","Maths","English","Music","Lunch","Humanities"],
    Thursday: ["PE","UAE SST","Art","Break","Maths","English","Arabic","Lunch","Science"],
    Friday: ["MSC / MED","English","Break","Maths"]
  };
  let totalScore = 0, totalPossible = 0;
  for (const day of Object.keys(expected)) {
    const found = (cells[day] || []).map(item => item.subject.toLowerCase().replace(/[^a-z]/g, ""));
    for (const subject of expected[day]) { 
      totalPossible++; 
      const target = subject.toLowerCase().replace(/[^a-z]/g, ""); 
      if (found.some(text => text.includes(target) || target.includes(text))) totalScore++; 
    }
  }
  if (totalScore / totalPossible < 0.50) return null;
  const output = {};
  for (const day of Object.keys(expected)) {
    const found = cells[day] || []; if (!found.length) return null;
    let cursor = 8 * 60;
    const dayLessons = [{ start: "7:40 AM", end: "8:00 AM", subject: "Registration & Wellbeing Check" }];
    found.forEach((item, index) => {
      let duration = item.subject === "Break" ? 20 : item.subject === "Lunch" ? 30 : 50;
      if (day === "Friday" && index === found.length - 1 && found.length === 4 && item.subject === "Maths") duration = 60;
      const start = minutesToTime(cursor); cursor += duration;
      const lesson = { start, end: minutesToTime(cursor), subject: item.subject };
      if (item.subject === "Assembly" && day === "Monday") lesson.room = "46";
      if (item.subject === "Break") lesson.kind = "break"; if (item.subject === "Lunch") lesson.kind = "lunch";
      dayLessons.push(lesson);
    });
    output[day] = dayLessons;
  }
  return output;
}

function groupOCRLines(lines, dayPositions) {
  const grouped = [], assigned = lines.map(line => ({ ...line, day: nearestDay(line.x, dayPositions) })).filter(line => line.day).sort((a,b) => a.y-b.y);
  for (const line of assigned) {
    const last = grouped[grouped.length - 1];
    if (last && last.day === line.day && Math.abs(last.y-line.y) < 32 && Math.abs(last.x-line.x) < 95) {
      last.text = `${last.text} ${line.text}`.replace(/\s+/g, " ").trim(); last.x = (last.x + line.x) / 2; last.y = (last.y + line.y) / 2;
    } else grouped.push({ ...line });
  }
  return grouped;
}

function buildScheduleFromOCR(day, items) {
  const base = [{ start: "7:40 AM", end: "8:00 AM", subject: "Registration & Wellbeing Check" }]; let cursor = 8 * 60;
  items.forEach((item, index) => {
    let duration = item.subject === "Break" ? 20 : item.subject === "Lunch" ? 30 : 50;
    if (day === "Friday" && index === items.length - 1 && items.length === 4 && item.subject === "Maths") duration = 60;
    const lesson = { start: minutesToTime(cursor), end: minutesToTime(cursor + duration), subject: item.subject };
    if (item.subject === "Break") lesson.kind = "break"; if (item.subject === "Lunch") lesson.kind = "lunch";
    base.push(lesson); cursor += duration;
  });
  return base;
}

function parseSubjectLine(text) {
  const upper = text.toUpperCase().replace(/[|]/g, " ").replace(/\s+/g, " ").trim();
  if (/REGISTRATION|WELLBEING/.test(upper) || /^YEAR\b/.test(upper)) return null;
  if (/BREAK/.test(upper)) return { subject: "Break" }; 
  if (/LUNCH/.test(upper)) return { subject: "Lunch" };
  if (/ASSEMBLY/.test(upper)) return { subject: "Assembly" };
  if (/BOYS\s*PE.*GIRLS\s*SWIM|PE.*BOYS.*GIRLS.*SWIM/.test(upper)) return { subject: "PE (Boys PE / Girls Swimming)" };
  if (/GIRLS\s*PE.*BOYS\s*SWIN|PE.*GIRLS.*BOYS.*SWIN/.test(upper)) return { subject: "PE (Girls PE / Boys Swimming)" };
  if (/MSC\s*\/?\s*MED/.test(upper)) return { subject: "MSC / MED" }; 
  if (/UAE\s*SS(T)?/.test(upper)) return { subject: "UAE SST" };
  for (const token of upper.split(/\s+/)) if (SUBJECT_ALIASES[token]) return { subject: SUBJECT_ALIASES[token] };
  return null;
}

function isLikelySubjectLine(text) { return /ASSEMBLY|BREAK|LUNCH|MSC|MED|UAE|PE|BOYS|GIRLS|SWIN|SWIM|FRE|ARA|ISL|ENG|MAT|SCI|IT|ART|MUS|HUM|FRENCH|ARABIC|ENGLISH|MATH|SCIENCE|MUSIC|HUMANITIES/i.test(text); }

function normaliseOCR(text) { return String(text).replace(/[—–]/g, "-").replace(/[“”]/g, '"').replace(/[’]/g, "'").replace(/\bSWIN\b/gi, "SWIM").replace(/\bWUNC\b/gi, "LUNCH").replace(/\s+/g, " ").trim(); }
function interpolateFiveColumns(min, max) { const step = (max-min)/4; return [0,1,2,3,4].map(i => min + step*i); }
function nearestDay(x, positions) { let best=null, distance=Infinity; for (const [day,position] of Object.entries(positions)) { const d=Math.abs(x-position); if (d<distance) { distance=d; best=day; } } return best; }
function dedupeOCRCells(items) { const result=[]; items.forEach(item => { if (!result.some(existing => Math.abs(existing.y-item.y)<18 && existing.subject===item.subject)) result.push(item); }); return result; }
function minutesToTime(totalMinutes) { const hours24=Math.floor(totalMinutes/60)%24, minutes=totalMinutes%60, modifier=hours24>=12?"PM":"AM", hours12=hours24%12||12; return `${hours12}:${String(minutes).padStart(2,"0")} ${modifier}`; }
function downloadBlob(blob, filename) { const url=URL.createObjectURL(blob), link=document.createElement("a"); link.href=url; link.download=filename; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
function openImportModal() { const modal=document.getElementById("importModal"); if (modal) { modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); } }
function closeImportModal() { const modal=document.getElementById("importModal"); if (modal) { modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); } }
function showToast(message, isError=false) { const toast=document.getElementById("toast"); if (!toast) return; toast.textContent=message; toast.className=`toast show${isError?" error":""}`; clearTimeout(showToast.timeout); showToast.timeout=setTimeout(() => toast.classList.remove("show"), 3000); }

function setupControls() {
  document.getElementById("importBtn")?.addEventListener("click", openImportModal);
  document.getElementById("closeImportBtn")?.addEventListener("click", closeImportModal);
  document.getElementById("exportBtn")?.addEventListener("click", exportTimetable);
  document.getElementById("jsonFile")?.addEventListener("change", event => { const file=event.target.files?.[0]; if (file) importJSONFile(file); event.target.value=""; });
  document.getElementById("imageFile")?.addEventListener("change", event => { const file=event.target.files?.[0]; if (file) importImageFile(file); event.target.value=""; });
  document.getElementById("resetBtn")?.addEventListener("click", () => { if (!confirm("Reset DeluxTable to the built-in Year 8 timetable?")) return; timetable=deepCopy(DEFAULT_TIMETABLE); timetableMeta={year:"8"}; saveTimetable(); closeImportModal(); updateClock(); showToast("Year 8 timetable restored ✓"); });
  document.getElementById("yearInput")?.addEventListener("change", event => { const value=event.target.value.trim(); if (value) { timetableMeta.year=value; saveTimetable(); updateClock(); } });
  
  const yearIn = document.getElementById("yearInput");
  if (yearIn) yearIn.value = timetableMeta.year || "8";
  
  document.addEventListener("keydown", event => { if (event.key==="Escape") closeImportModal(); });
  document.getElementById("importModal")?.addEventListener("click", event => { if (event.target.id==="importModal") closeImportModal(); });
}

function escapeHtml(value) { return String(value).replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[char])); }

setupControls(); 
updateClock(); 
setInterval(updateClock, 1000);
