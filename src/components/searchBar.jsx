import React from 'react';
import { Input } from '@aws-amplify/ui-react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <Input
      placeholder="Search plants..."
      value={searchQuery}
      onChange={onSearchChange}
      style={{ width: '40%', height: '50px'}}
    />
  );
};

export default SearchBar;
