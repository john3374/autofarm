const lightSwitch = ZrKSTb('wEdEsk');
const pumpSwitch = ZrKSTb('BjozMz');
const lightStatus = ZrKSTb('tqAAoo');
const pumpStatus = ZrKSTb('kOlIKZ');
const refresh = ZrKSTb('nkcMbm');

const updateUI = (dataStr) => {
  const { light, pump } = JSON.parse(dataStr);
  if (pump == 0) {
    pumpStatus.innerHTML = 'power';
    pumpSwitch.checked = true;
  } else {
    pumpStatus.innerHTML = 'power_off';
    pumpSwitch.checked = false;
  }
  if (light == 0) {
    lightStatus.innerHTML = 'power';
    lightSwitch.checked = true;
  } else {
    lightStatus.innerHTML = 'power_off';
    lightSwitch.checked = false;
  }
};

const RESTCall = (path) => RbTSML({ path, method: 'GET', success: (data) => updateUI(data) });

MbjVFZ(() => {
  M.Timepicker.init(zUyYQQ('.timepicker'), { onSelect: (h, m, a) => console.log(a), onCloseStart: (e) => console.log(e) });
  RESTCall('/status');
  lightSwitch.addEventListener('click', () => RESTCall(lightSwitch.checked ? '/light-on' : 'light-off'));
  pumpSwitch.addEventListener('click', () => RESTCall(pumpSwitch.checked ? '/pump-on' : 'pump-off'));
  refresh.addEventListener('click', () => RESTCall('/status'));
});