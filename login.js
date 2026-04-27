function switchTab(tab) {
  document.querySelectorAll('.tab').forEach((b, i) => {
    b.classList.toggle('active', (tab==='login' && i===0)||(tab==='signup' && i===1));
  });
  document.getElementById('login-panel').classList.toggle('active', tab==='login');
  document.getElementById('signup-panel').classList.toggle('active', tab==='signup');
}

function togglePass(id, btn) {
  const el = document.getElementById(id);
  el.type = el.type === 'password' ? 'text' : 'password';
  btn.textContent = el.type === 'password' ? '👁️' : '🙈';
}

function checkStrength(val) {
  const fill = document.getElementById('str-fill');
  let s = 0;
  if (val.length >= 8) s++;
  if (/[A-Z]/.test(val)) s++;
  if (/[0-9]/.test(val)) s++;
  if (/[^A-Za-z0-9]/.test(val)) s++;
  const colors = ['#FF6B6B','#FFA94D','#FFD43B','#6BCB77'];
  const widths  = ['25%','50%','75%','100%'];
  fill.style.width      = s ? widths[s-1]  : '0%';
  fill.style.background = s ? colors[s-1] : 'transparent';
}

function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

function validate(id, cond, errId) {
  document.getElementById(errId).style.display = cond ? 'none' : 'block';
  document.getElementById(id).classList.toggle('invalid', !cond);
  return cond;
}

function toast(msg, icon='✅') {
  document.getElementById('t-msg').textContent = msg;
  document.getElementById('t-icon').textContent = icon;
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function handleLogin() {
  const email = document.getElementById('l-email').value.trim();
  const pass  = document.getElementById('l-pass').value;

  const emailOk = validate('l-email', isEmail(email), 'l-email-err');
  const passOk  = validate('l-pass',  pass.length >= 8, 'l-pass-err');

  if (emailOk && passOk) {
    toast('Welcome back, Chef! 🍳', '👨‍🍳');
    setTimeout(() => {
      window.location.href = 'Dashboard.html';
    }, 1500);
  }
}

function handleSignup() {
  const name  = document.getElementById('s-name').value.trim();
  const email = document.getElementById('s-email').value.trim();
  const pass  = document.getElementById('s-pass').value;
  const cpass = document.getElementById('s-cpass').value;

  const ok =
    validate('s-name',  name.length > 0,             's-name-err')  &
    validate('s-email', isEmail(email),               's-email-err') &
    validate('s-pass',  pass.length >= 8,             's-pass-err')  &
    validate('s-cpass', pass===cpass&&cpass.length>0, 's-cpass-err');

  if (ok) {
    localStorage.setItem('userName', name);
    toast('Welcome, ' + name.split(' ')[0] + '! 🎉', '✅');
    setTimeout(() => {
      window.location.href = 'Dashboard.html';
    }, 1500);
  }
}