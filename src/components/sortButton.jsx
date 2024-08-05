import React from 'react';
import { SelectField } from '@aws-amplify/ui-react';

const SortButton = ({ sortOption, onSortChange }) => {
  return (
    <SelectField
      label="Sort By"
      onChange={onSortChange}
      value={sortOption}
      style={{ width: '20%' }}
    >
      <option value="name">Name</option>
      <option value="age">Age</option>
    </SelectField>
  );
};

export default SortButton;
