import { useState, useEffect, useMemo } from 'react';
import { FiUser, FiDelete, FiEdit2 } from 'react-icons/fi';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { cadastrarCliente, getClientes, deleteCliente, updateCliente, clientById } from '../../services/api';
import cx from 'classnames'
import styles from './styles.module.css';
import { Modal, Button, Form } from 'react-bootstrap';

const initialValuesClient = {

    nome: '',
    cnpj: "",
    endereco: "",

}

const initialValuesListaClientes = [


    {
        id: 1,
        nome: '',
        cnpj: "",
        endereco: "",
    },
    {
        id: 2,
        nome: '',
        cnpj: "",
        endereco: "",
    },
    {
        id: 3,
        nome: '',
        cnpj: "",
        endereco: "",
    },


]

export default function Costumers() {

    const [cliente, setCliente] = useState(initialValuesClient);
    const [clienteEdicao, setClienteEdicao] = useState(initialValuesClient);
    const [listaClientes, setListaClientes] = useState(initialValuesListaClientes);
    const [loading, setLoading] = useState(false);
    const [loadingClienteDelete, setLoadingClienteDelete] = useState(false);
    const [loadingClienteEdit, setLoadingClienteEdit] = useState(false);
    const [valorIdEdit, setValorIdEdit] = useState(0);
    const [valorIdDelete, setValorIdDelete] = useState(0);

    const { endereco, cnpj, nome } = cliente;

    const [statusCreateClient, setStatusCreateClient] = useState({
        status: ''
    });

    const [statusDelCliente, setStatusDelCliente] = useState({
        status: ''
    });

    const [statusEditCliente, setStatusEditCliente] = useState({
        status: ''
    });

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);


    useEffect(() => {

        (async () => {

            await getClientes().then((res) => {
                setListaClientes(res.data);
            })
                .catch((error) => {
                    console.log(error)
                })
        })();

    }, []);

    function handleSubmit(e) {
        e.preventDefault();

    }

    const excluirCliente = async (id) => {

        const idDelete = id;
        setValorIdDelete(idDelete);
        setShowModalDelete(true);

        try {
            const response = await clientById(idDelete);
            setClienteEdicao(response.data);

        } catch (error) {
            console.log(error)
        }

    }

    const deleteClienteConfirmacao = async () => {

        try {

            await deleteCliente(valorIdDelete);
            setStatusDelCliente({
                status: 200
            })
            setLoadingClienteDelete(true);

            await sleep(3000);

            function sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);

                })

            }
            getAllClientes();
            handleCloseDelete();
            setLoadingClienteDelete(false);

        } catch (error) {

            console.log(error)
            setStatusDelCliente({
                status: 400
            })

        }

    }

    const salvarCliente = async () => {

        try {

            await cadastrarCliente(cliente);
            setLoading(true);
            setCliente({
                nome: '',
                cnpj: '',
                endereco: ''
            })

            setStatusCreateClient({
                status: 200
            })

            await sleep(3000);

            function sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);
                })
            }
            getAllClientes();
            setLoading(false);
        } catch (error) {
            console.log(error)
            setStatusCreateClient({
                status: 400
            })
        }
    }

    const loadClienteData = async (id) => {
        const idLoad = id;
        setValorIdEdit(idLoad);
        setShowModalEdit(true);

        try {
            const response = await clientById(idLoad);
            setClienteEdicao(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const editarCliente = async () => {

        const IdEdit = valorIdEdit;
        const clienteEdit = clienteEdicao;

        try {

            await updateCliente(IdEdit, clienteEdit);

            setClienteEdicao({
                nome: '',
                cnpj: "",
                endereco: "",

            })
            setLoadingClienteEdit(true);
            setStatusEditCliente({
                status: 200
            })

            await sleep(3000);
            function sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);
                })
            }
            handleCloseEdit();
            getAllClientes();
            setLoadingClienteEdit(false);

        } catch (error) {
            console.log(error)
            setStatusEditCliente({
                status: 400
            })

        }

    }

    const handleCloseDelete = () => {
        setStatusDelCliente({
            status: 200
        })
        setShowModalDelete(false);

    }

    const handleCloseEdit = () => {
        setStatusEditCliente({
            status: 200
        })
        setShowModalEdit(false);
    }

    const getAllClientes = async () => {

        try {
            const response = await getClientes();
            setListaClientes(response.data);

        } catch (error) {
            console.log(error);
        }

    }

    const onValueChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value })
    }

    const onValueChangeEdicao = (e) => {
        setClienteEdicao({ ...clienteEdicao, [e.target.name]: e.target.value })
    }

    const ClienteData = useMemo(() => {
        let computedClientes = listaClientes;

        computedClientes = computedClientes.filter(value =>
            value.id !== 1
        );

        computedClientes = computedClientes.filter(value =>
            value.nome !== ''
        );

        return computedClientes;

    }, [listaClientes]);


    return (
        <div>
            <Header />
            <div className="content">
                <Title nome="Clientes">
                    <FiUser size={25} />
                </Title>
                <div className={styles.container}>
                    <form onSubmit={(e) => { handleSubmit(e) }} className="">
                        <label>Nome</label>
                        <input placeholder="Digite o Nome Fantasia" type="text" name='nome' value={nome} onChange={(e) => onValueChange(e)} />
                        <label>CNPJ</label>
                        <input placeholder="Digite o CNPJ" type="text" name='cnpj' value={cnpj} onChange={(e) => onValueChange(e)} />
                        <label>Endereço</label>
                        <input placeholder="Digite o seu Endereço" type="text" name='endereco' value={endereco} onChange={(e) => onValueChange(e)} />
                        <button className={styles.buttonCostumers} type="submit" onClick={() => salvarCliente()}>Salvar</button>
                        {loading === true ? <div className={styles.msgSucesso}>Cliente salvo com sucesso!</div> : null}
                        {statusCreateClient.status === 400 ? <div className={styles.msgErroCreateCliente}>Erro ao cadastrar o Cliente</div> : null}
                    </form>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Cliente</th>
                            <th scope="col">CNPJ</th>
                            <th scope="col">Endereço</th>
                            <th scope="col">Cadastrado em</th>
                            <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ClienteData.map((value, index) => (
                            <tr key={index}>
                                <td data-label="Cliente">{value.nome}</td>
                                <td data-label="CNPJ">{value.cnpj}</td>
                                <td data-label="Endereço">{value.endereco}</td>
                                <td data-label="Cadastrado">20/06/2021</td>
                                <td data-label="#">
                                    <button onClick={() => { excluirCliente(value.id) }} className="action" style={{ backgroundColor: '#3583f6' }}>
                                        <FiDelete color="#FFF" size={17} />
                                    </button>
                                    <button className={cx(styles.action)} style={{ backgroundColor: '#F6a935' }} onClick={() => loadClienteData(value.id)} >
                                        <FiEdit2 color="#FFF" size={17} />
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <Modal className={styles.modalFontSize} show={showModalDelete} onHide={handleCloseDelete} animation={false} centered>
                    <Modal.Header closeButton >
                        <Modal.Title className={styles.modalFontSize}>Excluir</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deseja excluir o cliente <span className={styles.spanNomeCliente} >{clienteEdicao.nome}</span> permanentemente?</Modal.Body>
                    <Modal.Footer className={styles.modalFooter}>
                        <Button onClick={() => handleCloseDelete()}>Cancelar</Button>
                        <Button onClick={() => deleteClienteConfirmacao()}>Confirmar</Button>
                    </Modal.Footer>
                    {loadingClienteDelete === true ? <div className={styles.msgSucesso}>Cliente excluído com sucesso!</div> : null}
                    {statusDelCliente.status === 400 ? <div className={styles.msgErroDelTrein}>Erro ao excluir o Cliente</div> : null}
                </Modal>
                <Modal show={showModalEdit} onHide={handleCloseEdit} className={styles.modalTop} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className={styles.formLabel}>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ex: Pedro Canabrava"
                                    className={styles.formControlEdit}
                                    name='nome'
                                    value={clienteEdicao.nome || ''}
                                    onChange={(e) => onValueChangeEdicao(e)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className={styles.formLabel}>Cnpj</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ex: 99999999999"
                                    className={styles.formControlEdit}
                                    name='cnpj'
                                    value={clienteEdicao.cnpj || ''}
                                    onChange={(e) => onValueChangeEdicao(e)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className={styles.formLabel}>Endereço</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ex: Rua lagoa branca"
                                    className={styles.formControlEdit}
                                    name='endereco'
                                    value={clienteEdicao.endereco || ''}
                                    onChange={(e) => onValueChangeEdicao(e)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className={styles.modalFooter}>
                        <Button variant="secondary" onClick={handleCloseEdit} className={styles.buttonCancelar}>
                            Cancelar
                        </Button>
                        <Button onClick={() => editarCliente()} variant="primary" className={styles.buttonSalvar}>
                            Salvar alterações
                        </Button>
                    </Modal.Footer>
                    {loadingClienteEdit === true ? <div className={styles.msgSucesso}>Alterações salvas com sucesso!</div> : null}
                    {statusEditCliente.status === 400 ? <div className={styles.msgErroCreateCliente}>Erro ao alterar os dados</div> : null}
                </Modal>
            </div>
        </div>
    );
}