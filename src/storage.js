// 💾 Storage - LocalStorage wrapper with JSON support
export class Storage {
  constructor(prefix = 'cc3d_') {
    this.p = prefix;
    this.ls = window.localStorage;
  }

  // Key with prefix
  k(key) { return this.p + key; }

  // Basic ops
  get(key) { return this.ls.getItem(this.k(key)); }
  set(key, val) { this.ls.setItem(this.k(key), val); }
  del(key) { this.ls.removeItem(this.k(key)); }
  has(key) { return this.get(key) !== null; }

  // JSON ops
  getJSON(key) {
    try { return JSON.parse(this.get(key)); }
    catch { return null; }
  }
  setJSON(key, val) { this.set(key, JSON.stringify(val)); }

  // Cache helpers
  cache(key, val, ttl = 3600000) {
    this.setJSON(key, { val, exp: Date.now() + ttl });
  }
  cached(key) {
    const d = this.getJSON(key);
    if (d && d.exp > Date.now()) return d.val;
    this.del(key);
    return null;
  }

  // Bulk ops
  keys() {
    return Object.keys(this.ls)
      .filter(k => k.startsWith(this.p))
      .map(k => k.slice(this.p.length));
  }
  clear() { this.keys().forEach(k => this.del(k)); }
}
