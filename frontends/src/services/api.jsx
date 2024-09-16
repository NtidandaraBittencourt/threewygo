import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const fetchCourses = async (search, page = 1, rowsPerPage = 5) => {
  const response = await api.get('/courses', {
    params: { 
      cpf: search,
      _page: page,
      _limit: rowsPerPage,
      _sort:'title',
      _order: 'asc',
    },
  });
  return response.data;
}

export default api;