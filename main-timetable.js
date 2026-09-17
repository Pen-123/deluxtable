/* Canonical timetable bootstrap.
   The JSON file is the single source of truth for the built-in timetable.
   A version marker replaces older locally cached timetables once. */
(function () {
  const VERSION = "year8-image-2026-09-17";
  try {
    if (localStorage.getItem("deluxtable-timetable-version") === VERSION) return;
    const request = new XMLHttpRequest();
    request.open("GET", "./deluxtable-year-8.json", false);
    request.send(null);
    if (request.status >= 200 && request.status < 300) {
      const payload = JSON.parse(request.responseText);
      if (payload && payload.timetable) {
        localStorage.setItem("deluxtable-timetable", JSON.stringify(payload.timetable));
        localStorage.setItem("deluxtable-meta", JSON.stringify({ year: String(payload.year || "8") }));
        localStorage.setItem("deluxtable-timetable-version", VERSION);
      }
    }
  } catch (error) {
    console.warn("Canonical timetable bootstrap failed:", error);
  }
})();
