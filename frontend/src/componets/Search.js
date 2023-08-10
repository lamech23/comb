import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function Search() {
  const [query ,setQuery]=useState('')

  return (
    <>
    <input type="text" 
    placeholder='search'
     className="search"
     onChange={e=>setQuery(e.target.value)}
      />
      
    </>
  )
}

export default Search