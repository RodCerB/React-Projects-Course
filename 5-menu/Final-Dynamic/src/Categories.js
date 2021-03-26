import React from 'react';

// 'Esse é o "Manual approach". Funcional, mas não é recomendado para casos onde vc pode precisar inserir novos dados no Array. Por exemplo se colocasse uma nova categoria de lanches precisa vir manualmente inserir.'
// const Categories = ({filterItems}) => {
//   return <div className='btn-container'>
//     <button className='filter-btn' onClick={()=>filterItems('all')}>all</button>
//     <button className='filter-btn' onClick={()=>filterItems('breakfast')}>breakfast</button>
//     <button className='filter-btn' onClick={()=>filterItems('lunch')}>lunch</button>
//     <button className='filter-btn' onClick={()=>filterItems('shakes')}>shakes</button>
//   </div>;
// };


// 'Esse já é o metodo "Dynamic Approach"'
const Categories = ({categories, filterItems}) => {
  return <div className='btn-container'>
    {categories.map((category, index)=>{
      return <button type='button' className='filter-btn' key={index} onClick={()=>filterItems(category)}>
        {category}
      </button>
    })}
  </div>;
};

export default Categories;
