import React, { useState } from 'react';

type ColorPickerProps = {
  label?: string;
  value?: string;
  onChange?: (color: string) => void;
};

export default function ColorPicker({
  label = 'Выберите цвет:',
  value = '#2558cf',
  onChange,
}: ColorPickerProps) {
  const [color, setColor] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onChange?.(newColor);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {label && <label>{label}</label>}
      <input
        type="color"
        value={color}
        onChange={handleChange}
        style={{
          width: '40px',
          height: '40px',
          padding: 0,
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      />
      <span style={{ fontFamily: 'monospace' }}>{color}</span>
    </div>
  );
}
