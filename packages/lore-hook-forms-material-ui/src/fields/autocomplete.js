import React from 'react';
import { AutoCompleteField } from 'lore-react-forms-material-ui';
import ConfigConnect from '../ConfigConnect';

let Connect = null;

export default function(name, attributes) {
  Connect = Connect || ConfigConnect();
  return (
    <Connect callback={attributes.getOptions}>
      <AutoCompleteField
        label={attributes.label}
        name={name}
        field={attributes.field || 'username'}
      />
    </Connect>
  );
}
