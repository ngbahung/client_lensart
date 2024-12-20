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

export

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

const transformBranch = (branch) => ({
  branchId: branch.id,
  branchName: branch.name,
  address: branch.address,
  location: branch.name === 'Hồ Chí Minh' ? 'hcm' :
           branch.name === 'Hà Nội' ? 'hanoi' :
           branch.name === 'Đà Nẵng' ? 'danang' : '',
  inStock: branch.status === 'active',
  coefficient: branch.index || 1
});
