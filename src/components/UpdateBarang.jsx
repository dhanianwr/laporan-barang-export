import { InMemoryCache, gql, ApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Card, Col, Form, FormGroup, Input, Row, Label, Button } from 'reactstrap'


const client = new ApolloClient({
    uri :'http://localhost:1337/graphql',
    cache : new InMemoryCache ()
})
    
function UpdateBarang() {
  const [_kodeUdang, setKodeUdang] = useState('')
  const [_namaUdang, setNamaUdang] = useState('')
  const [_ukuranUdang, setUkuranUdang] = useState('')

    const route = useRouter ();

    const {id, kodeUdang, namaUdang, ukuranUdang} = route.query;

    useEffect (() => {
      if (typeof kodeUdang == 'string') {
          setKodeUdang(kodeUdang)
      }
      if (typeof namaUdang == 'string') {
          setNamaUdang(namaUdang)
    }
      if (typeof ukuranUdang == 'string') {
          setUkuranUdang(ukuranUdang)
      }
  } , [id, kodeUdang, namaUdang, ukuranUdang ]) 

const submitHandler = async (e) => {
  e.preventDefault()

  try {
    await client.mutate({
      mutation : gql`
      mutation {
        updateBarang(
          id:${id}
          data: { 
            nama_udang: "${_namaUdang}", 
            kode_udang: "${_kodeUdang}", 
            ukuran_udang: "${_ukuranUdang}" }
        ) {
          data {
            id
            attributes {
              nama_udang
              kode_udang
              ukuran_udang
            }
          }
        }
      }
      
      `
    })
    alert('Update Data Berhasil')
    route.push('/')
  } catch {
    alert('GAGAL')
  }
}

  return (
    <Card  className='p-3'>
        <Form onSubmit={submitHandler}>
            <Row>
                <Col md={12}>
                    <FormGroup>
                        <Label>Kode Udang</Label>
                        <Input
                            type='text'
                            id='kode_udang'
                            name='kode_udang'
                            placeholder='Kode Udang'
                            value={_kodeUdang}
                            onChange={(e) => setKodeUdang(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={12}>
                    <FormGroup>
                        <Label>Nama Udang</Label>
                        <Input
                            type='text'
                            id='nama_udang'
                            name='nama_udang'
                            placeholder='Nama Udang'
                            value={_namaUdang}
                            onChange={(e) => setNamaUdang(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={12}>
                    <FormGroup>
                        <Label>Ukurang Udang</Label>
                        <Input
                            type='text'
                            id='ukuran_udang'
                            name='ukuran_udang'
                            placeholder='Ukuran Udang'
                            value={_ukuranUdang}
                            onChange={(e) => setUkuranUdang(e.target.value)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Button className='btn' color='primary'>Submit</Button>
        </Form>
    </Card>
  )
}

export default UpdateBarang