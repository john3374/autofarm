const MbjVFZ = fn =>
  document.readyState === 'complete' || document.readyState === 'interactive'
    ? setTimeout(fn, 1)
    : document.addEventListener('DOMContentLoaded', fn);
const ZrKSTb = a => document.getElementById(a);
const uIakmy = a => document.querySelector(a);
const zUyYQQ = (a, b) => (b ?? document).querySelectorAll(a);
const RbTSML = (options = null) => {
  if (!options) return false;
  const z = new XMLHttpRequest();
  const { path, method, body, done } = options;
  z.onreadystatechange = () => z.readyState == 4 ? done(z.status, z.responseText) : '';
  z.open(method, path, true);
  z.setRequestHeader('Content-type', 'application/json');
  z.setRequestHeader('Cache-Control', 'no-cache');
  if (body) z.send(JSON.stringify(body));
  else z.send();
};