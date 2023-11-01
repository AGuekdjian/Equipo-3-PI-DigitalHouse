import React from 'react'

const Pagination = ({ moviesPerPage, totalMovies, currentPage, setCurrentPage }) => {

  const pageNumbers = [];



  const paginas = Math.ceil(totalMovies / moviesPerPage);

  console.log(paginas);

  for (let i = 0; i <= paginas; i++) {
    pageNumbers.push(i);

  }

  console.log(pageNumbers);



  return (
    <div>
      <nav aria-label="Page navigation example" className='mb-6'>
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <a href="#" className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-gray-700 border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
          </li>


          {pageNumbers.map(number => (

            <li key={number}>
              <a href="#" aria-current={`${number ===currentPage ? 'page' : '' }`} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-gray-700 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{number + 1}</a>
            </li>

          ))}

          <li>
            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-gray-700 border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination