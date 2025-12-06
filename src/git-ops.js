// ⚡ GitOps [Browser→GitHub Direct] - NO BACKEND!
const API = 'https://api.github.com';

export class GitOps {
  constructor(token, repo) {
    this.tok = token;
    this.repo = repo;
  }

  headers() {
    return {
      'Authorization': `token ${this.tok}`,
      'Accept': 'application/vnd.github.v3+json'
    };
  }

  // ↓ Read file at path
  async get(path) {
    const res = await fetch(`${API}/repos/${this.repo}/contents/${path}`, {
      headers: this.headers()
    });
    const data = await res.json();
    return atob(data.content);
  }

  // ↑ Write file at path
  async put(path, content, msg = 'Update') {
    const existing = await this.getSha(path);
    return fetch(`${API}/repos/${this.repo}/contents/${path}`, {
      method: 'PUT',
      headers: this.headers(),
      body: JSON.stringify({
        message: msg,
        content: btoa(content),
        sha: existing
      })
    });
  }

  // Get SHA for updates
  async getSha(path) {
    try {
      const res = await fetch(`${API}/repos/${this.repo}/contents/${path}`, {
        headers: this.headers()
      });
      return (await res.json()).sha;
    } catch { return null; }
  }

  // ⑂ Create branch
  async branch(name, from = 'main') {
    const ref = await fetch(`${API}/repos/${this.repo}/git/ref/heads/${from}`, {
      headers: this.headers()
    });
    const sha = (await ref.json()).object.sha;
    return fetch(`${API}/repos/${this.repo}/git/refs`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({ ref: `refs/heads/${name}`, sha })
    });
  }
}
