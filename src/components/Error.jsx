import Layout from './Layout'
import "../styles/Error.css"

function Error({ error }) {
    if (error.code === "ERR_NETWORK") {
        return (
            <div className='networkError'>
                <h1>Server unavailable!</h1>
                <p>We’re having trouble reaching our servers.</p>
                <p style={{ color: "#555" }}>Please try again later.</p>
            </div>
        )
    }
    return (
        <Layout>
            {/* <h1 style={{ margin: "0 auto", textAlign: "center" }}></h1> */}
            <p style={{ margin: "0 auto", textAlign: "center" }}>{error.message}</p>
        </Layout>
    )
}

export default Error