import React from 'react'
import Layout from '../../components/Layout'

const UserProfile = ({ data: user }) => {
    const { first_name, last_name, email, avatar } = user;

    return (
        <Layout>
            <div className="card" style={{ width: '18rem' }}>
                <img src={avatar} className="card-img-top" alt={first_name} />
                <div className="card-body">
                    <h5 className="card-title">{first_name} {last_name}</h5>
                    <p className="card-text">{email}</p>
                </div>
            </div>
        </Layout>
    )
}

export const getStaticPaths = async () => {
    const response = await fetch('https://reqres.in/api/users');
    const { data } = await response.json();

    const paths = data.map(({ id }) => ({ params: { id: id.toString() } }));

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (ctx) => {
    try {
        const response = await fetch(`https://reqres.in/api/users/${ctx.params.id}`);
        const { data } = await response.json();

        return {
            props: {
                data
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export default UserProfile