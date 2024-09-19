import React, { useState } from 'react';
import { Input, FormLabel, Button, Flex } from '@chakra-ui/react';

interface DateRangeFilterProps {
  onFilter: (startDate: string, endDate: string) => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    onFilter(startDate, endDate);
  };

  return (
    <Flex direction="column" p={4} mb={4} data-testid="DateRangeFilter">
      <FormLabel>Data de Início</FormLabel>
      <Input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <FormLabel>Data de Fim</FormLabel>
      <Input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <Button mt={4} colorScheme="teal" onClick={handleFilter}>
        Filtrar
      </Button>
    </Flex>
  );
};
