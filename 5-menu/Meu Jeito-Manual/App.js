import React, { useState } from 'react';
import Menu from './Menu';
import Categories from './Categories';
import items from './data';

function App() {
  const [products, setProducts] = useState(items)

  const changeBreakfast = () =>{
    const newProducts = items.filter((product)=> product.category === 'breakfast')
    setProducts(newProducts)
  }
  const changeLunch = () =>{
    const newProducts = items.filter((product)=> product.category === 'lunch')
    setProducts(newProducts)
  }
  const changeShakes = () =>{
    const newProducts = items.filter((product)=> product.category === 'shakes')
    setProducts(newProducts)
  }
  const changeAll = () =>{
    const newProducts = items
    setProducts(newProducts)
  }

  return <main>
    <section className='menu section'>
      <div className='title'>
        <h2>our menu</h2>
        <div className='underline'></div>
      </div>
      <div className="btn-container">
        <Categories 
          changeBreakfast={changeBreakfast} 
          changeLunch={changeLunch} 
          changeShakes={changeShakes} 
          changeAll={changeAll}/>
      </div>
      <div className="section-center">
        {products.map((product)=>{
          return <Menu key={product.id} {...product}/>
        })}
      </div>
    </section>
  </main>;
}

export default App;
