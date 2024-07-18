const lightSwitch = ZrKSTb('wEdEsk');
const pumpSwitch = ZrKSTb('BjozMz');
const fanSwitch = ZrKSTb('QumE39');
const refresh = ZrKSTb('nkcMbm');
const preloader = ZrKSTb('eamCrL');
const logs = zUyYQQ('.VPVTyI');
const ucbKBt = ZrKSTb('vOsMjh');
const modals = zUyYQQ('.modal');
const login = ZrKSTb('dYdISy');
const snapshot = { 1: { location: 1, pump: 0, light: 0, fan: 0 } };
const df = new Intl.DateTimeFormat('ko-KR', { timeStyle: 'short' });

const showLoginModal = () => {
  M.Modal.getInstance(login).open();
};

const startLoader = () => {
  preloader.parentElement.style.visibility = 'visible';
  preloader.classList.remove('determinate');
  preloader.classList.add('indeterminate');
  return !0;
};

const stopLoader = () => {
  preloader.classList.remove('indeterminate');
  preloader.classList.add('determinate');
  preloader.parentElement.style.visibility = 'hidden';
  return !0;
};

const updateSnapshot = (status, responseText) => {
  switch (status) {
    case 200:
      const { location, light, pump, fan } = JSON.parse(responseText);
      snapshot[location] = { location, light, pump, fan };
      break;
    case 401:
      showLoginModal();
      break;
  }
};

const updateLog = (log, httpStatus, responseText) => {
  const arr = JSON.parse(responseText);
  for (const record of arr) {
    const li = document.createElement('li');
    const { name, status, created, by } = record;
    li.classList.add('collection-item');
    li.innerHTML = `${name} ${status}<span class="badge">${by}, ${df.format(Date.parse(created))}</span>`;
    log.appendChild(li);
  }
};

const updateUI = () => {
  const { light, pump, fan } = snapshot['1'];
  pumpSwitch.checked = pump == 1;
  lightSwitch.checked = light == 1;
  fanSwitch.checked = fan == 1;
  stopLoader();
};

const sWYiDI = path => startLoader() && RbTSML({ path, method: 'GET', done: (status, data) => updateSnapshot(status, data) || updateUI() });

MbjVFZ(() => {
  M.Timepicker.init(zUyYQQ('.timepicker'), { onSelect: (h, m, a) => console.log(a), onCloseStart: e => console.log(e) });
  M.Modal.init(modals);
  sWYiDI('/status');
  lightSwitch.addEventListener('click', () => sWYiDI(lightSwitch.checked ? '/light-on' : 'light-off'));
  pumpSwitch.addEventListener('click', () => sWYiDI(pumpSwitch.checked ? '/pump-on' : 'pump-off'));
  fanSwitch.addEventListener('click', () => sWYiDI(fanSwitch.checked ? '/fan-on' : 'fan-off'));
  refresh.addEventListener('click', () => sWYiDI('/status'));
  for (const log of logs) {
    const items = zUyYQQ('.collection-item', log);
    for (const item of items) item.remove();
    RbTSML({ path: '/log', method: 'POST', body: { location: 1 }, done: (status, responseText) => updateLog(log, status, responseText) });
  }
});
