import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import Config from './config';
import PhotoMap from './Map.js';
import ThumbnailSet,{EmptyThumbnailSet} from './ThumbnailSet.js';
import YearSlider from './YearSlider';
//import ReactIntense from 'react-intense' @todo ver esto, puede haber un problema con webpack, hay webpack?

//import axios from 'axios';


import 'rc-slider/assets/index.css';

class PhotoDescription extends Component{
    render(){
        return (
            <div className="mainPhotoDescription bg-primary">
                <h1 key="MainTitle" id="mainPhotoTitle">{this.props.activePhoto.titulo}</h1>
                <ul className="photDescription">
                    <li key="MainDesc">{this.props.activePhoto.sector}</li>
                    <li key="MainYear">{this.props.activePhoto.ano}</li>
                </ul>
            </div>);
    }
}


class MainPhoto extends Component {
    constructor(props) {
        super(props);
        // Manually bind this method to the component instance...
        this.handleClick = this.handleClick.bind(this);
        this.handleYearSearch = this.handleYearSearch.bind(this);
        this.handleGeoSearch = this.handleGeoSearch.bind(this);
    }

    handleClick(photo){
        this.props.handleNewActive(photo);
    }
    handleGeoSearch(bounds){
        this.props.handleGeoSearch(bounds);
    }
    handleYearSearch(year){
        this.props.handleYearSearch(year);
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-8">
                    <div className="mainPhoto" id="mainPhoto">
                        {/*<ReactIntense
                            key="MainPhotoImg"
                            src={Config.apiBaseUrl+"/images/1200/"+this.props.activePhoto.foto}
                            alt={this.props.activePhoto.titulo}
                        />*/}
                        {this.props.photos != null ?(
                            <img key="MainPhotoImg" src={Config.apiBaseUrl + "/images/1200/" + this.props.activePhoto.foto}
                                 className="img-responsive mainPhoto" alt={this.props.activePhoto.titulo}></img>
                        ):
                            (<img key={"MainPhotoImg"} src={Config.apiBaseUrl+"/images/ACG-logo.jpg"} alt="ACG" className="img-responsive mainPhoto" /> )}
                    </div>

                </div>
                <div className="col-lg-4">
                    {this.props.activePhoto == null ?(
                        <div className="mainPhotoDescription bg-danger">
                            <span>{"No hay resultados que concuerden con su búsqueda"}</span>
                            <button className="btn btn-default">Limpiar Filros</button>
                        </div>
                        )
                        :(<PhotoDescription activePhoto={this.props.activePhoto}/>)
                    }


                    <PhotoMap
                        photos={this.props.photos}
                        activePhoto={this.props.activePhoto}
                        year={this.props.year}
                        geoSearch={this.props.geoSearch}
                        onNewActive={this.handleClick.bind(this)} //se pasa este métdodo para que sea usado por el mapa para poner el estado
                        handleGeoSearch={this.handleGeoSearch.bind(this)}
                        />
                        <YearSlider
                        handleYearSearch={this.handleYearSearch.bind(this)}
                        dataSets={this.props.dataSets}
                        years={this.years}
                        />


                </div>
            </div>
        );
    }
}

/**
 * @todo: pasar Thumbnail y ThumbnailSet a un archivo aparte
 */



