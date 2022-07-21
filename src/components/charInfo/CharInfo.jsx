import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelServices';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = ({ charId }) => {

    const [char, setChar] = useState(null);

    const { operation, setOperation, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [charId])

    const updateChar = () => {
        if (!charId) {
            return
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setOperation('success'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div id='info' className='char__info'>
            {setContent(operation, View, char)}
        </div>
    )
}

const View = ({ data }) => {

    const { name, decoration, thumbnail, id, wiki, comics } = data;
    const style = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? { objectFit: 'unset' } : {};

    return (
        <>
            <div className="char__basics">
                <img style={style} src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={`/character/${id}`} className="button button__main">
                            <div className="inner">to page</div>
                        </a>
                        <a href={wiki} className="button button__secondary" target="__blank">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {decoration}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : `${name} doesn't have comics :(`}
                {
                    comics.map((item, i) => {
                        const { name, resourceURI } = item;
                        const url = resourceURI.match(/comics\/(\d+)/)[1];
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                <Link to={`/comic/${url}`}>{name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;