// 🔐 Auth - Browser OAuth with auto-detect
const GH_OAUTH = 'https://github.com/login/oauth/authorize';
const GH_TOKEN_URL = 'https://github.com/settings/tokens/new';
const ANT_CONSOLE = 'https://console.anthropic.com/settings/keys';

export class Auth {
  constructor() {
    this.ls = window.localStorage;
    this.repo = this.detectRepo();
  }

  // Auto-detect repo from GitHub Pages URL
  detectRepo() {
    const cached = this.ls.getItem('gh_repo');
    if (cached) return cached;

    const h = window.location.hostname;
    const p = window.location.pathname.split('/')[1];

    // username.github.io/repo-name
    if (h.endsWith('.github.io')) {
      const user = h.replace('.github.io', '');
      const repo = p || `${user}.github.io`;
      this.ls.setItem('gh_repo', `${user}/${repo}`);
      return `${user}/${repo}`;
    }
    return null;
  }

  // Auth status
  hasGitHub() { return !!this.ls.getItem('gh_token'); }
  hasClaude() { return !!this.ls.getItem('ant_key'); }
  isReady() { return this.hasGitHub() && this.hasClaude(); }
  getRepo() { return this.repo; }

  // OAuth URLs
  gitHubTokenUrl() {
    return `${GH_TOKEN_URL}?scopes=repo&description=Claude-Code-3D`;
  }
  anthropicUrl() { return ANT_CONSOLE; }

  // Set tokens after OAuth
  setGitHub(token) { this.ls.setItem('gh_token', token); }
  setClaude(key) { this.ls.setItem('ant_key', key); }

  // Clear auth
  logout() {
    ['gh_token', 'ant_key'].forEach(k => this.ls.removeItem(k));
  }
}
