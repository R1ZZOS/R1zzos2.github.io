const { DateTime } = luxon;
const evaluaciones = {
  "2025-06-24": "Formación Ciudadana",
  "2025-06-25": "BD",
  "2025-07-03": "Álgebra",
  "2025-07-19": "Álgebra",
  "2025-07-22": "Formación + Álgebra",
  "2025-07-23": "BD + Formación"
};
const startDate = DateTime.fromISO("2025-06-21");
const endDate = DateTime.fromISO("2025-12-31");
let estado = 'trabajo';
let calendar = {};
let date = startDate;
while (date <= endDate) {
  for (let i = 0; i < 4 && date <= endDate; i++) {
    calendar[date.toISODate()] = estado;
    date = date.plus({ days: 1 });
  }
  estado = estado === 'trabajo' ? 'libre' : 'trabajo';
}
let currentMonth = 6;
const monthTitle = document.getElementById('monthTitle');
const daysEl = document.getElementById('days');
function renderMonth(month) {
  daysEl.innerHTML = '';
  const current = DateTime.fromObject({ year: 2025, month, day: 1 });
  monthTitle.textContent = current.setLocale('es').toFormat('MMMM yyyy');
  ["Lu","Ma","Mi","Ju","Vi","Sa","Do"].forEach(d => {
    const el = document.createElement('div');
    el.className = 'day-name';
    el.textContent = d;
    daysEl.appendChild(el);
  });
  const offset = (current.weekday + 6) % 7;
  for (let i = 0; i < offset; i++) {
    const empty = document.createElement('div');
    empty.className = 'day';
    daysEl.appendChild(empty);
  }
  let d = current;
  while (d.month === month) {
    const iso = d.toISODate();
    const status = calendar[iso];
    const evalName = evaluaciones[iso];
    const div = document.createElement('div');
    div.className = 'day';
    if (evalName) div.classList.add('evaluacion');
    else if (status === 'trabajo') div.classList.add('trabajo');
    else if (status === 'libre') div.classList.add('libre');
    div.innerHTML = `<strong>${d.day}</strong><br>${status || ''}${evalName ? '<br>📝' : ''}`;
    div.onclick = () => {
      document.getElementById('modalFecha').textContent = d.setLocale('es').toFormat('cccc, d LLLL yyyy');
      document.getElementById('modalTipo').textContent = status || '---';
      if (evalName) {
        document.getElementById('modalEval').style.display = 'block';
        document.getElementById('modalEvaluacion').textContent = evalName;
      } else {
        document.getElementById('modalEval').style.display = 'none';
      }
      document.getElementById('modal').style.display = 'flex';
    };
    daysEl.appendChild(div);
    d = d.plus({ days: 1 });
  }
}
function cambiarMes(delta) {
  currentMonth += delta;
  if (currentMonth < 6) currentMonth = 12;
  if (currentMonth > 12) currentMonth = 6;
  renderMonth(currentMonth);
}
renderMonth(currentMonth);
