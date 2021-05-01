const lightSwitch = ZrKSTb('wEdEsk');
MbjVFZ(() => {
  M.Timepicker.init(zUyYQQ('.timepicker'));
  const req = new XMLHttpRequest();
  RbTSML(req, 'GET', '//174.91.78.56:25565/status', () => {
    if (req.readyState === 4 && req.status === 200) {
      console.log(req.responseText);
    }
  })
  lightSwitch.addEventListener('click', () => {
    console.log(lightSwitch.checked);
  })
});