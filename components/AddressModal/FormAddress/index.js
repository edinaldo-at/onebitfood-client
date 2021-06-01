import { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Spinner, Alert} from 'react-bootstrap';
import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';
import { addressState } from '../../../store/atoms/addressAtom';

import getAvailableCities from '../../../services/getAvailableCities';

export default function FromAddress(props) {
    const { available_cities, isLoading, isError } = getAvailableCities();
    const [ address, setAddress ] = useRecoilState(addressState);
    const [ cityChanged, setCityChanged ] = useState(false);
    const router = useRouter;

    if(isError)
        return <Alert variant='custom-red'>Erro ao carregar</Alert>
    else if(isLoading)
        return <Spinner animation='border'/>;
    
    const updateAddress = (e) => {
        if(e.target.name == 'city')
            setCityChanged(true);
        setAddress({...address, [e.target.name]: e.target.value })
    }

    const confirmAddress = (e) => {
        e.preventDefault();
        props.onHide();
        if(cityChanged)
            router.push('/restaurants');
    }

    return (
        <Row>
            <Col md={12}>
                <Form onSubmit={e => confirmAddress}>
                    <Form.Group>
                        <Form.Label>Sua Cidade</Form.Label>
                        <Form.Control
                            required
                            as='select'
                            onChange={updateAddress}
                            value='itap'
                            name='city'
                        >
                            {address.city == '' && <option key={0}>Escolher Cidade</option>}
                            {available_cities.map((city, i) => (<option key={1} value={city}>{city}</option>))}
                        </Form.Control>
                        {address.city != '' &&
                            <div>
                                <Form.Group className='mt-3'>
                                    <Form.Label>Bairro</Form.Label>
                                    <Form.Control
                                        required
                                        type='text'
                                        placeholder='Bairro'
                                        onChange={updateAddress}
                                        value='sao marcos'
                                        name='neighborhood'
                                    />
                                </Form.Group>
                                <Form.Group className='mt-3'>
                                    <Form.Label>Logradouro</Form.Label>
                                    <Form.Control
                                        required
                                        type='text'
                                        placeholder='Rua/Avenida/Alameda'
                                        onChange={updateAddress}
                                        value='mauritânia'
                                        name='street'
                                    />
                                </Form.Group>
                                <Form.Group className='mt-3'>
                                    <Form.Label>Número</Form.Label>
                                    <Form.Control
                                        required
                                        type='text'
                                        placeholder='Número'
                                        onChange={updateAddress}
                                        value='215'
                                        name='number'
                                    />
                                </Form.Group>
                                <Form.Group className='mt-3'>
                                    <Form.Label>Complemento</Form.Label>
                                    <Form.Control
                                        required
                                        type='text'
                                        placeholder='Complemento'
                                        onChange={updateAddress}
                                        value='teste'
                                        name='complement'
                                    />
                                </Form.Group>
                                <div className='text-center pt-4'>
                                   <Button variant='custom-red' className='text-white' type='submit' size='md'>
                                       Confirmar endereço
                                   </Button>
                                </div>
                            </div>
                        }
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
};
