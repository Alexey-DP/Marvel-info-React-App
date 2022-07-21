import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {CSSTransition, TransitionGroup} from 'react-transition-group';


import './charList.scss';

const  CharList = ({onCharSelected}) => {

    const [chars, setChars] = useState([]);
    const [newItemLoading, setItemLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [charEnded, setCharEnded] = useState(false);

    const {operation, setOperation, getAllCharacter} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setItemLoading(false) : setItemLoading(true);
        getAllCharacter(offset)
            .then(onCharsLoaded)
            .then(() => setOperation('success'));
    }

    const onCharsLoaded = (newChars) => {

        let ended = false;
        if(newChars.length < 9) {
            ended = true;
        }
        setChars(chars => [...chars, ...newChars]);
        setItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }


    function renderItem (arr) {
        const items = arr.map((item, i) => {
            const {name, id, thumbnail} = item;
            const charName = name.length > 28 ? `${name.slice(0, 28)}...` : name;
            const style = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'unset'} : {};
            return (
                <CSSTransition
                key={id}
                className="char__item"
                classNames="char__animate"
                timeout={700}
                tabIndex={0}
                >
                    <a
                    ref={el => itemRefs.current[i] = el}
                    href='#info'
                    onClick={() => {
                    onCharSelected(item.id);
                    focusOnItem(i);
                    }}
                    onFocus={() => {
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                    <img style={style} src={thumbnail} alt="abyss"/>
                    <div className="char__name">{charName}</div>
                </a>
                </CSSTransition>
            )
        });

        return (
            <TransitionGroup component="ul" className="char__grid">
                    {items}
            </TransitionGroup>
        )
    }

    const items = useMemo(() => {
        return renderItem(chars);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chars]);

    const errorMessage = operation === 'error' ? <ErrorMessage/> : null;
    const spinner = operation === 'loading' && !newItemLoading ? <Spinner/> : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {items}
                <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : ''}}
                onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;