const selectedOne = document.querySelector(".selectedOne");
const selectedTwo = document.querySelector(".selectedTwo");

const dropdownOne = document.querySelector(".FromSelect .dropdown");
const dropdownTwo = document.querySelector(".ToSelect .dropdown");

const inputOne = dropdownOne.querySelector("#input1");
const inputTwo = dropdownTwo.querySelector("#input2");

const optionsOne = dropdownOne.querySelectorAll(".option");
const optionsTwo = dropdownTwo.querySelectorAll(".option");

const convert = document.getElementById("convert")
const swap = document.getElementById("swapButton")

const amountDisplay = document.querySelector(".convertedAmount")
const updateValue = document.querySelector(".updateValue")
const rateAppend = document.querySelector(".rateValue")



selectedOne.onclick = () => {
  dropdownOne.style.display =
  dropdownOne.style.display === 'none'?'block':'none';
}

selectedTwo.onclick = () => {
  dropdownTwo.style.display =
  dropdownTwo.style.display === 'none'?'block':'none';
}

/*input search*/

inputOne.oninput = () => {
  const value = inputOne.value.toLowerCase();
  optionsOne.forEach(option => {
    option.style.display = option.textContent.toLowerCase().includes(value) ? 'block' : 'none';
  });
};

inputTwo.oninput = () => {
  const value = inputTwo.value.toLowerCase();
  optionsTwo.forEach(option => {
    option.style.display = option.textContent.toLowerCase().includes(value) ? 'block' : 'none';
  });
};

/* relpace "Select currency" with 
the actual one eg. GHS - Ghana Cedis*/

optionsOne.forEach(option => {
  option.onclick = () => {
  selectedOne.textContent = option.textContent;
  dropdownOne.style.display = "none";
  }
})

optionsTwo.forEach(option => {
  option.onclick = () => {
  selectedTwo.textContent = option.textContent;
  dropdownTwo.style.display = "none";
  }
})

/*click window apart from where the dropdown is and close*/

window.onclick = (e) => {
   e.target.closest(".FromSelect") ? dropdownOne.style.display = "block" : dropdownOne.style.display = "none";
   
   e.target.closest(".ToSelect") ? dropdownTwo.style.display = "block" : dropdownTwo.style.display = "none";
};

swap.onclick = () => {
  setTimeout(() => {
  
    let valueTo = selectedTwo.textContent;
  
    localStorage.setItem("initialValue" , valueTo);
  
    selectedTwo.textContent = selectedOne.textContent;
 
    selectedOne.textContent = localStorage.getItem("initialValue")
  }, 600)
 }
 

convert.onclick  = () => {
  
  const inputData = parseFloat(document.getElementById("amount").value);
  
  const pulse =  document.createElement('div')
  pulse.className = 'spawn'
  pulse.innerHTML = 
           `<div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>`
  
  amountDisplay.appendChild(pulse);
  
  setTimeout(() => {
  amountDisplay.removeChild(pulse)
  }, 4000)
  
  let base = selectedOne.textContent.trim().replace(/^[^\w]*([A-Z]{3})\b.*$/, "$1");
  
  let currency = selectedTwo.textContent.trim().replace(/^[^\w]*([A-Z]{3})\b.*$/, "$1");
  
  fetch(`https://monexia-backend.onrender.com/latest/rates?base=${base}&currencies=${currency}`)
  .then(res => {
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    return res.json();
  })
  .then(data => {
    console.log(data);
    
    let timestamp = data.timestamp
    let date = new Date(timestamp);
    
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    let seconds = date.getSeconds().toString();
    
    updatePeriod = `Time: ${hours}hrs ${minutes}mins ${seconds} secs \nDate: ${data.date}`
    setTimeout(() => {
    updateValue.textContent = updatePeriod
    }, 4000)
    
    rateInfo = `<p id="ratedesign">1 ${base} = ${data.result[currency]} ${currency}</p>`
    
    setTimeout(() => {
    
     rateAppend.innerHTML = rateInfo;
     }, 4000);
     
     amountConverted = (inputData * data.result[currency]).toFixed(2)
     
     amountDisplay.querySelectorAll(".info").forEach(el => el.remove());
      
     amountDisplay.querySelectorAll(".info").forEach(el => el.remove());amountDisplay.querySelectorAll(".info").forEach(el => el.remove());amountDisplay.querySelectorAll(".info").forEach(el => el.remove());const datum =  document.createElement('div')
  datum.className = 'info'
  datum.innerHTML = `<h2 id="text">${amountConverted} in ${currency}</h2>`
     
     setTimeout(() => {
     amountDisplay.appendChild(datum);
     }, 3500)
       
     })
  .catch(err => {
  console.error("Something went wrong:", err.message);
  if (err.stack) console.error(err.stack);
});
};
