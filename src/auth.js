// 🔐 Auth - Browser OAuth flows for GitHub & Anthropic
const GH_AUTH = 'https://github.com/login/oauth/authorize';
const GH_SCOPE = 'repo';

export class Auth {
  constructor() {
    this.storage = window.localStorage;
  }

  // Check if authenticated
  hasGitHub() { return !!this.storage.getItem('gh_token'); }
  hasClaude() { return !!this.storage.getItem('ant_key'); }
  isReady() { return this.hasGitHub() && this.hasClaude(); }

  // GitHub OAuth popup flow
  loginGitHub(clientId, redirect) {
    const state = crypto.randomUUID();
    this.storage.setItem('gh_state', state);
    const url = `${GH_AUTH}?client_id=${clientId}&redirect_uri=${redirect}&scope=${GH_SCOPE}&state=${state}`;
    window.open(url, 'gh_auth', 'width=600,height=700');
  }

  // Handle OAuth callback
  handleCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    if (code && state === this.storage.getItem('gh_state')) {
      return code; // Exchange for token server-side or via proxy
    }
    return null;
  }

  // Manual token entry (fallback)
  setGitHub(token) { this.storage.setItem('gh_token', token); }
  setClaude(key) { this.storage.setItem('ant_key', key); }
  setRepo(repo) { this.storage.setItem('gh_repo', repo); }

  // Clear auth
  logout() {
    ['gh_token', 'ant_key', 'gh_repo', 'gh_state'].forEach(k =>
      this.storage.removeItem(k)
    );
  }
}
