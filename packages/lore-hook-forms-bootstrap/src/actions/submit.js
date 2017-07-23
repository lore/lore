import React from 'react';

export default function(name, attributes, form, onSubmit) {
  return (
    <button
      key={name}
      className="btn btn-primary"
      onClick={onSubmit}
    >
      {attributes.label || 'Submit'}
    </button>
  );
}
