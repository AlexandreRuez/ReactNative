import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image} from 'react-native'
import {getFilmDetailFromApi, getImageFromApi} from '../API/TMDBApi'
import { connect } from 'react-redux'

class FilmDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
            isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
        }
    }

    componentDidMount() {
        console.log("Component FilmDetail monté")
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
    }

    _displayLoading() {
        if (this.state.isLoading) {
            // Si isLoading vaut true, on affiche le chargement à l'écran
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _displayFilm() {
        if (this.state.film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(this.state.film.backdrop_path)}}
                    />
                    <Text style={styles.title}>{this.state.film.title}</Text>
                    <Text style={styles.overview}>{this.state.film.overview}</Text>
                    <Text style={styles.details}>Sorti le {this.state.film.release_date}</Text>
                    <Text style={styles.details}>Note : {this.state.film.vote_average}</Text>
                    <Text style={styles.details}>Nombre de votes : {this.state.film.vote_count}</Text>
                    <Text style={styles.details}>Budget : {this.state.film.budget}</Text>
                    <Text style={styles.details}>Genre(s) : {this.state.film.genres.map(function(genre){
                        return genre.name;
                    }).join(" / ")}</Text>
                    <Text style={styles.details}>Compagnie(s) : {this.state.film.production_companies.map(function(company){
                        return company.name;
                    }).join(" / ")}</Text>
                    {/* Pour l'instant je n'affiche que le titre, je vous laisserais le soin de créer la vue. Après tout vous êtes aussi là pour ça non ? :)*/}
                </ScrollView>
            )
        }
    }

    render() {
        console.log("Component FilmDetail rendu")
        console.log(this.props)
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor : '#dedede'
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 169,
        margin: 5
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    overview: {
        color: '#666666',
        fontStyle: 'italic'
    },
    details: {
        marginTop: 10
    }
})

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(FilmDetail)