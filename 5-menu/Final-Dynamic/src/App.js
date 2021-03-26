import React, { useState } from 'react';
import Menu from './Menu';
import Categories from './Categories';
import items from './data';

const allCategories = ['all',...new Set(items.map((item)=>item.category))] ;
//new Set irá filtrar o map feito para não mostrar eles repetidos
//colocamos já dentro de um array ([]) e além disso deixamos a categoria 'all' já inclusa.
//finaliza com ... para incluir todos os membros do Set

function App() {
  const [menuItems, setMenuItems] = useState(items);
  // Não estava usando antes, por isso estava com esse array vazio
  // const [categories, setCategories] = useState([])
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    if(category === 'all'){
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item)=> item.category === category);
    setMenuItems(newItems);
  }

  return <main>
    <section className='menu-section'>
      <div className="title">
        <h2>our menu</h2>
        <div className="underline"></div>
      </div>
      {/* <Categories filterItems={filterItems}/> */}
      <Categories categories={categories} filterItems={filterItems}/>
      <Menu items={menuItems}/>
    </section>
  </main>;
}

export default App;
