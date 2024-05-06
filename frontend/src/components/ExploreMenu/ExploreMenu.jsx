// Remove the unused import statement for React
import './ExploreMenu.css'

import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h2>Khám phá thực đơn của chúng tôi</h2>
        <p className='explore-menu-text'> Đặt hàng ngay hôm nay và nhận ngay ưu đãi hấp dẫn.</p>
        <div className="explore-menu-list">
            {
                menu_list.map((item,index)=>{
                    return(
                        <div className="explore-menu-list-item" key={index}
                            onClick={()=>{
                                setCategory(prev => prev===item.menu_name?"all":item.menu_name)
                            }}
                        >
                            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>                            
                        </div>
                    )
                })
            }
        </div>
        <hr />
    </div>
  )
}


export default ExploreMenu