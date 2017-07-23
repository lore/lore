import React from 'react';

export default function(name, attributes) {
  return (
    <button
      key={name}
      className="btn btn-default"
    >
      {attributes.label || 'Cancel'}
    </button>
  );
}
