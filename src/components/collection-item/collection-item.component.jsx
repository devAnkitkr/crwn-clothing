import React from 'react'
import { connect } from 'react-redux'
import { addItem } from '../../redux/cart/cart.action'
import './collection-item.styles.scss'
import CustomButton from '../custom-button/custom-button.component'

function CollectionItem({ item,addItem }) {
    const {imageUrl,name,price} = item
    return (
        <div className='collection-item'>
            <div className='image'
                style={{
                    background: `#fff url(${imageUrl}) center/cover no-repeat`
                }} />
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}$</span>
            </div>
            <CustomButton inverted onClick={()=>addItem(item)}> Add to cart</CustomButton>
        </div>
    )
}

const mapDispatchToProps=Dispatch=>({
    addItem: item=>Dispatch(addItem(item))
})

export default connect(null,mapDispatchToProps)(CollectionItem)
