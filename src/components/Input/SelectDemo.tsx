import { useState } from 'react';
import LiveDemo from '../LiveDemo/LiveDemo';
import Code from '../Code/Code';
import Select from './Select';
import type { Option } from './Select.type';
import Flex from '../Flex/Flex';

export default function InputDemo() {
  const [placeholder, setPlaceholder] = useState('Текстовое поле');

  const [selected, setSelected] = useState<Option | null>(null);
  const [selectedM, setSelectedM] = useState<Option[]>([]);
  const [floatingOptions, setFloatingOptions] = useState<boolean>(false);
  const [closeAfterSelect, setCloseAfterSelect] = useState<boolean>(false);
  const [multiple, setMultiple] = useState(false);
  const [selectLimit, setSelectLimit] = useState(3);
  const options: Option[] = [
    { id: 1, text: 'Элемент 1 списка' },
    { id: 2, text: 'Второй элемент списка' },
    { id: 3, text: 'Третий элемент списка' },
  ];
  const demoCode = `
<Select
  options={${options.map(option => '\n\t{ id: ' + option.id + ', text: "' + option.text + '"}')}
  }
  placeholder="${placeholder}"
  selected={selected}
  onChange={(option: Option | Option[]) => setSelected(option as Option)}
  closeAfterSelect={${closeAfterSelect}}
  floatingOptions={${floatingOptions}}
  width="auto"
  multiple={false}
></Select>
                `;
  const demoCode_multi = `
<Select
  options={${options.map(option => '\n\t{ id: ' + option.id + ', text: "' + option.text + '"}')}
  }
  placeholder="${placeholder}"
  selected={selected}
  onChange={(option: Option | Option[]) => setSelected(option as Option)}
  closeAfterSelect={${closeAfterSelect}}
  floatingOptions={${floatingOptions}}
  width="auto"
  multiple={true}
></Select>                
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
            name: 'floatingOptions',
            type: 'checkbox',
            variable: floatingOptions,
            onChange: setFloatingOptions,
          },
          {
            name: 'closeAfterSelect',
            type: 'checkbox',
            variable: closeAfterSelect,
            onChange: setCloseAfterSelect,
          },
          {
            name: 'multiple',
            type: 'checkbox',
            variable: multiple,
            onChange: setMultiple,
          },
          {
            case: multiple,
            name: 'selectLimit',
            type: 'number',
            variable: selectLimit,
            onChange: setSelectLimit,
          },
        ]}
      >
        {!multiple ? (
          <Select
            options={options}
            placeholder={placeholder}
            selected={selected}
            onChange={(option: Option | Option[]) => setSelected(option as Option)}
            closeAfterSelect={closeAfterSelect}
            floatingOptions={floatingOptions}
            width="auto"
          ></Select>
        ) : (
          <Select
            options={options}
            placeholder={placeholder}
            selected={selectedM}
            onChange={(option: Option | Option[]) => setSelectedM(option as Option[])}
            closeAfterSelect={closeAfterSelect}
            floatingOptions={floatingOptions}
            width="auto"
            multiple
            selectLimit={selectLimit}
          ></Select>
        )}
      </LiveDemo>

      <Code code={multiple ? demoCode_multi : demoCode}></Code>
    </Flex>
  );
}
