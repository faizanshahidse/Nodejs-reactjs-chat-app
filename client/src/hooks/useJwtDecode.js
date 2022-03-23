import jwt_decode from 'jwt-decode';

export const useJwtDecode = () => {
  const token = localStorage.getItem('authToken');

  const { id } = jwt_decode(token);

  return id;
};
