import React, { useContext } from 'react'
import { GlobalContext } from '../GlobalContext'

const Search = () => {
    const {searchParam, handleOnChange , handleOnSubmit}=useContext(GlobalContext);
  return (
    <div className='search'>
      <input className='input' name="search" value={searchParam} onChange={handleOnChange} placeholder='Enter movie keyword here' />
      <button className='button' disabled={searchParam.trim().length<=2} onClick={handleOnSubmit}>Submit Search</button>
    </div>
  )
}

export default Search
