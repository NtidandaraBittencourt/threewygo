import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Text } from '@chakra-ui/react';
import {fetchCourses} from '../services/api'

const Home = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['courses', search, page, rowsPerPage],
        queryFn: () => fetchCourses(search, page, rowsPerPage),

        enabled: search.length === 0 || search.length >= 11
    });
    // keepPreviousData: true,
      

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data</Text>;

  return (
    <Box p={4}>
      <Text fontSize="2xl">Home Page</Text>
      {/* <ul>
        {data.map((post: any) => (
          <li key={post.id}>{post.title} {post.}</li>
        ))}
      </ul> */}

        <ul>
            {data.map((course: any) => (
                <li key={course.id}>
                    <h2>{course.title}</h2>
                    <p>{course.description}</p>
                    <h3>Videos:</h3>
                    <ul>
                        {(course.videos || []).map((video: any) => (
                            <li key={video.id}>
                            <a href={video.url}>{video.title}</a> - {video.description}
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    </Box>
  );
};

export default Home;
