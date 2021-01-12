import Axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Icon, Col, Card, Row} from 'antd'
import Meta from 'antd/lib/card/Meta'
import ImageSlider from '../../utils/ImageSlider'

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(4)
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body)
    }, [])


    const loadMoreHandler = () => {
        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(body)
        setSkip(skip)
    }

    const getProducts = (body) => {

        Axios.post('/api/product/products', body)
            .then(response => {
                if(response.data.success) {
                    if(body.loadMore) {
                        setProducts([...Products, ...response.data.products])
                    } else {
                        setProducts(response.data.products)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert('products get err')
                }
            })
    }



    const renderCards = Products.map((product, index) => {
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card 
                cover={<ImageSlider images={product.images} />}
            >
                <Meta 
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })

 
    return (
        <div style={{ width: '80%', margin: '3rem auto'}}>
            <div style={{ textAlign: 'center'}}>
                <h2>Let's Travel Anywhere <Icon type="rocket" /></h2>
            </div>

            {/* Filter */}

            {/* Search */}

            {/* Cards */}
            
            <Row gutter={16, 16}>
                {renderCards}
            </Row>

            <br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            }

        </div>

    )
}

export default LandingPage
