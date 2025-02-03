export function isAdmin(): boolean {
  return (
    localStorage.getItem('admin') === 'true' &&
    localStorage.getItem('loggedIn') === 'true'
  );
}
