import React, { Component } from 'react';
import api from '../../Services/api';
import { Link } from 'react-router-dom';

import './styles.css'


export default class Main extends Component {
    state = {
        products: [],
        productsInfo: {},
        page: 1,


    }
    componentDidMount() {
        this.loadProducts();
    }
    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productsInfo } = response.data;

        this.setState({
            products: docs, productsInfo, page
        })
    };

    nextPage = () =>{
        const { page, productsInfo } = this.state;

        if(page === productsInfo.page) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber)
    };

    prevPage = () =>{
        const { page } = this.state;

        if(page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber)
    };


    render() {
        const { products, page, productsInfo } = this.state;

    

        return (
            <div>
                <h2>Contagem de produtos: {this.state.products.length}  </h2>
                <br />
                <div className="product-list">
                    {products.map(product => (
                        <article key={product._id}>
                            <strong>{product.title}</strong>
                            <p>{product.description}</p>

                            <Link to={`/products/${product._id}`}>Acessar</Link>

                        </article>
                    ))}
                    <div className="actions">
                        <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                        <button disabled={page === productsInfo.pages} onClick={this.nextPage}>Próxima</button>
                    </div>
                </div>
            </div>
        )
    };
};