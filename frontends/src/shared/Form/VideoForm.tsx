import React from 'react';
import { VStack, HStack, Button, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { Field } from 'formik';

interface VideoFormProps {
  videos: any[];
  push: (value: any) => void;
  remove: (index: number) => void;
  errors: any;
  touched: any;
}

const VideoForm: React.FC<VideoFormProps> = ({ videos, push, remove, errors, touched }) => {
  return (
    <VStack spacing={4} align="flex-start">
      {videos.map((video, index) => (
        <React.Fragment key={index}>
          <FormControl isInvalid={!!(errors && errors[index]?.title) && touched && touched[index]?.title}>
            <FormLabel htmlFor={`videos.${index}.title`}>Título do vídeo</FormLabel>
            <Field
              as={Input}
              id={`videos.${index}.title`}
              name={`videos.${index}.title`}
              type="text"
              placeholder="Digite o título do vídeo"
            />
            <FormErrorMessage>{errors && errors[index]?.title}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!(errors && errors[index]?.url) && touched && touched[index]?.url}>
            <FormLabel htmlFor={`videos.${index}.url`}>URL do vídeo</FormLabel>
            <Field
              as={Input}
              id={`videos.${index}.url`}
              name={`videos.${index}.url`}
              type="text"
              placeholder="Digite a URL do vídeo"
            />
            <FormErrorMessage>{errors && errors[index]?.url}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!(errors && errors[index]?.description) && touched && touched[index]?.description}>
            <FormLabel htmlFor={`videos.${index}.description`}>Descrição do vídeo</FormLabel>
            <Field
              as={Input}
              id={`videos.${index}.description`}
              name={`videos.${index}.description`}
              type="text"
              placeholder="Digite a descrição do vídeo"
            />
            <FormErrorMessage>{errors && errors[index]?.description}</FormErrorMessage>
          </FormControl>

          <HStack>
            <Button colorScheme="red" onClick={() => remove(index)}>
              Remover vídeo
            </Button>
          </HStack>
        </React.Fragment>
      ))}

      <Button colorScheme="blue" onClick={() => push({ title: '', url: '', description: '' })}>
        Adicionar vídeo
      </Button>
    </VStack>
  );
};

export default VideoForm;
