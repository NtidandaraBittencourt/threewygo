import React from 'react';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import CourseForm from './CourseForm';

interface DynamicFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  course: any;
}

export const DynamicFormDrawer: React.FC<DynamicFormDrawerProps> = ({ isOpen, onClose, onSubmit, course }) => {
  
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{course ? 'Editar curso' : 'Adicionar novo curso'}</DrawerHeader>
        <DrawerBody>
          <CourseForm
            initialValues= {course || { title: '', description: '', start_date:'',end_date: '', videos: [{ title: '', url: '', description: '' }] }}
            onSubmit={onSubmit}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
