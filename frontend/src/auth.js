export function isLoggedIn() { return localStorage.getItem('diseaseRiskLoggedIn') === 'true'; }
export function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem('diseaseRiskUser')) || null; } catch { return null; }
}
export function logout() {
  localStorage.removeItem('diseaseRiskLoggedIn');
  localStorage.removeItem('diseaseRiskUser');
}
export function registerUser(user) {
  localStorage.setItem('diseaseRiskUser', JSON.stringify(user));
  localStorage.setItem('diseaseRiskLoggedIn', 'true');
}
export function loginUser(email, password) {
  let stored = null;
  try { stored = JSON.parse(localStorage.getItem('diseaseRiskUser')); } catch {}
  if (!stored || stored.email !== email || stored.password !== password) return false;
  localStorage.setItem('diseaseRiskLoggedIn', 'true');
  return true;
}
