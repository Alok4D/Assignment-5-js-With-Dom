// Start Js code........
// bus ticket Section
const TicketL = 'ABCDEFGHIJ'.split('');
const busSeat = document.querySelector('.ticket');
const ticket4 = document.querySelector('.ticket4');
ticket4.innerHTML = `<div class="col-start-2 bg-[#0307121A] px-5 py-3 lg:px-10 lg:py-5 rounded-xl"><img src="./images/driver seat.svg" alt=""></div>`;
busSeat.innerHTML = `<div class="col-end-4"></div>`;
TicketL.forEach(letter => {
  busSeat.innerHTML += `
  <div class="py-5 text-center">${letter}</div>
  <button class="seat font-medium text-lg text-[#03071280] bg-[#F7F8F8] px-5 py-3 lg:px-10 lg:py-5 rounded-xl cursor-pointer" id="${letter}1">${letter}1</button>
  
  <button class="seat font-medium text-lg text-[#03071280] bg-[#F7F8F8] px-5 py-3 lg:px-10 lg:py-5 rounded-xl cursor-pointer" id="${letter}2">${letter}2</button>
  `

  
  ticket4.innerHTML += `
  <button class="seat font-medium text-lg text-[#03071280] bg-[#F7F8F8] px-5 py-3 lg:px-10 lg:py-5 rounded-xl cursor-pointer" id="${letter}3">${letter}3</button>
  
  <button class="seat font-medium text-lg text-[#03071280] bg-[#F7F8F8] px-5 py-3 lg:px-10 lg:py-5 rounded-xl cursor-pointer" id="${letter}4">${letter}4</button>
  `
});

document.querySelector('form').addEventListener('submit', (e)=> {
  e.preventDefault();
})

function scrollToTickets () {
  const tickets = document.querySelector('#tickets');
  tickets.scrollIntoView({ behavior: 'smooth' });
}
// bus ticket Section...


// ticket array
let ticketsArr = [];
const seats = document.querySelectorAll('.seat');
const seatCount = document.querySelector('#seat-count');
const leftSeats = document.querySelector('#left-seats');
const cuponButton = document.querySelector('#cupon-button');
const submitButt = document.querySelector('#submit-button');
const cuponsArr = ['NEW15', 'Couple 20'];
let cuponSuccess = false;
let discount = 0;
// click color
function toogleCol (seat) {
  seat.classList.toggle('bg-[#F7F8F8]');
  seat.classList.toggle('text-[#03071280]');
  seat.classList.toggle('bg-[#1DD100]');
  seat.classList.toggle('text-white');
}
function prevD (e) {
  e.preventDefault();
}
function updateSeatTable () {
  const tBody = document.querySelector('tBody');
  tBody.innerHTML = '';
  ticketsArr.forEach(ticket => {
    tBody.innerHTML += `
    <tr>
      <th class="p-4 text-[#03071299] text-base font-normal">${ticket}</th>
      <th class="p-4 text-[#03071299] text-base font-normal">Economy</th>
      <th class="p-4 text-[#03071299] text-base font-normal">550</th>
    </tr>
    `
  });
}
function totalPrice () {
  const totalPrice = document.querySelector('#total-price');
  totalPrice.innerText = 0;
  totalPrice.innerText = ticketsArr.length * 550;
} 
function grandPrice () {
  const totalPrice = document.querySelector('#grand-price');
  totalPrice.innerText = 0;
  if(cuponSuccess) {
    totalPrice.innerText = ticketsArr.length * 550 - ticketsArr.length * 550 * discount;
  } else {
    totalPrice.innerText = ticketsArr.length * 550;
  }
}
function makeSubmitDisable () {
  const phoneNumber = document.querySelector('#phone');
  submitButt.disabled = (ticketsArr.length !== 0 && phoneNumber.value !== '') ? false : true;
  if(submitButt.disabled == true) {
    submitButt.classList.remove('bg-[#1DD100]');
    submitButt.classList.add('bg-gray-300');
  } else {
    submitButt.classList.add('bg-[#1DD100]');
    submitButt.classList.remove('bg-gray-300');
  }
}
function makeCuponDisabled () {
  cuponButton.disabled = ticketsArr.length !== 4;
  if(cuponButton.disabled) {
    cuponButton.classList.remove('bg-[#1DD100]');
    cuponButton.classList.add('bg-gray-300');
  } else {
    cuponButton.classList.add('bg-[#1DD100]');
    cuponButton.classList.remove('bg-gray-300');
  }
}
makeSubmitDisable();
makeCuponDisabled();

// on click seats
seats.forEach(seat => {
  seat.addEventListener('click', ()=> {
    if(ticketsArr.includes(seat.id)) {
      ticketsArr = ticketsArr.filter(ticket => ticket !== seat.id);
      toogleCol(seat);
    } else {
      if(ticketsArr.length < 4) {
        ticketsArr.push(seat.id);
        toogleCol(seat);
      }
    }
    seatCount.innerText = ticketsArr.length;
    leftSeats.innerText = 40-ticketsArr.length;
    showDis();
    hideCup();
    updateSeatTable();
    totalPrice();
    grandPrice();
    makeCuponDisabled();
    makeSubmitDisable();
    console.log(ticketsArr);
  })
})

// invalid
function showInvalid () {
  const invalid = document.querySelector('#invalid');
  if(!cuponSuccess) {
    invalid.classList.remove('hidden');
  } else {
    invalid.classList.add('hidden');
  }
}

//hide discount
function showDis () {
  if(ticketsArr.length !== 4) {
    cuponSuccess = false;
  }
  const discountDiv = document.querySelector('#discount');
  const discountPrice = document.querySelector('#discount-price');
  if(cuponSuccess) {
    discountDiv.classList.remove('hidden');
    discountDiv.classList.add('flex');
    discountPrice.innerText = ticketsArr.length * 550 * discount;
  } else {
    discountDiv.classList.add('hidden');
    discountDiv.classList.remove('flex');
  }
}


// hide cupon
function hideCup () {
  const cuponArea = document.querySelector('#cupon-area');
  if(cuponSuccess) {
    cuponArea.classList.add('hidden');
  } else {
    cuponArea.classList.remove('hidden');
  }
}

// handle discount
function handleDis () {
  const cuponText = document.querySelector('#cupon').value;
  
  if(ticketsArr.length === 4) {
    if(cuponsArr.includes(cuponText)) {
      cuponSuccess = true;
      if(cuponText === 'NEW15') {
        discount = 0.15;
      } else {
        discount = 0.20;
      }
      showDis();
      showInvalid();
      hideCup();
    } else {
      cuponSuccess = false;
      showInvalid();
    }
  } else {
    cuponSuccess = false;
    showDis();
    hideCup();
  }

  grandPrice();
}

cuponButton.addEventListener('click', ()=> {
  handleDis();
})
