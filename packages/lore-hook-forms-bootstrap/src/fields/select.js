import React from 'react';
import { SelectField } from 'lore-react-forms-bootstrap';
import ConfigConnect from '../ConfigConnect';

let Connect = null;

export default function(name, attributes) {
  Connect = Connect || ConfigConnect();
  return (
    <Connect callback={attributes.getOptions}>
      <SelectField
        label={attributes.label}
        name={name}
        field={attributes.field || 'username'}
      />
    </Connect>
  );
}
