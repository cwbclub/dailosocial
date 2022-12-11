import { useEffect, useMemo, useState } from 'react'
import { RiUserSearchLine } from 'react-icons/ri'
import UserCard from '../components/userCard'
import { useAuth } from '../context/authContext'
import useDebounce from '../hooks/useDebounce'
import useLiveData from '../hooks/useLiveData'
import useSearchData from '../hooks/useSearchData'
import useSuggestedUsers from '../hooks/useSuggestedUsers'
import s from '../styles/Search.module.css'

export default function Search() {
  const [value, setValue] = useState('')
  const debounceValue = useDebounce(value, 500)

  // Getting Auth Info
  const { user } = useAuth()

  const { searchData, searchLoading } = useSearchData(debounceValue)
  const { data, loading } = useLiveData(`friends/${user?.uid}`)
  const followings = useMemo(() => data?.followings || [], [data?.followings])
  const { dataList, suggestLoading } = useSuggestedUsers(
    followings,
    loading,
    user?.uid
  )

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

      {debounceValue?.length > 3 ? (
        <div className={s.usersListWrapper}>
          <h3>Found Users : {searchData?.length}</h3>
          {searchLoading ? (
            <p className={s.loading}>Getting Users</p>
          ) : searchData?.length ? (
            <div className={s.usersList}>
              {searchData?.map((item) => (
                <UserCard
                  data={item}
                  key={item?.uid}
                  followed={followings.includes(item?.uid)}
                  myuid={user?.uid}
                />
              ))}
            </div>
          ) : (
            <p className={s.nodata}>No Users Found</p>
          )}
        </div>
      ) : null}
      <div className={s.usersListWrapper}>
        <h3>Suggested Users</h3>
        {suggestLoading ? (
          <p className={s.loading}>Loading...</p>
        ) : dataList?.length ? (
          <div className={s.usersList}>
            {dataList?.map((item) => (
              <UserCard
                data={item}
                myuid={user?.uid}
                key={item?.uid}
                followed={followings.includes(item?.uid)}
              />
            ))}
          </div>
        ) : (
          <p className={s.nodata}>No Data Found</p>
        )}
      </div>
    </div>
  )
}