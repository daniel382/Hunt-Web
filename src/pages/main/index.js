import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './styles.css'
import api from '../../services/api'

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            page: 1,
            productInfo: {}
        }

        this.loadProducts = this.loadProducts.bind(this)
    }

    componentDidMount() {
        this.loadProducts()
    }

    async loadProducts() {
        const { page } = this.state
        const response = await api.get(`/products?page=${page}`)
        const { docs, ...productInfo } = response.data

        this.setState({ products: docs, productInfo })
    }

    renderProduct = product => (
        <article key={ product._id }>
            <strong>{ product.title }</strong>
            <p>{ product.description }</p>

            <Link to={ `/product/${product._id}` }>Acessar</Link>
        </article>
    )

    render() {
        const { products, productInfo: { pages } } = this.state
        let { page } = this.state

        return (
            <div className="product-list">
                { products.map(this.renderProduct) }

                <div className="actions">
                    <button
                        disabled={ page === 1 }
                        onClick={ () => this.setState({ page: --page }, this.loadProducts) }
                    >
                        Anterior
                    </button>

                    <span>{page}/{pages}</span>

                    <button
                        disabled={ page === pages }
                        onClick={ () => this.setState({ page: ++page }, this.loadProducts) }
                    >
                        Próxima
                    </button>
                </div>
            </div>
        )
    }
}