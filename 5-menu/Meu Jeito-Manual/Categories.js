import React from 'react';

const Categories = ({changeBreakfast, changeLunch, changeShakes, changeAll}) => {
  return <>
    <button className='filter-btn'onClick={()=> changeAll()}>all</button>
    <button className='filter-btn' onClick={()=> changeBreakfast()}>breakfast</button>
    <button className='filter-btn'onClick={()=> changeLunch()}>lunch</button>
    <button className='filter-btn'onClick={()=> changeShakes()}>shakes</button>
  </>;
};

export default Categories;
