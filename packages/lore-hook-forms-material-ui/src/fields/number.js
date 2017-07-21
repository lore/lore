import React from 'react';
import { NumberField } from 'lore-react-forms-material-ui';

export default function(name, attributes) {
  return (
    <NumberField
      label={attributes.label}
      name={name}
    />
  );
}
