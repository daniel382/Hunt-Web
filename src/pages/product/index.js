import React, { Component } from 'react'

import './styles.css'
import api from '../../services/api'

export default class Product extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: {}
        }
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const response = await api.get(`/products/${ id }`)
        
        this.setState({ product: response.data })
    }

    render() {
        const { product } = this.state

        return (
            <div className="product-info">
                <h1>{ product.title }</h1>
                <p>{ product.description }</p>

                <p>
                    URL: <a target="_blank" rel="noopener noreferrer" href={ product.url }>{ product.url }</a>
                </p>
            </div>
        )
    }
}