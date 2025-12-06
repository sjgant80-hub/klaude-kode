// 📄 Templates - HTML template generators
export const Templates = {
  // Auth modal
  auth: () => `
    <div id="auth" class="modal">
      <h2>🔐 Setup</h2>
      <input id="gh_token" placeholder="GitHub Token (ghp_...)">
      <input id="gh_repo" placeholder="owner/repo">
      <input id="ant_key" placeholder="Anthropic Key (sk-ant-...)">
      <button onclick="app.saveAuth()">Save</button>
      <p class="hint">Or use GitHub OAuth:</p>
      <button onclick="app.authGitHub()">Login with GitHub</button>
    </div>`,

  // Main cube grid
  cube: () => `
    <div class="cube">
      ${[0,1,2,3,4,5,6,7,8].map(i =>
        i === 4
          ? `<div class="cell center" id="c4"><textarea id="ed"></textarea></div>`
          : `<div class="cell" id="c${i}"></div>`
      ).join('')}
    </div>`,

  // Status bar
  status: () => `
    <div class="coord" id="coord">[0,0,0]</div>
    <div class="status" id="status">Ready</div>
    <div class="help">WASD:XY QE:Z ^S:Save ^I:AI</div>`,

  // Toast container
  toasts: () => `<div id="toasts"></div>`,

  // Full page
  page: () => `
    ${Templates.status()}
    ${Templates.auth()}
    ${Templates.cube()}
    ${Templates.toasts()}`
};
