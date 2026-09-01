# DeluxTable 🗓️

A lightweight, browser-based school timetable that tells you **what you have now, what's next, when break is, and when school ends**.

DeluxTable was originally made as a Year 7 project and is now built to be much easier to share and update when the school timetable changes.

## ✨ Features

- **Live clock** with the current day.
- **Current lesson** and countdown to the end of the lesson.
- **Next lesson** and countdown until it starts.
- **Next break** countdown, including an active break countdown.
- **School ends** countdown.
- **Today's schedule** with completed, current, and upcoming states.
- **Year-aware timetable** so shared timetable files can specify the year.
- **Import / Export** using a small JSON timetable file.
- **Timetable image import** using OCR for the school's grid-style timetable.
- **Local persistence** so an imported timetable stays on the device.
- **Responsive layout** for phones, tablets, and desktop browsers.
- Works as a simple static site with **no backend required** for normal use.

## 📦 Updating the timetable

The recommended workflow when the school changes the timetable is:

1. Open DeluxTable.
2. Import the new timetable JSON, or upload a clear timetable image.
3. Check the generated schedule before relying on it.
4. Export the corrected timetable as JSON.
5. Share that JSON with everyone else.
6. Everyone imports the same file.

**Tip:** JSON is the best option when somebody has already checked the timetable. OCR is a convenience feature, not a replacement for checking the school's official timetable.

## 🧠 Timetable recognition

DeluxTable is designed around the school's grid-style timetable while also accepting common subject abbreviations. Examples include:

| Abbreviation | Displayed as |
|---|---|
| `PE` | PE |
| `IT` | ICT |
| `ENG` | English |
| `MAT` | Maths |
| `SCI` | Science |
| `ARA` | Arabic |
| `ISL` | Islamic |
| `MUS` | Music |
| `HUM` | Humanities |
| `MSC` / `MED` | MSC / MED |

PE and swimming entries can also distinguish **Boys PE / Girls Swimming** and **Girls PE / Boys Swimming** where the timetable provides that information.

Assembly room numbers are preserved when they are detected.

## 🔐 Privacy

DeluxTable does not need an account or server for its normal timetable features. Imported timetable data is stored in the browser's local storage on that device.

Timetable JSON files are ordinary local files. Only share them with people you trust if they contain information you don't want publicly distributed.

## 🛠️ Tech stack

- HTML
- CSS
- Vanilla JavaScript
- Browser Local Storage
- Client-side timetable parsing / OCR

There is intentionally no framework or build step required. Clone the repository and open `index.html` in a browser.

## 📁 Project structure

```text
index.html   # App layout and import/export UI
style.css    # Visual design and responsive styling
script.js    # Timetable data, timers, persistence, import/export and OCR
README.md    # Project documentation
```

## 🚀 Running locally

Because DeluxTable is a static site, you can run it with any simple static web server or deploy the repository to a static hosting service.

For example, with Python installed:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## ⚠️ OCR note

Image recognition can make mistakes, especially with blurry photos, merged cells, unusual room numbers, or handwriting. **Always compare an imported timetable with the school's official timetable before sharing it.**

## 📜 License

No license has currently been selected for this repository. Unless a license is added, normal copyright rules apply to the source code.

---

Made for people who would rather check one timetable than edit JavaScript every time the school moves a lesson. 💀
