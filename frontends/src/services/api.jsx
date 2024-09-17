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

export const submitCourse = async (course) => {
  if (course.id) {
    const response = await api.put(`/courses/${course.id}`, course);
    return response.data;
  } else {
    const response = await api.post('/courses', course);
    return response.data;
  }
};

export const deleteCourse = async (courseId) => {
  try {
    const response = await api.delete(`/courses/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erro ao excluir curso');
  }
};

export default api;