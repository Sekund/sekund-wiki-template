export function applyDarkMode(d: boolean) {
  const body = document.getElementsByTagName('body')[0];
  if (body) {
    body.classList.remove('dark');
    body.classList.remove('light');
    body.classList.add(d ? 'dark' : 'light');
  }
}
