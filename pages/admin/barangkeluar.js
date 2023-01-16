import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import React from 'react'
import TableBarangKeluar from '../../src/components/DataBarangKeluar'

function barangkeluar({barangkeluars}) {
  return (
    <div>
        <TableBarangKeluar data={barangkeluars.data}/>
    </div>
  )
}

export async function getServerSideProps() {
    const client = new ApolloClient({
        uri: 'http://localhost:1337/graphql',
        cache: new InMemoryCache()
    })

    const { data } = await client.query({
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
        props: { barangkeluars: data.barangkeluars },
    }
}

export default barangkeluar