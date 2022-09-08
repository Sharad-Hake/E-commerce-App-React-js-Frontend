import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const ProductList =() =>{
    const [products, setProducts]= React.useState([]);
    const userdata = localStorage.getItem('user');

    const [id,setId]=React.useState('');
    useEffect(()=>{
        
        getProducts();
        setId(JSON.parse(userdata)._id);
        // console.log(ID);
    },[id])

   const getProducts= async ()=>{
    
        let result=await fetch('http://localhost:5000/products',{
            headers:{
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        // console.log(result.userId);
        
        let a=[];
        let b=[];
        result.map((item)=>{
            if(item.userId==id){
            // console.log(item.userId)
             a.push(item);
        }
        else{
            b.push(item);
            // console.log(b)
        }
        })
        setProducts(a);
   }
   const deleteProduct=async(id)=>{
       console.log(id);
       let result= await fetch(`http://localhost:5000/product/${id}`,{
           method:"Delete",
           headers:{
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
       });
       result= await result.json();
       if(result){
           alert("record is deleted");
           getProducts();
       }
   }

   const searchHandle =async (event)=>{
    // console.log(event.target.value);
    let key = event.target.value;
    if(key){
        let result = await fetch(`http://localhost:5000/search/${key}`,{
            headers:{
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result ){
            let a=[];
        result.map((item)=>{
            if(item.userId==id){
            // console.log(item.userId)
             a.push(item);
        }
        else{
            
        }
        })
            // setProducts(result);
            setProducts(a);
        }
    }
    else{
        getProducts();
    }
    
   }
   return (
    <div className='product-list'>
        <h3>Product -List</h3>
        <input className='search-product-box' type="text" 
        placeholder="serach product by name, category, price, company"
        onChange={searchHandle}
        />
        
        <ul>
            <li>S. No</li>
            <li>Name</li>
            <li>$ Price</li>
            <li>Category</li>
            <li>Company</li>
            <li>Actions</li>
        </ul>
        {
           products.length>0 ? products.map((item,index)=>
          
           <ul key={item._id}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>$ {item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
            <Link to={"/update/"+item._id}>Update</Link>
            </li>
        </ul>
           ) 
           :
           <h1>No result found</h1>
        }
    
        </div>
  )
}

export default ProductList