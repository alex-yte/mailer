const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

document.addEventListener('DOMContentLoaded', ()=>{
  // Get references to the necessary elements
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const openButton = document.getElementById('open-modal');

  // Function to open the modal
  function openModal() {
      modal.classList.add('active');
  }

  // Function to close the modal
  function closeModal() {
      modal.classList.remove('active');
  }

  // Event listeners for opening and closing the modal
  openButton.addEventListener('click', openModal);
  overlay.addEventListener('click', closeModal);

  const menuButton = document.querySelectorAll('.mobile-menu-toggle');
  const closeMenuButton = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobileMenu');
  menuButton.forEach((item)=>{
    item.addEventListener('click', () => {
      if (mobileMenu.style.right === '0px') {
        mobileMenu.style.right = '-350px';
      } else {
        mobileMenu.style.right = '0px';
      }
    });
  })


})

document.addEventListener('DOMContentLoaded', ()=>{
const form = document.getElementById('form');
form.addEventListener('submit', formSend);

async function formSend(e){
  e.preventDefault();

  let error = formValidate(form);

  let formData = new FormData(form);
  

  if(error === 0){
    console.log(formData);
    let indicator = document.getElementById('status');
    indicator.classList.add('active')
    form.classList.add('_sending')
    let response = await fetch('mail.php',{
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
    if(response.ok){
      try {
        let result = await response.json();
        indicator.innerHTML = result.message;
        form.reset();
      } catch (error) {
        indicator.innerHTML = "An error occurred while processing the response.";
      }
    }else{
      indicator.innerHTML='';
      alert('Error');
    }
  }else{
    // alert('Some required fields are empty');
    let indicator = document.getElementById('status');
    indicator.classList.add('active');
    indicator.innerHTML = "Some fields are either empty or filled incorrectly";
  }

}

function formValidate(form) {
  console.log(form);
  let error = 0;
  let formReq = document.querySelectorAll('._req');
  
  for (let i=0; i<formReq.length; i++){
    const input = formReq[i];
    formRemoveError(input);
    if(input.classList.contains('name')){
      if(nameTest(input)){
        formAddError(input);
        error++;
      }
    }else{
      if (input.value === ''){
        formAddError(input);
        error++;
      }
    }
  }
  return error;
}

function formAddError(input) {
  // input.parentElement.classList.add('_error');
  input.classList.add('_error');
}
function formRemoveError(input) {
  // input.parentElement.classList.remove('_error');
  input.classList.remove('_error');
}
function nameTest(input){
  return !/^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/.test(input.value);
}




})