import React, {useState} from 'react'
import DropZone from 'react-dropzone'
import {Icon} from 'antd'
import Axios from 'axios'

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const DropHandler = (files) => {

        let formData = new FormData()
        const config = {
            header: { 'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])
    
        Axios.post('/api/product/image', formData, config)
            .then(response => {
                if(response.data.success) {
                    setImages([...Images, response.data.filePath])
                    props.refreshFunction([...Images, response.data.filePath])
                } else {
                    alert('file upload err');
                }
            })
    }

    const deleteHandler = (image) => {
        let currentIndex = Images.indexOf(image)
        let newImages = [...Images]
        newImages.splice(currentIndex, 1)
        setImages(newImages)
        props.refreshFunction([...Images, newImages])
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <DropZone onDrop={DropHandler}>
                {({ getRootProps, getInputProps}) => (
                    <div style={{ width: 300, height: 240, border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem'}} />
                    </div>
                )}

            </DropZone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflow: 'scroll'}}>
                    {Images.map((image, index) => (
                        <div onClick={() => deleteHandler(image)} key={index}>
                            <img style={{ minWidth: '300px', width: '300px', height: '240px'}}
                                src={`http://localhost:5000/${image}`} 
                                alt="" />
                        </div>
                    ))}
            </div>

        </div>
    )
}

export default FileUpload
