import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Header from '../../organisms/Header';
import './styles.css';
import Title from '../../atoms/Title';
import Field from '../../atoms/Field';
import ItemsGrid from '../../molecules/ItemsGrid';
import { Map, TileLayer, Marker } from 'react-leaflet'
import { api, ibge } from '../../../services/api';
import SelectOption from '../../atoms/SelectOption';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from 'react-router-dom';


interface Item {
    id: number,
    image_url: string,
    title: string,
}

interface IBEGEUFResponse {
    sigla:string,
}

interface IBEGECityResponse{
    nome:string,
}


const CreatePoint = () =>{
    
    const [items, setItems] = useState<Item[]>([]);
    const [ufs,setUfs] = useState<string[]>([]);
    const [cities,setCities] = useState<string[]>([]);
    const [initialPositon,setInitialPosition] =useState<[number,number]>([0,0]);

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        whatsapp:'',
    })

    const [selectedUf,setSelectedUf] = useState('0');
    const [selectedCity,setSelectedCity] = useState('0');
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedPositon,setSelectedPositon] =useState<[number,number]>([0,0]);

    const history = useHistory();

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(positon =>{
            const { latitude, longitude } = positon.coords;
            setInitialPosition([latitude, longitude])
        })
    },[])

    useEffect(() => {
        api.get('items').then(response =>
            setItems(response.data)
        )
    }, [])

    useEffect(()=>{
        ibge.get<IBEGEUFResponse[]>('estados?orderBy=nome').then(response=>{
            const ufInitials = response.data.map(uf => uf.sigla)
            setUfs(ufInitials);
        })
    },[])

    useEffect(()=>{
        if(selectedUf !== '0'){
            ibge.get<IBEGECityResponse[]>(`estados/${selectedUf}/municipios`).then(response=>{
                const cityNames = response.data.map(city=> city.nome);
                setCities(cityNames);
            })
        }
    },[selectedUf])

    const handleSelectUf = (event: ChangeEvent<HTMLSelectElement> ) =>{
        setSelectedUf(event.target.value);
    }

    const handleSelectCity = (event: ChangeEvent<HTMLSelectElement> ) =>{
        setSelectedCity(event.target.value);
    }
    
    const handleMapClick = (event: LeafletMouseEvent ) =>{
        setSelectedPositon([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>{
        const { name, value} = event.target;

        setFormData({ ...formData, [name]: value })
    }

    const handleSelectItem = (id:number) =>{
        const alreadySelected = selectedItems.findIndex(item => item === id);  

        if(alreadySelected>=0){
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else{
            setSelectedItems([...selectedItems, id]);
        }
    }

    const handleSubmit =  async (event: FormEvent) => {
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPositon;
        const items = selectedItems;
        
        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        }
        //TODO validar se os dados são vazios ou não
        await api.post('points', data);
        
        alert('Ponto de coleta criado com sucesso');

        history.push('/');

    }
    return (
        <div id="page-create-point">
            <Header backHome/>

            <form onSubmit = {handleSubmit} >
                <h1>Cadastro do <br/> ponto de coleta</h1>
                
                <fieldset>
                    <Title title ="Dados"/>

                    <div className ="field">
                        <Field 
                            htmlFor="name" 
                            type = "text" 
                            name ="name" 
                            id="name" 
                            labelText ="Nome da entidade"
                            onChange ={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <Field 
                            htmlFor="email" 
                            type = "email" 
                            name ="email" 
                            id="email" 
                            labelText ="E-mail"
                            onChange ={handleInputChange}
                        /> 
                        <Field 
                            htmlFor="whatsapp" 
                            type = "text" 
                            name ="whatsapp" 
                            id="whatsapp" 
                            labelText ="Whatsapp"
                            onChange ={handleInputChange}
                        /> 
                    </div>
                </fieldset>

                <fieldset>
                    <Title title ="Endereço" description="Selecione o endereço no mapa"/>

                    <Map center = {initialPositon} zoom ={15} onclick = {handleMapClick} >
                        <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position = {selectedPositon} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <SelectOption 
                                data={ufs} 
                                name={"uf"} 
                                title={"Selecione uma UF"}
                                onChange ={handleSelectUf}
                                value={selectedUf}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <SelectOption 
                                data={cities} 
                                name={"city"} 
                                title={"Selecione uma cidade"} 
                                onChange = {handleSelectCity}
                                value={selectedCity}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <Title title ="Ítens de coleta" description="Selecione um ou mais ítens abaixo"/>  
                    <ItemsGrid items = {items} handleSelectItem = {handleSelectItem} selectedItems ={selectedItems}/>          
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    )
};

export default CreatePoint;