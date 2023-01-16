import { Button, Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import Link from 'next/link'
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { useRouter } from "next/router";

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})

const databarang = ({data}) => {
  console.log({data})
  const route = useRouter()
  async function deleteBarang(id, namaUdang) {
    try {
      await client.mutate({
        mutation: gql`
          mutation {
            deleteBarang(id:${id}) {
              data {
                id
              }
            }
          }
        `
      })
      alert(`${namaUdang} berhasil di hapus`)
      route.push('/')
    } catch {
      alert('gagal')
    }
  }
  return (
    <Card>
      <CardBody>
      <Button className='btn my-3' color='primary'>
            <Link href='/admin/createbarang'>
                <a className='text-white text-decoration-none'>
                    Tambah
                </a>
            </Link>
        </Button>
        <CardTitle tag="h5"></CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Data Stock Barang dan Barang Keluar Terakhir
        </CardSubtitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3" borderless>
            <thead>
              <tr id="tabel-judul">
                <th>No.</th>
                <th>Kode Udang</th>
                <th>Nama Udang</th>
                <th>Ukuran Udang (cm)</th>
                <th>Tanggal Export</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((qdata, index) => (
                <tr key={index} className="border-top" id="tabel-isi">
                  <td>{index + 1}</td>
                  <td>{qdata.attributes.kode_udang}</td>
                  <td>{qdata.attributes.nama_udang}</td>
                  <td>{qdata.attributes.ukuran_udang}</td>
                  <td>{qdata.attributes.barangkeluar.data.attributes.tanggal}</td>
                  <td>
                  <Button className='btn sm-2' color='danger' value={qdata.id} onClick={(e) => deleteBarang(e.target.value, qdata.attributes.nama_udang)}>
                    <Link href='/'>
                        <a className='text-white text-decoration-none'>
                          Hapus
                        </a>
                    </Link>
                  </Button>
                  <Button className='btn sm-2' color='success'>
                      <Link href={`/admin/updatebarang?id=${qdata.id}&kodeUdang=${qdata.attributes.kode_udang}&namaUdang=${qdata.attributes.nama_udang}&ukuranUdang=${qdata.attributes.ukuran_udang}`}>
                          <a className='text-white text-decoration-none'>
                            Update
                        </a>
                    </Link>
                </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default databarang;
