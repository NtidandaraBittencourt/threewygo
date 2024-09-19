import React from 'react';
import { Table as ChakraTable, Thead, Tbody, Tr, Th, Td, Stack, Skeleton, Flex, Text, Button, Tooltip, Divider } from '@chakra-ui/react';

import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

interface ColumnConfig {
  name: string;
  key: string;
}

interface TableWithActionsProps {
  isLoading: boolean;
  error: string | null;
  items: any[];
  title: string;
  onEdit: (id?: string) => void;
  onDelete: (id: string) => void;
  columns: ColumnConfig[];
}

export const TableWithActions: React.FC<TableWithActionsProps> = ({ isLoading, error, items, title, onEdit, onDelete, columns }) => {
  return (
    <Flex direction="column" p={4} data-testid="TableWithActions">
      <Flex align={"center"} justifyContent={"space-between"} p={4}>
        <Text fontSize="xl"  mb={4}>{title}</Text>
        <Button size="sm" onClick={() => onEdit()} colorScheme="blue" mr={2}>
          Criar novo curso
        </Button>
      </Flex>

      <Divider></Divider>

      {isLoading ? (
        <Stack>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} height="40px" />
          ))}
        </Stack>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <ChakraTable variant='striped' colorScheme='purple'>
          <Thead>
            <Tr>
              {columns.map((col) => (
                <Th key={col.key}>{col.name}</Th>
              ))}
              <Th isNumeric>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            
            {items.map((item: any) => (
              <Tr key={item.id}>
                {columns.map((col) => (
                  <Td key={col.key}>{item[col.key]}</Td>
                ))}
                <Td isNumeric>
                  <Tooltip label="Editar">
                    <Button size="sm" onClick={() => onEdit(item.id)} colorScheme="blue" mr={2}>
                      <EditIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip label="Excluir">
                    <Button size="sm" onClick={() => onDelete(item.id)} colorScheme="red">
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </ChakraTable>
      )}
    </Flex>
  );
};
