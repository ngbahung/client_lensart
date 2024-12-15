export const parseAddress = (fullAddress) => {
    if (!fullAddress) return { detail: '', ward: '', district: '', city: '' };
    
    const parts = fullAddress.split(',').map(part => part.trim());
    
    return {
      detail: parts[0] || '',              // TDP1
      ward: parts[1] || '',                // Thị trấn An Phú
      district: parts[2] || '',            // Huyện An Phú
      city: parts[3] || ''                 // An Giang
    };
  };