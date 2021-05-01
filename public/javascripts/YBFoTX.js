const lightSwitch = ZrKSTb('wEdEsk');
const pumpSwitch = ZrKSTb('BjozMz');
const lightStatus = ZrKSTb('tqAAoo');
const pumpStatus = ZrKSTb('kOlIKZ');
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

let attempts = 1;
MbjVFZ(() => {
  M.Timepicker.init(zUyYQQ('.timepicker'));
  const req = new XMLHttpRequest();
  RbTSML(req, 'GET', '/status', () => {
    if (req.readyState === 4 && req.status === 200) {
      console.log(req.responseText);
    }
  })

  lightSwitch.addEventListener('click', () => {
    const req = new XMLHttpRequest();
    if (lightSwitch.checked) {
      RbTSML(req, 'GET', '/light-on', () => {
        if (req.readyState === 4 && req.status === 200) {
          updateUI(req.responseText);
        }
      });
    } else {
      RbTSML(req, 'GET', '/light-off', () => {
        if (req.readyState === 4 && req.status === 200) {
          updateUI(req.responseText);
        }
      });
    }
  });

  pumpSwitch.addEventListener('click', () => {
    const req = new XMLHttpRequest();
    if (pumpSwitch.checked) {
      RbTSML(req, 'GET', '/pump-on', () => {
        if (req.readyState === 4 && req.status === 200) {
          updateUI(req.responseText);
        }
      });
    } else {
      RbTSML(req, 'GET', '/pump-off', () => {
        if (req.readyState === 4 && req.status === 200) {
          updateUI(req.responseText);
        }
      });
    }
  });

  setInterval(() => {
    const req = new XMLHttpRequest();
    RbTSML(req, 'GET', '/status', () => {
      if (req.readyState === 4 && req.status === 200) {
        updateUI(req.responseText);
        attempts = 1;
      } else attempts++;
    });
  }, attempts * 10000);
});