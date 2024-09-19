import axios from 'axios';
import { Course } from '../Types/Course'

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const fetchCourses = async (page: number, rowsPerPage: number): Promise<{ courses: Course[], total: number }> => {
  const response = await api.get('/courses', {
    params: { 
      page: page,
      limit: rowsPerPage
    },
  });
  return response.data;
}

export const submitCourse = async (course: Course) => {
  if (course.id) {
    const response = await api.put(`/courses/${course.id}`, course);
    return response.data;
  } else {
    const response = await api.post('/courses', course);
    return response.data;
  }
};

export const deleteCourse = async (courseId: string) => {
  try {
    const response = await api.delete(`/courses/${courseId}`);
    return response.data;
  } catch (error: any) {
    // Garante que o erro tem a estrutura esperada
    const errorMessage = error.response?.data?.error || 'Erro ao excluir curso';
    throw new Error(errorMessage);
  }
};


export default api;