document.getElementById('open-sidebar').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('translate-x-full');
});

document.getElementById('close-sidebar').addEventListener('click', () => {
  document.getElementById('sidebar').classList.add('translate-x-full');
});
