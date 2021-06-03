import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { InvestmentDetails } from '../../util/investment';
import { Currency } from '../../util/currency';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../constant';

export interface AddMutualFundFormProps {
    setData : (x: InvestmentDetails) => void,
    data : InvestmentDetails,
    currencies : Array<{value:Currency, symbol:string}>,
    handleChange : (event:any) => void
}
 
interface MutualFundSuggestion{
  schemeCode : number
  schemeName : string
}
const AddMutualFundForm: React.FC<AddMutualFundFormProps> = ({setData, data, currencies, handleChange}) => {
  const [suggestion, setSuggestion] = useState<Array<MutualFundSuggestion>>([])
  const [chosen , setChosen] = useState<MutualFundSuggestion>({
    schemeCode : 0,
    schemeName : ""
  })
  const [search, setSearch] = useState<string>("")
  const defaultProps = {
    options: suggestion || [],
    getOptionLabel: (option: MutualFundSuggestion) => option.schemeName,
  };
  useEffect(()=>{
    const fn = async () => {
      if(search.length >= 3){
        const url = SERVER_URL + "/mutualFunds/search"
        const response = await axios.get(url + `?q=${search}`)
        if(response.data && response.data.length)
          setSuggestion(response.data)
      }
    }
    fn()
  }, [search])
  useEffect(()=>{
    setData({...data, name : chosen.schemeName, symbol : chosen.schemeCode.toString()})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosen])
  return (
    <div>
       <Autocomplete
        {...defaultProps}
        id="name"
        debug
        onChange ={(_,value) => {
          setChosen(value || chosen)
        }}
        value = {chosen}
        renderInput={(params:any) => 
          <TextField
            {...params}
            id="name-of-investment"
            label="name"
            name="name"
            type="string"
            onChange={(e) =>{
              setSearch(e.target.value)
            }}
            value = {search} 
            required
         />
        }
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
        inputProps={{ type:'numeric' }}
        id="averageBuyPrice-of-investment"
        label="average buy price"
        name="averageBuyPrice"
        onChange={handleChange}
        value = {data.averageBuyPrice}
        required
      />
      <TextField
        inputProps={{ type:'numeric' }}
        id="units"
        label="units"
        name="units"
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
 
export default AddMutualFundForm;