import './AppModal.js';

const openModalBtn = document.getElementById('openModalBtn');
const modal = document.querySelector('app-modal');

openModalBtn.addEventListener('click', () => {
  modal.open();
});

modal.addEventListener('open', () => {
  console.log('Modal opened!');
});

modal.addEventListener('close', () => {
  console.log('Modal closed!');
});
