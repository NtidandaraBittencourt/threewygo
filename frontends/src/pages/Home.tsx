import React, { useState } from 'react';
import { Box, useToast   } from '@chakra-ui/react';
import { TableWithActions } from '../shared/Table/TableWithActions';
import { DateRangeFilter } from '../shared/Table/DataRangeFilter';
import { DynamicFormDrawer } from '../shared/Form/DynamicFormDrawer';
import { fetchCourses, submitCourse, deleteCourse  } from '../services/api'
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [search, setSearch] = useState();
  const [page, setPage] = useState(5)
  const [rowsPerPage, setRowsPerPage] = useState('')

  const { data, error, isLoading, refetch } = useQuery({
		queryKey: ['courses', search, page, rowsPerPage],
		queryFn: () => fetchCourses(search, page, rowsPerPage),
	});

  const handleOpenDrawer = (course: any) => {
    const courseUpload = data?.find((item: any) => item.id === course);
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

  const handleSubmit = async (values: any) => {
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
        title: 'Erro ao salvar o curso.',
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

  const onFilter = () => {
    console.log('filtra')
  }

  return (
    <Box>
      <DateRangeFilter onFilter={function (startDate: string, endDate: string): void {
        throw new Error('Function not implemented.');
      } }/>

      <TableWithActions
        isLoading={isLoading}
        error={error || null}
        items={data || []}
        columns={columns}
        title="Courses"
        onEdit={handleOpenDrawer}
        onDelete={handleDelete}
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
