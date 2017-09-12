import React from 'react';
import { TextField } from 'lore-react-forms-bootstrap';

export default function(name, attributes) {
  return (
    <TextField
      {...attributes}
      name={name}
    />
  );
}
