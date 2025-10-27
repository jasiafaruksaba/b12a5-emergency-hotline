const heartCountEl = document.getElementById('heartCount');
const coinCountEl = document.getElementById('coinCount');
const copyCountEl = document.getElementById('copyCount');
const historyListEl = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');

let heartCount = 0;
let coinCount = 100;
let copyCount = 0;
let callHistory = [];

// Utility: format timestamp as hh:mm:ss AM/PM
function formatTime(date = new Date()){
  const pad = n => String(n).padStart(2,'0');
  let hours = date.getHours();
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if(hours === 0) hours = 12;
  return `${pad(hours)}:${minutes}:${seconds} ${ampm}`;
}

// Update UI counts
function updateCounts(){
  heartCountEl.textContent = heartCount;
  coinCountEl.textContent = coinCount;
  copyCountEl.textContent = copyCount;
}

// Render history entries
function renderHistory(){
  historyListEl.innerHTML = '';
  if(callHistory.length === 0){
    const empty = document.createElement('div');
    empty.className = 'empty-note';
    empty.textContent = 'No calls yet.';
    historyListEl.appendChild(empty);
    return;
  }
  for(let i = callHistory.length - 1; i >= 0; i--){
    const entry = callHistory[i];
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <div>
        <div class="meta" style="font-weight:700">${entry.name}</div>
        <div class="meta">${entry.number}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:12px;color:#4f6b57">${entry.time}</div>
      </div>
    `;
    historyListEl.appendChild(item);
  }
}

// Clear history
clearHistoryBtn.addEventListener('click', () => {
  callHistory = [];
  renderHistory();
  alert('Call history cleared.');
});

// Attach events to each card (heart, copy, call)
document.querySelectorAll('.card').forEach(card => {
  const serviceData = JSON.parse(card.getAttribute('data-service'));
  const heartBtn = card.querySelector('.card-heart');
  const copyBtn = card.querySelector('.copy-btn');
  const callBtn = card.querySelector('.call-btn');
  const numberEl = card.querySelector('.card-number');

  // Heart: increment navbar heart count each click
  heartBtn.addEventListener('click', () => {
    heartCount++;
    updateCounts();
    // simple animation feedback
    heartBtn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.3)' }, { transform:'scale(1)' }], { duration:300 });
  });

  // Copy: copy number to clipboard, alert and increase copy count
  copyBtn.addEventListener('click', async () => {
    const number = numberEl.textContent.trim();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(number);
      } else {
        // fallback
        const textarea = document.createElement('textarea');
        textarea.value = number;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      copyCount++;
      updateCounts();
      alert(`Hotline number copied: ${number}`);
    } catch (err) {
      alert('Unable to copy to clipboard.');
    }
  });

  // Call: decrease coins by 20 each call, block if insufficient, alert and add to history
  callBtn.addEventListener('click', () => {
    const name = serviceData.name;
    const number = serviceData.number;
    if (coinCount < 20) {
      alert('Not enough coins to make a call. Each call costs 20 coins.');
      return;
    }

    // Deduct coins
    coinCount -= 20;
    updateCounts();

    // Show alert with service name and number
    alert(`Calling ${name} (${number})`);

    // Add to call history with exact timestamp
    const now = new Date();
    const time = formatTime(now);
    callHistory.push({ name, number, time });
    renderHistory();
  });
});

// initialize counts in UI
updateCounts();
renderHistory();