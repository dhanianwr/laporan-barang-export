import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Head from "next/head";
import { Col, Row } from "reactstrap";

export default function Home({ barangkeluars }) {
  console.log ({ barangkeluars })
  return (
    <div>
      <Head>
        <title>Data Barang Keluar</title>
        <meta
          name="description"
          content="Laporan Kas Bulanan"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        
        {/***Table ***/}
        <Row>
          <Col lg="12" sm="12">
            <Databarang data={ barangkeluars.data }/>
          </Col>
        </Row>
      </div>
    </div>
  );
}


export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    cache: new InMemoryCache()
  }); 

  const { data } = await client.query ({
    query: gql`
    query {
        barangkeluars {
            data {
                id
                attributes {
                    tanggal
                    barang {
                        data {
                            id
                            attributes {
                                kode_udang
                                nama_udang
                                ukuran_udang
                            }
                        }
                    }
                }
            }
        }
    }
    `
  })
  return {
    props: { barangs: data.barangs }
  }
}