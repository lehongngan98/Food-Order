import React, {  useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = ({url}) => {
  
  const [image, setImage] = useState(false);

  const [data, setDate] = useState({
    name: '',
    description: '',
    category: 'Salad',
    price: 0
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDate(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', Number(data.price));
    formData.append('image', image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setDate({
        name: '',
        description: '',
        category: 'Salad',
        price: 0
      })
      setImage(false);
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }
  }

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Tải ảnh lên :</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Tên sản phẩm :</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Mì xào' required/>
        </div>
        <div className="add-product-description flex-col">
          <p>Mô tả sản phẩm :</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' placeholder='Mì xào thơm ngon' rows="6" required />
        </div>
        <div className="add-product-category flex-col">
          <p>Product category :</p>
          <select onChange={onChangeHandler} name='category'>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>
        <div className="add-product-price flex-col">
          <p>Giá sản phẩm :</p>
          <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='20.000đ' />
        </div>
        <button className="add-btn" type='submit'>Thêm</button>
      </form>

    </div>

  )
}

export default Add