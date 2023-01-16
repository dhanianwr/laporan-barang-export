import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { Card, Col, Form, FormGroup, Input, Row, Label, Button } from 'reactstrap'
import { useRouter } from 'next/router'

const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    cache: new InMemoryCache()
})

function CreateBarang() {
    const [kodeUdang, setKodeUdang] = useState('')
    const [namaUdang, setNamaUdang] = useState('')
    const [ukuranUdang, setUkuranUdang] = useState('')

    const route = useRouter()

    async function submitHandler(e) {
        e.preventDefault()
        try {
            await client.mutate({
                mutation: gql`
                    mutation {
                        createBarang(data: {
                            kode_udang: "${kodeUdang}",
                            nama_udang: "${namaUdang}",
                            ukuran_udang: "${ukuranUdang}"
                        }) 
                        {
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
                `
            })
            alert('berhasil')
            route.push('/')
        } catch {
            alert('gagal')
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
                            value={kodeUdang}
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
                            value={namaUdang}
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
                            value={ukuranUdang}
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

export default CreateBarang