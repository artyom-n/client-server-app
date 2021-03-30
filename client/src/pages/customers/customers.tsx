import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './customers.module.scss';

type Subscriptions = {
  id: number;
  email: string;
  provider: string;
  date: string
}

type Providers = {
  provider: string
}

const Customers = () => {

  const [shouldGetData, setShouldGetData] = useState<boolean>(true)
  const [subscriptions, setSubscriptions] = useState<Subscriptions[]>([])
  const [displayedSubs, setDisplayedSubs] = useState<Subscriptions[]>([])
  const [providers, setProviders] = useState<Providers[]>([])
  const [search, setSearch] = useState<string>('')

  const compareDates = (b: any, a: any) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  }

  const compareNames = (a: any, b: any) => {
    if (a.email < b.email) {
      return -1;
    }
    if (a.email > b.email) {
      return 1;
    }
    return 0;
  }

  const sortByDate = () => {
    const sortedByDate = [...displayedSubs]
      .sort(compareDates)
    setDisplayedSubs(sortedByDate)
  }

  const sortByName = () => {
    const sortedByName = [...displayedSubs]
      .sort(compareNames)
    setDisplayedSubs(sortedByName)
  }

  const getData = async () => {
    await axios.get('/api/get')
      .then((res) => {
        setSubscriptions(res.data)
        setDisplayedSubs(res.data
          .sort(compareDates))
        setShouldGetData(false)
      })
  }

  const getProviders = async () => {
    await axios.get('/api/get/providers')
      .then((res) => {
        setProviders(res.data)
      })
  }

  const deleteEmail = async (id: number) => {
    await axios.delete(`/api/delete/${id}`)
      .then(() => {
        getData()
      })
  }

  useEffect(() => {
    if (shouldGetData) {
      getData()
    }
    if (providers.length === 0) {
      getProviders()
    }
  })

  const filterEmails = (provider: string) => {
    const filterByProvider = subscriptions.filter(
      (item) => item.provider === provider
    )
    setDisplayedSubs(filterByProvider)
  }

  const searchByEmail = () => {
    const filteredSubs = subscriptions
      .filter((item) =>
        item.email
          .toLowerCase()
          .includes(search
            .toLowerCase()))
    setDisplayedSubs(filteredSubs)
  }

  return (
    <div className={styles.emails}>
      <div
        className={styles.wrapper}
      >
        <button
          className={styles.button}
          onClick={() => sortByName()}
        >
          Sort by name
        </button>
        <button
          className={styles.button}
          onClick={() => sortByDate()}
        >
          Sort by date
        </button>
      </div>
      <div
        className={styles.wrapper}
      >
        <input
          className={styles.search}
          type="text"
          placeholder="Search by email"
          onChange={(e) => {
            setSearch(e.target.value)
            searchByEmail()
          }}
        />

      </div>
      <div className={styles.providers}>
        <span>Filter by provider: </span>
        <>
          <button
            className={styles.button}
            onClick={() =>
              setDisplayedSubs(subscriptions)
            }
          >
            All
          </button>
          {providers.map((item, i) => {
            return (
              <button
                className={styles.button}
                key={i}
                onClick={() =>
                  filterEmails(item.provider)
                }
              >
                {item.provider}
              </button>
            )
          })}
        </>
      </div>
      <div
        className={styles.wrapper}
      >
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>E-Mail</th>
              <th>Provider</th>
              <th>Date</th>
            </tr>
            {displayedSubs
              .map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.provider}</td>
                    <td>{item.date}</td>
                    <td>
                      <button
                        className={styles.button}
                        onClick={() =>
                          deleteEmail(item.id)
                        }
                      >
                        x
                  </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Customers;
