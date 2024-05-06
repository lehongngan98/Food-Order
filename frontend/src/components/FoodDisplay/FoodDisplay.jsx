import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'
import './FoodDisplay.css'
import { PropTypes } from 'prop-types'
import FoodItem from '../FoodItem/FoodItem'


const FoodDisplay = ({category}) => {
  const {food_list} = useContext(StoreContext)
  
  return (
    <div className='food-display' id='food-display'>
      <h2>Top các món ăn lựa chọn nhiều nhất</h2>
      <div className="food-display-list">
        {
          food_list.map((food, index) => {
            if(category==="all" || category === food.category){
              return <FoodItem key={index} id={food._id} name={food.name} price={food.price} description={food.description} image={food.image} />
            }
            
          })
        }
      </div>
    </div>
  )
}

FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired
};

export default FoodDisplay