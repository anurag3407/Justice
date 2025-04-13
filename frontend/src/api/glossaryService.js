import apiClient from './client';

const getGlossaryTerms = async () => {
  const response = await apiClient.get('/glossary');
  return response.data;
};

const getGlossaryTermsByCategory = async (category) => {
  const response = await apiClient.get(`/glossary/category/${category}`);
  return response.data;
};

const getGlossaryTermById = async (id) => {
  const response = await apiClient.get(`/glossary/${id}`);
  return response.data;
};

const glossaryService = {
  getGlossaryTerms,
  getGlossaryTermsByCategory,
  getGlossaryTermById
};

export default glossaryService; 