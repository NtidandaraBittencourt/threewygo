import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { usePagination } from '@ajna/pagination/dist'

interface PaginationProps {
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, currentPage, pageSize, onPageChange }) => {
  const {
    pages,
    pagesCount,
    currentPage: activePage,
    setCurrentPage,
    pageSize: currentSize,
  } = usePagination({
    total: total,
    initialState: { currentPage: currentPage, pageSize: pageSize },
  });

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
    onPageChange(nextPage);
  };

  return (
    <Flex justifyContent="center" alignItems="center" mt={4}>
      <Button
        onClick={() => handlePageChange(activePage - 1)}
        isDisabled={activePage === 1}
        mr={2}
      >
        Anterior
      </Button>
      <Flex>
        {pages.map((page) => (
          <Button
            key={`pagination_page_${page}`}
            onClick={() => handlePageChange(page)}
            isActive={activePage === page}
            mx={1}
          >
            {page}
          </Button>
        ))}
      </Flex>
      <Button
        onClick={() => handlePageChange(activePage + 1)}
        isDisabled={activePage === pagesCount}
        ml={2}
      >
        Próximo
      </Button>
    </Flex>
  );
};

export default Pagination;