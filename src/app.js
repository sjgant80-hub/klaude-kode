// 🚀 App - Main application controller
import { Auth } from './auth.js';
import { GitOps } from './git-ops.js';
import { ClaudeNode } from './claude-node.js';
import { CodeArray } from './code-array.js';
import { Nav } from './nav.js';
import { UI } from './ui.js';
import { Keyboard } from './keyboard.js';

export class App {
  constructor() {
    this.auth = new Auth();
    this.ui = new UI();
    this.nav = new Nav();
    this.kb = new Keyboard();
    this.grid = new CodeArray();
    this.gh = null;
    this.cl = null;
  }

  // Initialize app
  init() {
    if (this.auth.isReady()) {
      this.gh = new GitOps(localStorage.gh_token, localStorage.gh_repo);
      this.cl = new ClaudeNode();
      this.setupKeys();
      this.load();
    } else {
      this.ui.showAuth();
    }
    this.kb.attach();
  }

  // Setup keyboard shortcuts
  setupKeys() {
    this.kb.setupNav(this.nav, () => this.load());
    this.kb.bind('s', true, () => this.save());
    this.kb.bind('i', true, () => this.save(true));
  }

  // Load current file
  async load() {
    this.ui.status('Loading...');
    this.ui.coord(...this.nav.pos());
    let code = this.grid.get(...this.nav.pos());
    if (!code && this.gh) {
      code = await this.gh.get(this.nav.path()) || '';
      this.grid.set(...this.nav.pos(), code);
    }
    this.ui.editor(code);
    this.ui.status('Ready');
  }

  // Save current file
  async save(ai = false) {
    this.ui.status(ai ? 'AI...' : 'Saving...');
    let code = this.ui.editor();
    if (ai && this.cl) code = await this.cl.improve(code);
    if (this.gh) await this.gh.put(this.nav.path(), code, 'Edit');
    this.grid.set(...this.nav.pos(), code);
    this.ui.editor(code);
    this.ui.status('Saved');
  }
}
