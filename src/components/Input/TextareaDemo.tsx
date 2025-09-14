import { useState } from 'react';
import LiveDemo from '../LiveDemo/LiveDemo';
import Code from '../Code/Code';
import Textarea from './Textarea';
import Flex from '../Flex/Flex';

export default function InputDemo() {
  const [value, setValue] = useState('');
  const demoCode = `
<Textarea
  placeholder={placeholder}
  value={value}
  onChange={val => setValue(val)}
  disabled={isDisabled}
  invalid={isInvalid}
/>
                `;
  const [placeholder, setPlaceholder] = useState('Текстовое поле');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
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
        ]}
      >
        <Textarea
          placeholder={placeholder}
          value={value}
          onChange={val => setValue(val)}
          disabled={isDisabled}
          invalid={isInvalid}
        />
      </LiveDemo>

      <Code code={demoCode}></Code>
    </Flex>
  );
}
