import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS, USER } from './queries'

const Recommend = (props) => {
  const result_books = useQuery(ALL_BOOKS)
  const result_user = useQuery(USER)

  if (!props.show) {
    return null
  }


  if (result_books.loading && result_user.loading) {
    return <div>loading...</div>
  }

  console.log('1:', result_books.data.length)
  console.log('2:', result_user.data.length)
  if(result_books.data.length === 0 || result_user.data.length === 0 ){
    return <div>not available...</div>
  }
  const books = result_books.data.allBooks2
  const me = result_user.data.me
  const favoriteGenre = me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>

     books in your favourite genre <strong>{favoriteGenre}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>

          {books.filter(book =>
            book.genres.includes(favoriteGenre)).map(filteredBook => (
              <tr key={filteredBook.title}>
                <td>{filteredBook.title}</td>
                <td>{filteredBook.author}</td>
                <td>{filteredBook.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend