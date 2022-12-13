import { useState } from 'react'
import { RiUserSearchLine } from 'react-icons/ri'
import ContentLoader from '../components/contentLoader'
import UserCard from '../components/userCard'
import { useAuth } from '../context/authContext'
import { useFriends } from '../context/friendsContext'
import useDebounce from '../hooks/useDebounce'
import useSearchData from '../hooks/useSearchData'
import useSuggestedUsers from '../hooks/useSuggestedUsers'
import s from '../styles/Search.module.css'
import { MdOutlineHourglassTop } from 'react-icons/md'
import Head from 'next/head'

export default function Search() {
  const [value, setValue] = useState('')
  const debounceValue = useDebounce(value, 500)

  // Getting Auth Info
  const { user } = useAuth()

  const { searchData, searchLoading } = useSearchData(debounceValue)
  const { followings, loading } = useFriends()
  const { dataList, suggestLoading } = useSuggestedUsers(
    followings,
    loading,
    user?.uid
  )

  return (
    <>
      <Head>
        <title>Search | DailoSocial</title>
      </Head>
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
            {searchLoading ? <MdOutlineHourglassTop /> : <RiUserSearchLine />}
          </div>
        </div>

        {debounceValue?.length > 3 ? (
          <div className={s.usersListWrapper}>
            <h3>Found Users : {searchData?.length}</h3>
            {searchLoading ? (
              <ContentLoader type="inside" />
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
              <ErrorSvg />
            )}
          </div>
        ) : null}
        <div className={s.usersListWrapper}>
          <h3>Suggested Users</h3>
          {suggestLoading ? (
            <ContentLoader type="inside" />
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
            <ErrorSvg />
          )}
        </div>
      </div>
    </>
  )
}

const ErrorSvg = () => {
  return (
    <div className={s.error}>
      <svg fill="#a0aec0" viewBox="0 0 128 128">
        <g>
          <polygon points="75.31 101.98 76.9 98 51.1 98 52.69 101.98 75.31 101.98" />
          <path d="M125,98H79.1L77,103.38c-.38.93,1,.64-25,.64-.93,0-.83-.33-3.1-6H3a2,2,0,0,0-2,2c0,5-.23,5.83.63,6.59a13.62,13.62,0,0,0,9,3.41H117.34a13.66,13.66,0,0,0,9-3.41c.82-.72.63-1.2.63-6.59A2,2,0,0,0,125,98Z" />
          <path d="M18,88h92V26H18ZM81.28,41.72a1,1,0,0,1,1.44-1.44L88,45.56l5.28-5.28a1,1,0,0,1,1.44,1.44L89.44,47l5.28,5.28A1,1,0,0,1,94,54c-.58,0-.33.09-6-5.58C82.35,54.09,82.58,54,82,54a1,1,0,0,1-.72-1.74L86.56,47ZM48,69H80a1,1,0,0,1,0,2H48A1,1,0,0,1,48,69ZM33.28,41.72a1,1,0,0,1,1.44-1.44L40,45.56l5.28-5.28a1,1,0,0,1,1.44,1.44L41.44,47l5.28,5.28A1,1,0,0,1,46,54c-.58,0-.33.09-6-5.58C34.35,54.09,34.58,54,34,54a1,1,0,0,1-.72-1.74L38.56,47Z" />
          <path d="M118,22a4,4,0,0,0-4-4H14a4,4,0,0,0-4,4V96H118Zm-6,67a1,1,0,0,1-1,1H17a1,1,0,0,1-1-1V25a1,1,0,0,1,1-1h94a1,1,0,0,1,1,1Z" />
        </g>
      </svg>
      <p>No Data Found</p>
    </div>
  )
}