class App extends Component {
    constructor(props) {
        super(props);
        //var as = [{"idfoto":"1","foto":"001-Playa-Naranjo-a-Volcan-Orosi-aerea-1988.jpg","titulo":"Playa Naranjo a Volc\u00e1n Oros\u00ed a\u00e9rea","sector":"(Izquierda) Volc\u00e1n Cacao (derecha) Cerro el Hacha (Izquierda)Argelia Centro Abajo","latitud":"10.7715072632","longitud":"-85.6607894897","ano":"1988"},{"idfoto":"2","foto":"002-Carbonal-1988.jpg","titulo":"Carbonal","sector":"(parte mas sur del sector Santa Rosa)","latitud":"10.7591123581","longitud":"-85.6585159302","ano":"1988"},{"idfoto":"3","foto":"003-Camino-a-playa-naranjo-1988.jpg","titulo":"Camino a playa Naranjo","sector":"Sector Oeste, Sector Santa Rosa","latitud":"10.8067502975","longitud":"-85.6481475830","ano":"1988"},{"idfoto":"4","foto":"004-Camino-a-playa-naranjo-1988.jpg","titulo":"Camino a playa Naranjo","sector":"Sector Oeste, Sector Santa Rosa","latitud":"10.8048954010","longitud":"-85.6473770142","ano":"1988"},{"idfoto":"5","foto":"005-Camino-a-playa-naranjo-1988.jpg","titulo":"Camino a playa Naranjo","sector":"Sector Este, Sector Santa Rosa, Quebrada Costa Rica en Centro","latitud":"10.8283739090","longitud":"-85.6363906860","ano":"1988"},{"idfoto":"6","foto":"006-Rio-Calera-1988.jpg","titulo":"R\u00edo Calera","sector":"Camino a playa Naranjo arriba. Sector Santa Rosa","latitud":"10.8370571136","longitud":"-85.6427764893","ano":"1988"},{"idfoto":"7","foto":"007-Area-Administrativa-Santa-Rosa-1988.jpg","titulo":"\u00c1rea Administrativa Santa Rosa","sector":"Corral de piedra sector Santa Rosa","latitud":"10.8392705917","longitud":"-85.6177902222","ano":"1988"},{"idfoto":"8","foto":"008-Area-Administrativa-Bosque-San-Emilio-1988.jpg","titulo":"\u00c1rea Administrativa Bosque San Emilio","sector":"A la izquierda sector Santa Rosa","latitud":"10.8207654953","longitud":"-85.5497131348","ano":"1988"},{"idfoto":"9","foto":"009-area-oeste-bosque-san-emilio-norte-sector-santa-rosa-1988.jpg","titulo":"\u00c1rea oeste bosque san Emilio norte sector santa rosa","sector":"Sector oeste bosque San Emilio y norte \u00e1rea administrativa Santa Rosa","latitud":"10.8209552765","longitud":"-85.5481262207","ano":"1988"},{"idfoto":"10","foto":"010-Oeste-Bosque-san-emilio-hacia-arriba-sector-santa-rosa-1988.jpg","titulo":"Oeste Bosque san Emilio hacia arriba sector santa rosa","sector":"Sector Santa Rosa","latitud":"10.8216934204","longitud":"-85.5476913452","ano":"1988"}];
        const as = [{"idfoto":"1","foto":"001-Playa-Naranjo-a-Volcan-Orosi-aerea-1988.jpg","titulo":"Playa Naranjo a Volc\u00e1n Oros\u00ed a\u00e9rea","sector":"(Izquierda) Volc\u00e1n Cacao (derecha) Cerro el Hacha (Izquierda)Argelia Centro Abajo","latitud":"10.7715072632","longitud":"-85.6607894897","ano":"1988"},{"idfoto":"2","foto":"002-Carbonal-1988.jpg","titulo":"Carbonal","sector":"(parte mas sur del sector Santa Rosa)","latitud":"10.7591123581","longitud":"-85.6585159302","ano":"1988"},{"idfoto":"3","foto":"003-Camino-a-playa-naranjo-1988.jpg","titulo":"Camino a playa Naranjo","sector":"Sector Oeste, Sector Santa Rosa","latitud":"10.8067502975","longitud":"-85.6481475830","ano":"1988"},];
        // console.log(as);

        this.state = {
            photos: as,
            activePhoto: as[0],
            year:null,
            geoSearch:null,
            dataSets:null
        };
        this.handleNewPhotos= this.handleNewPhotos.bind(this);
        this.handleNewActive=this.handleNewActive.bind(this);
        this.handleGeoSearch=this.handleGeoSearch.bind(this);
        this.handleYearSearch=this.handleYearSearch.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.getAllPhotos=this.getAllPhotos.bind(this);
    }

    componentWillMount(){
        const dataSets = [1956,1961,1968,1996,1998,2003];
        this.setState({dataSets});
        const length = dataSets.length - 1;
        this.setState({year:[dataSets[0],dataSets[length]]})
    }

    handleGeoSearch(bounds){
        this.setState({geoSearch:bounds});
        this.handleSearch();
    }

    handleYearSearch(year){
        this.setState({year:year});
        this.handleSearch();
    }

    handleNewActive(activePhoto){
        this.setState({activePhoto});
    }

    handleNewPhotos(photos){
        this.setState({photos});
    }

    getAllPhotos(){
        fetch(Config.apiBaseUrl+"/fotos/")
            .then(photos => photos.json())
            .then(photos => {
                this.setState({photos:photos,activePhoto:photos[0]});
            });
    }

    componentDidMount() {
        this.getAllPhotos();
    }
    handleSearch(){
        const geoData = this.state.geoSearch===null?null:this.state.geoSearch.polygon;
        const yearData = this.state.year===null?"All":this.state.year;
        var payload = {
            year:yearData,
            geo:geoData
        };

        let data = new FormData();
        data.append( "json", JSON.stringify( payload ) );
        const qs = "?year="+ encodeURIComponent(JSON.stringify(yearData))+"&geo="+ encodeURIComponent(JSON.stringify(geoData));
        fetch(Config.apiBaseUrl+"/search/"+qs,
            {
                method: "POST",
                body: data
            })
            .then(function(res){ return res.json(); })
            .then(res=>{
                data = res[0];
                if (data.header.error!=null){
                    if (data.header.count >0){
                        this.setState({
                            photos:data.result,
                            activePhoto:data.result[0]});
                    }else{
                        this.setState({
                            photos:null,
                            activePhoto:null});
                    }


                }
                console.log(res[0]);
            });
    }

    render() {

            return (
                <div className="App container">
                    {this.state.photos != null?( <ThumbnailSet
                        photos={this.state.photos}
                        handleNewPhotos={this.handleNewPhotos.bind(this)}
                        activePhoto={this.state.activePhoto}
                        handleNewActive={this.handleNewActive.bind(this)}
                    />):(<EmptyThumbnailSet />)}

                    <MainPhoto
                        activePhoto={this.state.activePhoto}
                        photos={this.state.photos}
                        year={this.state.year}
                        geoSearch={this.state.geoSearch}
                        dataSets={this.state.dataSets}
                        handleNewActive={this.handleNewActive.bind(this)}
                        handleGeoSearch={this.handleGeoSearch.bind(this)}
                        handleYearSearch={this.handleYearSearch.bind(this)}
                    />
                </div>
            );
        }



}


export default App;
