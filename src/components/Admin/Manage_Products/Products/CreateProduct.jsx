import React, { useState, useEffect } from "react"; // Add useEffect
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";

const CreateProduct = ({ onClose, onUpdate }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [shape, setShape] = useState("");
  const [brand, setBrand] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setPriceOffer] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]); // Add new state for brands list
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [shapes, setShapes] = useState([]);
  const [loadingShapes, setLoadingShapes] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const [featuresList, setFeaturesList] = useState([]);
  const [loadingFeatures, setLoadingFeatures] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  // Modified fetch functions
  const fetchBrands = async () => {
    setLoadingBrands(true);
    try {
      const response = await axios.get('http://localhost:8000/api/brands');
      if (response.data && Array.isArray(response.data.data)) {
        const activeBrands = response.data.data.filter(brand => brand.status === 'active');
        setBrands(activeBrands);
      } else if (Array.isArray(response.data)) {
        const activeBrands = response.data.filter(brand => brand.status === 'active');
        setBrands(activeBrands);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
      setError('Failed to load brands');
    } finally {
      setLoadingBrands(false);
    }
  };

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      if (response.data && Array.isArray(response.data.data)) {
        const activeCategories = response.data.data.filter(category => category.status === 'active');
        setCategories(activeCategories);
      } else if (Array.isArray(response.data)) {
        const activeCategories = response.data.filter(category => category.status === 'active');
        setCategories(activeCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories');
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchShapes = async () => {
    setLoadingShapes(true);
    try {
      const response = await axios.get('http://localhost:8000/api/shapes');
      if (response.data && Array.isArray(response.data.data)) {
        const activeShapes = response.data.data.filter(shape => shape.status === 'active');
        setShapes(activeShapes);
      } else if (Array.isArray(response.data)) {
        const activeShapes = response.data.filter(shape => shape.status === 'active');
        setShapes(activeShapes);
      }
    } catch (error) {
      console.error('Error fetching shapes:', error);
      setError('Failed to load shapes');
    } finally {
      setLoadingShapes(false);
    }
  };

  const fetchMaterials = async () => {
    setLoadingMaterials(true);
    try {
      const response = await axios.get('http://localhost:8000/api/materials');
      if (response.data && Array.isArray(response.data.data)) {
        const activeMaterials = response.data.data.filter(material => material.status === 'active');
        setMaterials(activeMaterials);
      } else if (Array.isArray(response.data)) {
        const activeMaterials = response.data.filter(material => material.status === 'active');
        setMaterials(activeMaterials);
      }
    } catch (error) {
      console.error('Error fetching materials:', error);
      setError('Failed to load materials');
    } finally {
      setLoadingMaterials(false);
    }
  };

  const fetchFeatures = async () => {
    setLoadingFeatures(true);
    try {
      const response = await axios.get('http://localhost:8000/api/features');
      if (response.data && Array.isArray(response.data.data)) {
        const activeFeatures = response.data.data.filter(feature => feature.status === 'active');
        setFeaturesList(activeFeatures);
      } else if (Array.isArray(response.data)) {
        const activeFeatures = response.data.filter(feature => feature.status === 'active');
        setFeaturesList(activeFeatures);
      }
    } catch (error) {
      console.error('Error fetching features:', error);
      setError('Failed to load features');
    } finally {
      setLoadingFeatures(false);
    }
  };

  const handleFeatureChange = (featureId) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  // Add useEffect to fetch brands when component mounts
  useEffect(() => {
    fetchBrands();
    fetchCategories();
    fetchShapes();
    fetchMaterials();
    fetchFeatures();
  }, []);

  const isFormValid = () => {
    return (
      name.trim() && 
      category && 
      brand && 
      price
    );
  };

  const handleSave = async () => {
    if (!isFormValid()) {
      setError("Please fill in required fields: Name, Category, Brand, and Price.");
      return;
    }
    
    setError("");
    setLoading(true);
    
    try {
      const productData = {
        name: name.trim(),
        brand_id: brand,
        category_id: category,
        material_id: material || null,
        shape_id: shape || null,
        gender: gender || null,
        price: price,
        offer_price: offerPrice || null,
        description: description.trim() || null,
        features: selectedFeatures.length > 0 ? selectedFeatures : null,
      };

      const response = await axios.post('http://localhost:8000/api/products/create', productData);
      
      if (response.status === 200) {
        const success = await onUpdate();
        if (success) {
          alert("Product saved successfully!");
          onClose();
        } else {
          throw new Error("Failed to refresh product list");
        }
      } else {
        throw new Error(response.data.message || 'Failed to save product');
      }
    } catch (err) {
      const errorMessages = err.response?.data?.error 
        ? Object.values(err.response.data.error).flat().join(', ')
        : err.message || "Failed to save product";
      setError(errorMessages);
    } finally {
      setLoading(false);
    }
  };

  // Add these helper functions
  const isMaterialDisabled = () => {
    return !category || category === "1";
  };

  const isGenderDisabled = () => {
    return !category || category === "1";
  };

  const isShapeDisabled = () => {
    return !category || category === "1";
  };

  const areFeaturesDisabled = () => {
    return !category || category === "2";
  };

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
        <h1 className="text-xl font-semibold">Create Product</h1>
        <button 
          onClick={onClose}
          className="text-gray-600 hover:text-[#55D5D2]"
        >
          Back to List
        </button>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 mt-10">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <div className="relative">
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loadingCategories}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <FaAngleDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className={`block text-gray-700 font-medium mb-2 ${isMaterialDisabled() ? 'opacity-50' : ''}`}>
            Material
          </label>
          <div className="relative">
            <select
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none ${
                isMaterialDisabled() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              disabled={isMaterialDisabled() || loadingMaterials}
            >
              <option value="">Select material</option>
              {materials.map((mat) => (
                <option key={mat.id} value={mat.id}>
                  {mat.name}
                </option>
              ))}
            </select>
            <FaAngleDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className={`block text-gray-700 font-medium mb-2 ${isShapeDisabled() ? 'opacity-50' : ''}`}>
            Shape
          </label>
          <div className="relative">
            <select
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none ${
                isShapeDisabled() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              value={shape}
              onChange={(e) => setShape(e.target.value)}
              disabled={isShapeDisabled() || loadingShapes}
            >
              <option value="">Select shape</option>
              {shapes.map((sh) => (
                <option key={sh.id} value={sh.id}>
                  {sh.name}
                </option>
              ))}
            </select>
            <FaAngleDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Brand</label>
          <div className="relative">
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              disabled={loadingBrands}
            >
              <option value="">Select brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            <FaAngleDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className={`block text-gray-700 font-medium mb-2 ${isGenderDisabled() ? 'opacity-50' : ''}`}>
            Gender
          </label>
          <div className="relative">
            <select
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none ${
                isGenderDisabled() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              disabled={isGenderDisabled()}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unisex">Unisex</option>
            </select>
            <FaAngleDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className={`mb-10 mt-10 ${areFeaturesDisabled() ? 'opacity-50' : ''}`}>
        <label className="block text-gray-700 font-medium mb-4">Features</label>
        <div className="flex flex-wrap gap-6">
          {loadingFeatures ? (
            <div>Loading features...</div>
          ) : (
            featuresList.map((feature) => (
              <label key={feature.id} className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-[#55D5D2] rounded border-gray-300 focus:ring-[#55D5D2]"
                  checked={selectedFeatures.includes(feature.id)}
                  onChange={() => handleFeatureChange(feature.id)}
                  disabled={areFeaturesDisabled()}
                />
                <span className="ml-2 text-gray-700">{feature.name}</span>
              </label>
            ))
          )}
        </div>
      </div>

      <div className="mb-4 mt-10">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
          Price
        </label>
        <input
          type="text"
          id="price"
          className="w-1/8 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={price}
          onChange={(e) => {
            // Only allow numbers
            const value = e.target.value.replace(/[^\d]/g, '');
            setPrice(value);
          }}
          placeholder="Enter price"
        />
      </div>

      <div className="mb-10">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="offerPrice">
          Offer Price
        </label>
        <input
          type="text"
          id="offerPrice"
          className="w-1/8 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={offerPrice}
          onChange={(e) => {
            const value = e.target.value.replace(/[^\d]/g, '');
            setPriceOffer(value);
          }}
          placeholder="Enter offer price"
        />
      </div>

      <div className="mb-10">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] min-h-[120px] resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
        />
      </div>
      
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex">
        <button
          className={`w-1/7 py-2 px-4 rounded-[10px] shadow-md font-semibold ${
            isFormValid() && !loading
              ? "bg-teal-400 text-white hover:bg-teal-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSave}
          disabled={!isFormValid() || loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
