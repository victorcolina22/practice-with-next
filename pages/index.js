import Layout from '../components/Layout';
import Link from 'next/link'

const Home = ({ users }) => {
  return (
    <Layout>
      <div className="container">
        <div className="row mt-3">
          {
            users.length > 0 &&
            users.map((user) => (
              <div className="col-4 mb-3" key={user.id}>
                <Link href={`/user/${user.id}`}>
                  <div className="card" style={{ width: '18rem', cursor: 'pointer' }}>
                    <img src={user.avatar} className="card-img-top" alt={user.name} />
                    <div className="card-body">
                      <h5 className="card-title">{user.first_name}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </Layout >
  )
}

export const getStaticProps = async () => {
  try {
    const response = await fetch('https://reqres.in/api/users');
    const { data } = await response.json();

    return {
      props: {
        users: data
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export default Home;