import { useEffect, useState } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

const url = "https://course-api.com/react-tabs-project"

const App = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const getData = async () => {
    const reponse = await fetch(url)
    const items = await reponse.json()
    setData(items)
  }

  useEffect(() => {
    getData()
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [/* ne fait rien quand la page est chargée */])

  if (isLoading) {
    return <h1>en cours de chargement .... </h1>
  }
  else {

    const { title, dates, duties, company } = data[currentIndex]

    return (
      <div>
        <main>
          <h2 className="heading">Expérience</h2>
          <div className="underline"></div>
          <article className="main">
            <div className="side-btn">
              {
                data.map((itemEnCours, index) => {
                  return (
                    <button type="button"
                      key={itemEnCours.id}
                      className={`job-btn ${index === currentIndex && "active-btn"}`}
                      onClick={() => setCurrentIndex(index)}
                    >
                      {itemEnCours.company}
                    </button>
                  )
                })
              }
            </div>

            <div>
              <h2 className="title">{title}</h2>
              <h3 className="sub-company">{company}</h3>
              <p className="dates">{dates}</p>
             
                {
                  duties.map((duty, index) => {
                    return (
                      <div key={index} className="job-duties">
                        <FaAngleDoubleRight className="angle-right" />
                        <p className="desc">{duty}</p>
                      </div>
                    )
                  })
                }
             
            </div>

          </article>
        </main>
      </div>
    )
  }


}

export default App;