import React from 'react';
import { Formik, Field, FieldArray } from 'formik';
import { VStack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import VideoForm from './VideoForm';
import { courseValidationSchema } from '../../helpers/validationSchema';

interface CourseFormProps {
  initialValues: any;
  onSubmit: (values: any) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={courseValidationSchema}
    >
      {({ handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl isInvalid={!!errors.title && touched.title}>
              <FormLabel htmlFor="title">Titulo do curso</FormLabel>
              <Field
                as={Input}
                id="title"
                name="title"
                type="text"
                variant="filled"
                placeholder="Digite o nome do curso"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description">Descrição do curso</FormLabel>
              <Field
                as={Input}
                id="description"
                name="description"
                type="text"
                variant="filled"
                placeholder="Digite a descrição do curso"
              />
            </FormControl>
            <FormControl isInvalid={!!errors.start_date && touched.start_date}>
              <FormLabel htmlFor="start_date">Data de início</FormLabel>
              <Field
                as={Input}
                id="start_date"
                name="start_date"
                type="date"
                variant="filled"
              />
            </FormControl>
            <FormControl isInvalid={!!errors.end_date && touched.end_date}>
              <FormLabel htmlFor="end_date">Data de término</FormLabel>
              <Field
                as={Input}
                id="end_date"
                name="end_date"
                type="date"
                variant="filled"
              />
            </FormControl>
            <FieldArray name="videos">
              {({ push, remove, form: { values } }) => (
                <>
                  <VideoForm
                    videos={values.videos}
                    push={push}
                    remove={remove}
                    errors={errors.videos}
                    touched={touched.videos}
                  />
                </>
              )}
            </FieldArray>
            <Button type="submit" colorScheme="purple" width="full">
              Salvar
            </Button>
          </VStack>
        </form>
      )}
    </Formik>
  );
};

export default CourseForm;
