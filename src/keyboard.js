// ⌨️ Keyboard - Input handling and shortcuts
export class Keyboard {
  constructor() {
    this.bindings = new Map();
    this.enabled = true;
  }

  // Bind key combo to action
  bind(key, ctrl, action) {
    const k = this.toKey(key, ctrl);
    this.bindings.set(k, action);
  }

  // Generate key string
  toKey(key, ctrl = false) {
    return `${ctrl ? 'C-' : ''}${key.toLowerCase()}`;
  }

  // Handle keydown event
  handle(e) {
    if (!this.enabled) return;
    const k = this.toKey(e.key, e.ctrlKey);
    const action = this.bindings.get(k);
    if (action) {
      e.preventDefault();
      action();
    }
  }

  // Setup default navigation bindings
  setupNav(nav, onMove) {
    this.bind('w', true, () => { nav.north(); onMove(); });
    this.bind('s', true, () => { nav.south(); onMove(); });
    this.bind('a', true, () => { nav.west(); onMove(); });
    this.bind('d', true, () => { nav.east(); onMove(); });
    this.bind('q', true, () => { nav.down(); onMove(); });
    this.bind('e', true, () => { nav.up(); onMove(); });
  }

  // Attach to document
  attach() {
    document.addEventListener('keydown', e => this.handle(e));
  }

  // Toggle on/off
  toggle(on) { this.enabled = on ?? !this.enabled; }
}
