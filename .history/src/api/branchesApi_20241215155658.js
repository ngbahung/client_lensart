import api from '../utils/api';


export const getBranches = async () => {
  try {
    const response = await api.get('/active/branches');
    return response.data.data.map(transformBranch);
  } catch (error) {
    console.error('Error fetching branches:', error);
    throw error;
  }
};

export const getBranchCoefficients = async () => {
  try {
    const response = await api.get('/active/branches');
    return response.data.data.reduce((acc, branch) => ({
      ...acc,
      [branch.id]: branch.index
    }), {});
  } catch (error) {
    console.error('Error fetching branch coefficients:', error);
    throw error;
  }
};