const lightSwitch = ZrKSTb('wEdEsk');
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
    console.log(lightSwitch.checked);
  });
  setInterval(() => {
    const req = new XMLHttpRequest();
    RbTSML(req, 'GET', 'http://farm.akfn.net', () => {
      if (req.readyState === 4 && req.status === 200) {
        console.log(req.response);
        attempts = 1;
      } else attempts++;
    })
  }, attempts * 10000);
});