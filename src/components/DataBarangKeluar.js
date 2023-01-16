import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import Link from 'next/link'

const databarangkeluar = ({data}) => {
  console.log({data})
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5"></CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Rekap Data Barang Keluar
        </CardSubtitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3" borderless>
            <thead>
              <tr id="tabel-judul">
                <th>No.</th>
                <th>Kode Udang</th>
                <th>Nama Udang</th>
                <th>Ukuran Udang (cm)</th>
                <th>Tanggal Keluar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((idata, index) => (
                <tr key={index} className="border-top" id="tabel-isi">
                  <td>{index + 1}</td>
                  <td>{idata.attributes.barang.data.attributes.kode_udang}</td>
                  <td>{idata.attributes.barang.data.attributes.nama_udang}</td>
                  <td>{idata.attributes.barang.data.attributes.ukuran_udang}</td>
                  <td>{idata.attributes.tanggal}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default databarangkeluar;
