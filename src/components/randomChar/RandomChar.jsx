import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelServices';
import setContent from '../../utils/setContent';

import './randomChar.scss';

const RandomChar = () => {

    const [char, setChar] = useState(null);
    const {operation, setOperation, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setOperation('success'));
    }

    return (
        <div className="randomchar">
            {setContent(operation, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
            </div>
        </div>
    )
}

const charDescription = (description, name = '') => {
    if (!description) {
        return `Description of the ${name} is missing`;
    } else if (description.length > 150) {
        return `${description.slice(0, 150)}...`
    } else return description;
}

const View = ({data}) => {
    const {name, description, thumbnail, id, wiki} = data;
    const style = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'unset'} : {};

    return (
        <div className="randomchar__block">
            <img src={thumbnail} style={style} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {charDescription(description, name)}
                </p>
                <div className="randomchar__btns">
                    <a href={`/character/${id}`} className="button button__main">
                        <div className="inner">to page</div>
                    </a>
                    <a href={wiki} className="button button__secondary" target="__blank">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )

}

export default RandomChar;