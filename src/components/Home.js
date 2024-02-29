import React, { useEffect, useState } from 'react'
import "./style.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { addToCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';


const Home = () => {
    const [cartData, setCartData] = useState([]);
    const dispatch = useDispatch();


    // add to cart 

    const getData = async ()=>{
        const response = await fetch(`https://dummyjson.com/products`,{method:"GET"})
        const data = await response.json()
        console.log(data);
        setCartData(data?.products)


    }
    useEffect(()=>{
        getData();
    },[])
    // console.log(cartData);

    const send = (e)=>{
        dispatch(addToCart(e))
        toast.success("Item added In Your Cart")
    }
    return (
        <>
            <section className='iteam_section mt-4 container'>
               
                <div className='row mt-2 d-flex justify-content-around align-items-center'>
                    {
                        cartData?.map((element, index) => {
                            console.log(element);
                            return (
                            
                                <>
                                    <Card style={{ width: "22rem", border: "none" }} className='hove mb-4'>
                                        <Card.Img variant='top' className='cd' src={element.images?.[0]}/>

                                        <div className="card_body">
                                            <div className="upper_data d-flex justify-content-between align-items-center">
                                                <h4 className='mt-2'>{element.brand}</h4>
                                                <span>{element.rating}&nbsp;★</span>
                                            </div>

                                            <div className="lower_data d-flex justify-content-between ">
                                                <h5>{element.stock}</h5>
                                                <span>₹ {element.price}</span>
                                            </div>
                                            <div className="extra"> {element.description}</div>

                                            <div className="last_data d-flex justify-content-between align-items-center">
                                              
                                                <Button style={{ width: "150px", background: "#ff3054db", border: "none" }} variant='outline-light'
                                                    className='mt-2 mb-2'
                                                    onClick={()=>send(element)}
                                                >Add TO Cart</Button>
                                               

                                            </div>
                                        </div>
                                    </Card>
                                </>
                            )
                        })
                    }

                </div>
            </section>
        </>
    )
}

export default Home