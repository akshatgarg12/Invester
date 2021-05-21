import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { InvestmentDetails } from '../../util/investment';
import { Currency } from '../../util/currency';


export interface AddCryptoFormProps {
    data : InvestmentDetails,
    currencies : Array<{value:Currency, symbol:string}>,
    handleChange : (event:any) => void
}
 
const AddCryptoForm: React.FC<AddCryptoFormProps> = ({data, currencies, handleChange}) => {

  return (
    <div>
      <TextField
        id="name-of-investment"
        label="name"
        name="name"
        type="string"
        onChange={handleChange}
        value = {data.name}
        required
      />
      <TextField
        id="symbol-of-investment"
        label="symbol"
        name="symbol"
        type="string"
        onChange={handleChange}
        value = {data.symbol}
        required
      />
      <TextField
        id="standard-select-currency"
        select
        label="currency"
        value={data.currency}
        name = "currency"
        onChange={handleChange}
        required
      >
        {currencies.map((option:any) => (
          <MenuItem key={option.value} value={option.value}>
            {option.symbol}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="averageBuyPrice-of-investment"
        label="average buy price"
        name="averageBuyPrice"
        type="number"
        onChange={handleChange}
        value = {data.averageBuyPrice}
        required
      />
      <TextField
        id="units"
        label="units"
        name="units"
        type="number"
        onChange={handleChange}
        value = {data.units}
        required
      />
      <TextField
        id="market"
        label="market"
        helperText="Exchange"
        name="market"
        type="string"
        onChange={handleChange}
        value = {data.market}
        required
      />
      <TextField
        id="shop"
        label="shop"
        type="string"
        helperText="broker name"
        name="shop"
        onChange={handleChange}
        value = {data.shop}
        required
      />
    </div>
  );
}
 
export default AddCryptoForm;