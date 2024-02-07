import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const names = [
  'Breakfast',
  'Lunch',
  'Sides',
  'Drinks',
  'Dessert',
  'Extras',
];

function CategorySelector() {
  const [Category, setCategory] = React.useState([]);
  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setCategory(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 130, maxWidth: 300 }}>
        <InputLabel shrink htmlFor="select-multiple-native">
          Categories
        </InputLabel>
        <Select
          multiple
          native
          value={Category}
          onChange={handleChangeMultiple}
          label="Native"
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
          {names.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CategorySelector