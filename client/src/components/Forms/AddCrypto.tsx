import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useState, useEffect} from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import { InvestmentDetails } from '../../util/investment';
import { Currency } from '../../util/currency';
import { SERVER_URL } from '../../constant';
import axios from 'axios';


export interface AddCryptoFormProps {
    setData : (x: InvestmentDetails) => void,
    data : InvestmentDetails,
    currencies : Array<{value:Currency, symbol:string}>,
    handleChange : (event:any) => void
}
interface CryptoSuggestion{
  symbol : number
  name : string
}
const AddCryptoForm: React.FC<AddCryptoFormProps> = ({setData, data, currencies, handleChange}) => {
  const [suggestion, setSuggestion] = useState<Array<CryptoSuggestion>>([])
  const [chosen , setChosen] = useState<CryptoSuggestion>({
    symbol : 0,
    name : ""
  })
  const [search, setSearch] = useState<string>("")
  const defaultProps = {
    options: suggestion || [],
    getOptionLabel: (option: CryptoSuggestion) => option.name,
  };
  useEffect(()=>{
    const fn = async () => {
      if(search.length >= 3){
        const url = SERVER_URL + "/crypto/search"
        const response = await axios.get(url + `?q=${search}`)
        console.log(response.data)
        if(response.data && response.data.length)
          setSuggestion(response.data)
      }
    }
    fn()
  }, [search])
  useEffect(()=>{
    console.log(chosen)
    setData({...data, name : chosen.name, symbol : chosen.symbol.toString()})
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
        id="averageBuyPrice-of-investment"
        label="average buy price"
        name="averageBuyPrice"
        type="number"
        inputProps={{type : "numeric"}}
        onChange={handleChange}
        value = {data.averageBuyPrice}
        required
      />
      <TextField
        id="units"
        label="units"
        name="units"
        type="number"
        inputProps={{type : "numeric"}}
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