// 🔐 Auth - GitHub OAuth + optional Claude
const GH_TOKEN = 'https://github.com/settings/tokens/new';
const GH_OAUTH = 'https://github.com/login/oauth/authorize';

export class Auth {
  constructor() {
    this.ls = window.localStorage;
    this.repo = this.detectRepo();
  }

  // Auto-detect repo from GitHub Pages URL
  detectRepo() {
    const cached = this.ls.getItem('gh_repo');
    if (cached) return cached;

    const h = location.hostname;
    const p = location.pathname.split('/')[1];

    if (h.endsWith('.github.io')) {
      const user = h.replace('.github.io', '');
      const repo = p || `${user}.github.io`;
      this.ls.setItem('gh_repo', `${user}/${repo}`);
      return `${user}/${repo}`;
    }
    return null;
  }

  // Status - only GitHub required
  hasGitHub() { return !!this.ls.getItem('gh_token'); }
  hasClaude() { return !!this.ls.getItem('ant_key'); }
  isReady() { return this.hasGitHub(); }
  getRepo() { return this.repo; }

  // GitHub OAuth URL (needs client_id from OAuth App)
  gitHubOAuth(clientId) {
    const state = crypto.randomUUID();
    this.ls.setItem('gh_state', state);
    return `${GH_OAUTH}?client_id=${clientId}&scope=repo&state=${state}`;
  }

  // Fallback: direct token creation
  gitHubTokenUrl() {
    return `${GH_TOKEN}?scopes=repo&description=Claude-Code-3D`;
  }

  // Set tokens
  setGitHub(t) { this.ls.setItem('gh_token', t); }
  setClaude(k) { this.ls.setItem('ant_key', k); }

  logout() { this.ls.clear(); }
}
