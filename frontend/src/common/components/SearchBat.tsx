import React, { useState } from 'react';
import {
  Checkbox,
  FormGroup,
  TextInput,
  Button
} from 'carbon-components-react';

export const SearchBa = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [city, setCity] = useState('');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryName = event.target.name;
    if (event.target.checked) {
      setCategories([...categories, categoryName]);
    } else {
      setCategories(categories.filter((category) => category !== categoryName));
    }
  };

  return (
    <div className="sidebar">
      <h2>Filter Offers</h2>
      <TextInput
        id="name-input"
        labelText="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <FormGroup legendText="Category">
        <Checkbox
          id="category1-checkbox"
          labelText="Category 1"
          name="category1"
          onChange={handleCategoryChange}
          checked={categories.includes('category1')}
        />
        <Checkbox
          id="category2-checkbox"
          labelText="Category 2"
          name="category2"
          onChange={handleCategoryChange}
          checked={categories.includes('category2')}
        />
        <Checkbox
          id="category3-checkbox"
          labelText="Category 3"
          name="category3"
          onChange={handleCategoryChange}
          checked={categories.includes('category3')}
        />
      </FormGroup>
      <TextInput
        id="city-input"
        labelText="City"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <Button
      >
        Filter
      </Button>
    </div>
  );
};
