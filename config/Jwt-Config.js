export const jwtSecret = 'yoursecret';
export const jwtSession = {
  session: false
};
export const ROLES = {
  member: 1, 
  owner: 2,
  name: (value) => Object.keys(ROLES).find(e=>ROLES[e]===value)
};