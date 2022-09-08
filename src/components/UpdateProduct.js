import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const UpdateProduct =()=>{
    const [name, setName]=React.useState('');
    const [price, setPrice]=React.useState('');
    const [category, setCategory]=React.useState('');
    const [company, setCompany]=React.useState('');
    const [error, setError]=React.useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        
        getProductDetails();
    },[])

    const getProductDetails = async ()=>{
        console.log(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }); 
        result= await result.json();
        
        if(result.name){
            console.log(result); 
            setName(result.name);
            setCategory(result.category);
            setPrice(result.price);
            setCompany(result.company)
        }
        else{
            console.log("No data")
        }
        
    }
    const clear=()=>{
        setName('');
        setCategory('');
        setCompany('');
        setPrice(''); 
    }
    const updateProduct = async ()=>{
        console.log(name, price, category , company);
        let result= await fetch(`http://localhost:5000/product/${params.id}`,{
            method:"Put",
            body:JSON.stringify({name, price, category , company}),
            headers:{
                'Content-Type':'application/json',
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result= await result.json();
        console.log(result);
        navigate("/");
       
    }
return(
    <div className="product">
        <h1>Product list </h1>
        <input className="inputBox" type="text" placeholder="Enter Product Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
        {/* {error && !name && <span  className="invalid-input">enter valid name</span>} */}
        <input className="inputBox" type="number" placeholder="Enter Product Price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
        {/* {error && !price && <span  className="invalid-input">enter valid price</span>} */}
        <input className="inputBox" type="text" placeholder="Enter Product Category" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
        {/* {error && !category && <span  className="invalid-input">enter valid category</span>} */}
        <input className="inputBox" type="text" placeholder="Enter Product Company" value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
        {/* {error && !company && <span  className="invalid-input">enter valid company</span>} */}
       <button className="appButton" type="button"  onClick={updateProduct}>Update Product</button>
       {/* <button className="appButton" type="button"  onClick={clear}>Cancel</button> */}

    </div>
)
}
export default UpdateProduct;
