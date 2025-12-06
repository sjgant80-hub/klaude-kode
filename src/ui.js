// 🎨 UI - DOM helpers and status management
export class UI {
  constructor() {
    this.els = {};
  }

  // Query and cache element
  $(id) { return this.els[id] ||= document.getElementById(id); }

  // Status message with auto-clear
  status(msg, ms = 2000) {
    const el = this.$('status');
    if (el) {
      el.textContent = msg;
      if (ms > 0) setTimeout(() => el.textContent = 'Ready', ms);
    }
  }

  // Update coord display
  coord(x, y, z) {
    const el = this.$('coord');
    if (el) el.textContent = `[${x},${y},${z}]`;
  }

  // Get/set editor value
  editor(val) {
    const ed = this.$('ed');
    if (val !== undefined) ed.value = val;
    return ed?.value || '';
  }

  // Update cell preview
  cell(i, text) {
    const el = this.$('c' + i);
    if (el) el.textContent = text ? text.slice(0, 80) + '...' : '[empty]';
  }

  // Show auth modal
  showAuth() { this.$('auth')?.classList.remove('hidden'); }
  hideAuth() { this.$('auth')?.classList.add('hidden'); }

  // Toast notification
  toast(msg, type = 'info') {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }
}
