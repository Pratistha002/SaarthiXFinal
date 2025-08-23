/* SaarthiX - Your Personal Assistance (vanilla JS widget)
   - Renders floating chat UI
   - Handles open/close, suggestions, basic rule-based replies
   - No backend calls (can integrate later)
*/
(function () {
  const state = { open: false };

  // Create launcher button
  const launcher = document.createElement('button');
  launcher.id = 'sx-chat-launcher';
  launcher.innerHTML = `
    <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" stroke="white" stroke-width="1.5"/>
    </svg>
    <span>Your Personal Assistance</span>
    <span class="pulse"></span>
  `;

  // Create widget container
  const widget = document.createElement('div');
  widget.id = 'sx-chat-widget';
  widget.innerHTML = `
    <div id="sx-chat-header">
      <div id="sx-chat-title">
        <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C7.03 3 3 6.58 3 11c0 2.04.9 3.9 2.39 5.34-.15 1.14-.61 2.49-1.65 3.48 1.8.2 3.55-.39 4.76-1.1 1.02.2 2.07.31 3.15.31 4.97 0 9-3.58 9-8s-4.03-8-9-8z" stroke="#b9d1ff" stroke-width="1.2"/>
        </svg>
        <span>Your Personal Assistance</span>
        <span class="badge">Beta</span>
      </div>
      <div id="sx-chat-controls">
        <button id="sx-minimize" title="Minimize" aria-label="Minimize">−</button>
        <button id="sx-close" title="Close" aria-label="Close">×</button>
      </div>
    </div>
    <div id="sx-chat-messages" aria-live="polite"></div>
    <div id="sx-quick-suggestions"></div>
    <form id="sx-chat-input">
      <textarea id="sx-chat-textarea" placeholder="Type your message..." rows="1"></textarea>
      <button type="submit" id="sx-send-btn">Send</button>
    </form>
  `;

  // Helpers
  const messagesEl = widget.querySelector('#sx-chat-messages');
  const inputEl = widget.querySelector('#sx-chat-textarea');
  const suggestionsEl = widget.querySelector('#sx-quick-suggestions');

  function timeNow() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function addMessage(text, role = 'bot') {
    const row = document.createElement('div');
    row.className = `sx-msg ${role}`;
    row.innerHTML = `
      <div class="bubble">${text}</div>
      <span class="sx-time">${timeNow()}</span>
    `;
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function setSuggestions(items) {
    suggestionsEl.innerHTML = '';
    items.forEach((label) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = label;
      btn.addEventListener('click', () => handleUserInput(label));
      suggestionsEl.appendChild(btn);
    });
  }

  function greet() {
    addMessage('Hi! I\'m your Personal Assistance. How can I help you today?');
    setSuggestions([
      'Show me pricing',
      'Guide me as a Student',
      'Institute offerings',
      'Post a job / Internship',
      'Interview prep help'
    ]);
  }

  function handleUserInput(text) {
    if (!text || !text.trim()) return;
    addMessage(escapeHtml(text), 'user');

    // Simple router for common intents
    const t = text.toLowerCase();
    if (t.includes('price') || t.includes('pricing')) {
      addMessage('Opening pricing details for Students, Institutes and Industry.');
      linkHint('/pricing.html');
    } else if (t.includes('student')) {
      addMessage('As a student, you can explore Job Blueprint, Hire me Profile, Resume, Courses, Interview Prep, and Career Counselling.');
      linkHint('/students.html');
    } else if (t.includes('institute')) {
      addMessage('For institutes, we provide internships & placements access, trainings, workshops, expert sessions, and collaborations.');
      linkHint('/institute.html');
    } else if (t.includes('industry') || t.includes('job') || t.includes('internship')) {
      addMessage('You can post jobs/internships, access database, technical interview AI, hackathons, and campus access.');
      linkHint('/industry.html');
    } else if (t.includes('interview')) {
      addMessage('For interview preparation, check questions, practice videos, and our AI interview preview.');
      linkHint('/interview-questions.html');
    } else if (t.includes('contact') || t.includes('help')) {
      addMessage('You can reach us via the footer social links or start by telling me your goal.');
    } else {
      addMessage('Got it! I\'ll keep improving. Meanwhile, try asking about pricing, student guide, institute offerings, or industry options.');
    }
  }

  function linkHint(href) {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = 'Open ' + href.replace('/', '');
    a.style.color = '#b9d1ff';
    a.style.textDecoration = 'underline';
    a.target = '_self';
    const wrapper = document.createElement('div');
    wrapper.appendChild(a);
    addMessage(wrapper.innerHTML, 'bot');
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Events
  launcher.addEventListener('click', () => {
    state.open = !state.open;
    widget.classList.toggle('open', state.open);
    launcher.style.display = state.open ? 'none' : 'inline-flex';
    if (state.open && messagesEl.childElementCount === 0) greet();
  });
  widget.querySelector('#sx-minimize').addEventListener('click', () => {
    state.open = false; widget.classList.remove('open'); launcher.style.display = 'inline-flex';
  });
  widget.querySelector('#sx-close').addEventListener('click', () => {
    state.open = false; widget.classList.remove('open'); launcher.style.display = 'inline-flex';
  });

  widget.querySelector('#sx-chat-input').addEventListener('submit', (e) => {
    e.preventDefault();
    const val = inputEl.value.trim();
    if (!val) return;
    handleUserInput(val);
    inputEl.value = '';
  });

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      widget.querySelector('#sx-chat-input').dispatchEvent(new Event('submit'));
    }
  });

  // Mount to DOM
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(launcher);
    document.body.appendChild(widget);
  });
})();