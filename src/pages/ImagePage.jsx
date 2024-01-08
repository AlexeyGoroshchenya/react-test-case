import React, { useContext, useEffect, useState } from 'react';
import ImageFrame from '../components/ImageFrame/ImageFrame';
import InfoBox from '../components/InfoBox/InfoBox';
import Buttons from '../components/Buttons/Buttons';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from '../components/UI/Modal/Modal';
import TagsList from '../components/TagsList/TagsList';

//моковые данные
const data = [

    {
        "id": 1,
        "name": "Объект 1",
        "price": 45,
        "desc": "Что-то про объект 1",
        "image": "5.webp",
        "tags": [{ name: "label1", id: 1 }, { name: "label3", id: 3 }, { name: "label5", id: 5 }]
    }
    ,
    {
        "id": 2,
        "name": "Объект 2",
        "price": 60,
        "desc": "Что-то про объект 2",
        "image": "7.webp",
        "tags": [{ name: "label2", id: 2 }, { name: "label4", id: 4 }]
    },
    {
        "id": 3,
        "name": "Объект 3",
        "price": 60,
        "desc": "Что-то про объект 3",
        "image": "10.webp",
        "tags": [{ name: "label2", id: 2 }, { name: "label4", id: 4 }]
    }
]

//имитация хранения данных на сервере
if (!localStorage.getItem('data')) {
    localStorage.setItem('data', JSON.stringify(data))
}


const ImagePage = observer(() => {



    const [id, setId] = useState(useParams().id)


    const router = useNavigate()

    const { objects } = useContext(Context)

    const [object, setObject] = useState({
        id: 0,
        name: "",
        price: 0,
        desc: "0",
        image: "",
        tags: []
    })


    const [prevId, setPrevId] = useState(1)
    const [nextId, setNextId] = useState(1)
    const [selectedTags, setSelectedTags] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModal, setIsModal] = useState(false)
    const [emptyData, setEmptyData] = useState(false)

    const getObject = async (id) => {

        let res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        })

        //подменяю ответ на моковые данные
        let localData = JSON.parse(localStorage.getItem('data'))
        objects.setObjectsCount(localData.length)
        res = localData.find(item => item.id + '' === id + '')
        let current = localData.findIndex(item => item.id + '' === id + '')

        if (current - 1 >= 0) {
            setPrevId(localData[current - 1]?.id)
        } else { setPrevId(localData[localData.length - 1]?.id) }
        if (current + 1 < localData.length) {
            setNextId(localData[current + 1]?.id)
        } else { setNextId(localData[0]?.id) }


        return res
    }

    const saveChanges = async () => {

        //в задании говорилось тут слать POST но у jsonplaceholder нет подходящего эндпоинта
        // чтобы и id и POST, поэтому взял put  
        let res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            body: JSON.stringify(object.tags)
        })

        

        //подменяю ответ на моковые данные
        let objectsData = JSON.parse(localStorage.getItem('data'))
        console.log(objectsData);
        let current = objectsData.findIndex(item => item.id + '' === id + '')
        console.log(current);
        objectsData[current].tags = selectedTags
        
        console.log(objectsData);
        // setObject([...object, tags: [...selectedTags]])
        localStorage.setItem('data', JSON.stringify(objectsData))

        //может быть неправильно понял задание и при сохранении не надо менять картинку
       goToNextPage()
    }

    const deleteObject = async () => {

        let res = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${object.id}`)

        //подменяю ответ на моковые данные 

        let objectsData = JSON.parse(localStorage.getItem('data'))
        const filteredData = objectsData.filter(item => item.id !== object.id)

        localStorage.setItem('data', JSON.stringify(filteredData))
        objects.setObjectsCount(JSON.parse(localStorage.getItem('data')).length)
        if (filteredData.length > 0) {
            changePage(filteredData[0].id)
        } else {
            setEmptyData(true)
        }
    }

    const goToPervPage = () => {

        changePage(prevId)
    }

    const goToNextPage = () => {

        changePage(nextId)
        
    }

    const changePage = (id) => {

        setIsLoading(true)

        getObject(id).then((res) => {

            setObject({ ...res })
            setSelectedTags([...res.tags])
        }).then(() => {
            setId(id)
            router('/' + id, { replace: false })
            setIsLoading(false)
        })
    }

    useEffect(() => {
        setIsLoading(true)

        getObject(id).then((res) => {

            if(JSON.parse(localStorage.getItem('data')).length === 0){
                setEmptyData(true)
                return
            }

            setObject({ ...res })
            setSelectedTags([...res.tags])
            setIsLoading(false)
        })

    }, [])


if(emptyData) return (
    <div className='notice'>
        <h2 >Больше картиночек нет. Удалите объект data из localStorage, все вернется </h2>
    </div>
    
)

if(isLoading) return (
    <div className='notice'>
        <h2 >Загрузка...</h2>
    </div>
    
)


    return (
        <div>
            <ImageFrame image={object.image} />
            <InfoBox 
                object={object}
                add={() => setIsModal(true)}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />
            <Buttons goToPervPage={goToPervPage}
                goToNextPage={goToNextPage}
                saveChanges={saveChanges}
                deleteObject={deleteObject}
                isLoading={isLoading} />
            <Modal visible={isModal} setVisible={setIsModal}>

                <div className="modal__inner">
                    
                    <TagsList selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                </div>
            </Modal>
        </div>
    );
});

export default ImagePage;