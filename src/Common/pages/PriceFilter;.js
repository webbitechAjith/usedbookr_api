// import React, { useState } from 'react';


// const items = [
//     { id: 1, name: 'Item 1', price: 50 },
//     { id: 2, name: 'Item 2', price: 1500 },
//     { id: 3, name: 'Item 3', price: 250 },
//     { id: 4, name: 'Item 4', price: 350 },
//   ];

// const PriceFilter = ({ prices, onFilterChange }) => {
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(prices[prices.length - 1]);

//   const handleMinPriceChange = (event) => {
//     setMinPrice(event.target.value);
//     onFilterChange(+event.target.value, maxPrice);
//   };

//   const handleMaxPriceChange = (event) => {
//     setMaxPrice(event.target.value);
//     onFilterChange(minPrice, +event.target.value);
//   };

// // const [filteredItems, setFilteredItems] = useState(items);

// // const handleFilter = () => {
// //     const filtered = items.filter(item => item.price > 100);
// //     setFilteredItems(filtered);
// //   };
//   return (
//     <div>
//       <label>
//         Min Price:
//         <input type="range" min={0} max={prices[prices.length - 1]} value={minPrice} onChange={handleMinPriceChange} />
//         <span>{minPrice}</span>
//       </label>
//       <label>
//         Max Price:
//         <input type="range" min={0} max={prices[prices.length - 1]} value={maxPrice} onChange={handleMaxPriceChange} />
//         <span>{maxPrice}</span>
//       </label>
//     </div>
//     // <div>
//     //   <button onClick={handleFilter}>Filter</button>
//     //   {filteredItems.map(item => (
//     //     <div key={item.id}>
//     //       {item.name} - ${item.price}
//     //     </div>
//     //   ))}
//     // </div>
//   );
// };

// export default PriceFilter;


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
