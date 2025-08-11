import './AppModal.js';

const openModalBtn = document.getElementById('openModalBtn');

openModalBtn.addEventListener('click', () => {
  // Tạo phần tử <app-modal>
  const modal = document.createElement('app-modal');
  // Thêm nội dung cho modal
  modal.innerHTML = `
    <h2>Modal Title</h2>
    <p>This is the content of the modal. You can put any HTML you want here.</p>
    <p>Press ESC or the × button to close.</p>
  `;
  // Mở modal
  modal.open();
  
  // Thêm sự kiện open và close
  modal.addEventListener('open', () => {
    console.log('Modal đã mở!');
  });
  modal.addEventListener('close', () => {
    console.log('Modal đã đóng!');
  });
});