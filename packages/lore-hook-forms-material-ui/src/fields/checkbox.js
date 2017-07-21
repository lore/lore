import React from 'react';
import { CheckboxField } from 'lore-react-forms-material-ui';

export default function(name, attributes) {
  return (
    <CheckboxField
      {...attributes}
      name={name}
    />
  );
}
