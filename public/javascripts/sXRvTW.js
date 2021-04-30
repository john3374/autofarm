const MbjVFZ = fn =>
  document.readyState === 'complete' || document.readyState === 'interactive'
    ? setTimeout(fn, 1)
    : document.addEventListener('DOMContentLoaded', fn);
const ZrKSTb = a => document.getElementById(a);
const uIakmy = a => document.querySelector(a);
const zUyYQQ = a => document.querySelectorAll(a);
const RbTSML = (z, method, url, fn, jsonBody = null) => {
  z.onreadystatechange = fn;
  z.open(method, url, true);
  z.setRequestHeader('Content-type', 'application/json');
  if (jsonBody) z.send(JSON.stringify(jsonBody));
  else z.send();
};

MbjVFZ(() => {
  M.Timepicker.init(zUyYQQ('.timepicker'));
});
