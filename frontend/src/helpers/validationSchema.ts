
import * as Yup from 'yup';

const videoSchema = Yup.object().shape({
  title: Yup.string().required('O título do vídeo é obrigatório'),
  url: Yup.string().url('Insira uma URL válida').required('A URL é obrigatória'),
});

export const courseValidationSchema = Yup.object().shape({
  title: Yup.string().required('O título do curso é obrigatório'),
  start_date: Yup.date().required('A data de início é obrigatória'),
  end_date: Yup.date()
    .required('A data de término é obrigatória')
    .min(Yup.ref('start_date'), 'A data de término não pode ser anterior à data de início'),
  videos: Yup.array().of(videoSchema).min(1, 'Adicione pelo menos um vídeo'),
});
