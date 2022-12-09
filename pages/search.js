import { useEffect, useState } from 'react'
import { RiUserSearchLine } from 'react-icons/ri'
import useDebounce from '../hooks/useDebounce'
import useSearchData from '../hooks/useSearchData'
import s from '../styles/Search.module.css'

export default function Search() {
  const [value, setValue] = useState('')
  const debounceValue = useDebounce(value, 1000)

  const searchData = useSearchData(debounceValue)

  console.log(searchData)
  console.count('search')
  return (
    <div className="wrapper">
      <div className={s.wrapper}>
        <div className={s.searchBar}>
          <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            autoFocus
            type="search"
            placeholder="Type to search user"
          />
          {/* <RiUserSearchFill /> */}
          <RiUserSearchLine />
        </div>
      </div>
    </div>
  )
}
