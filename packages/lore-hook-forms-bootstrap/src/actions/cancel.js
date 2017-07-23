import React from 'react';

export default function(name, attributes, form) {
  return (
    <button
      key={name}
      className="btn btn-default"
    >
      {attributes.label || 'Cancel'}
    </button>
  );
}
