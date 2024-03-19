import React, { useState } from 'react';
// import Typography from '@material-ui/core/Typography'; 
import Slider from '@material-ui/core/Slider'; 

const PriceFilter = () => { 

// Our States 
const [value, setValue] = useState([2,10]); 

// Changing State when volume increases/decreases 
const rangeSelector = (event, newValue) => { 
	setValue(newValue); 
}; 

return ( 
	<div className='container-90'> 
	{/* <Typography id="range-slider" gutterBottom> 
	</Typography>  */}
	<Slider 
		value={value} 
		onChange={rangeSelector} 
		valueLabelDisplay="auto"
	/> 
	Price is between {value[0]} - {value[1]} 
	</div> 
); 
} 

export default PriceFilter;
