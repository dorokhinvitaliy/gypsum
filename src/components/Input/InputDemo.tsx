import { useState } from 'react';
import LiveDemo from '../LiveDemo/LiveDemo';
import Input from './Input';
import Code from '../Code/Code';
import Flex from '../Flex/Flex';

export default function InputDemo() {
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState('Текстовое поле');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [helperText, setHelperText] = useState('');
  const demoCode = `
<Input
    placeholder="${placeholder}"
    value={value}
    onChange={val => setValue(val)}
    type="text"
    disabled={${isDisabled}}
    invalid={${isInvalid}}
    helperText="${helperText}"
/>
                `;
  return (
    <Flex gap={16} wrap="nowrap" style={{ width: '100%' }}>
      <LiveDemo
        props={[
          {
            name: 'placeholder',
            type: 'text',
            variable: placeholder,
            onChange: setPlaceholder,
          },
          {
            name: 'isInvalid',
            type: 'checkbox',
            variable: isInvalid,
            onChange: setIsInvalid,
          },
          {
            name: 'isDisabled',
            type: 'checkbox',
            variable: isDisabled,
            onChange: setIsDisabled,
          },
          {
            name: 'helperText',
            type: 'text',
            variable: helperText,
            onChange: setHelperText,
          },
        ]}
      >
        <Input
          placeholder={placeholder}
          value={value}
          onChange={val => setValue(val)}
          type="text"
          disabled={isDisabled}
          invalid={isInvalid}
          helperText={helperText}
        />
      </LiveDemo>

      <Code code={demoCode}></Code>
    </Flex>
  );
}
