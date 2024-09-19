import React, { useState } from 'react';
import { Box, useToast   } from '@chakra-ui/react';
import { TableWithActions } from '../shared/Table/TableWithActions';
import { DynamicFormDrawer } from '../shared/Form/DynamicFormDrawer';
import { fetchCourses, submitCourse, deleteCourse  } from '../services/api'
import { useQuery } from '@tanstack/react-query';
import Pagination from '../shared/Table/Pagination';
import { Course } from '../Types/Course';


const Home = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const { data, error, isLoading, refetch } = useQuery<{ courses: Course[], total: number }>({
		queryKey: ['courses',  page, rowsPerPage],
		queryFn: () => fetchCourses( page, rowsPerPage),
	});

  const handleOpenDrawer = (courseId: number) => {
    const courseUpload = data?.courses?.find((item: Course) => item.id === courseId);
    if (courseUpload) {
      setSelectedCourse(courseUpload);
      setDrawerOpen(true);
    } else {
      setSelectedCourse(null);
      setDrawerOpen(true);
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedCourse(null);
  };

  const handleSubmit = async (values: Course) => {
    setLoading(true);
    try {
      await submitCourse(values);
      setLoading(false);
      handleCloseDrawer();

      toast({
        title: 'Curso salvo com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      refetch()
    } catch (error) {
      setLoading(false);
      toast({
        title: `Erro ao salvar o curso.${error}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteCourse(id);
      toast({
        title: 'Curso excluído.',
        description: `O curso com ID ${id} foi excluído com sucesso.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      refetch()
    } catch (error) {
      toast({
        title: 'Erro ao excluir curso.',
        description: (error as Error).message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { name: 'Nome', key: 'title' },
    { name: 'Descrição', key: 'description' },
  ];

  return (
    <Box>
      <TableWithActions
        isLoading={isLoading}
        error={error || null}
        items={data?.courses || []}
        columns={columns}
        title="Cursos"
        onEdit={handleOpenDrawer}
        onDelete={handleDelete}
      />

      <Pagination
        total={data?.total || 0}
        currentPage={page}
        pageSize={rowsPerPage}
        onPageChange={(newPage) => setPage(newPage)}
      />

      <DynamicFormDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onSubmit={handleSubmit}
        course={selectedCourse}
        loading={loading}
      />
    </Box>
  );
};

export default Home;
