import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {

    const [comicses, setComicses] = useState([]);
    const [newComicsLoading, setComicsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { operation, setOperation, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setComicsLoading(false) : setComicsLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setOperation('success'));
    }

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }
        setComicses(comicses => [...comicses, ...newComics]);
        setComicsLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('comics__item_selected'));
        itemRefs.current[id].classList.add('comics__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItem(arr) {
        const items = arr.map((item, i) => {
            const { name, thumbnail, id, price } = item;

            return (
                <CSSTransition
                className="comics__item"
                classNames="comics__animate"
                timeout={700}
                key={i}
                tabIndex={0}
                onFocus={() => {
                    focusOnItem(i);
                }}
                >
                    <li>
                        <Link to={`/comic/${id}`}>
                            <img
                                src={thumbnail}
                                alt={name}
                                ref={el => itemRefs.current[i] = el}
                                className="comics__item-img"
                            />
                            <div className="comics__item-name">{name}</div>
                            <div className="comics__item-price">{`${price}$`}</div>
                        </Link>
                    </li>
                </CSSTransition>

            )
        });

        return (
            <TransitionGroup component="ul" className="comics__grid">
                {items}
            </TransitionGroup>
        )
    }

    const items = renderItem(comicses);
    const errorMessage = operation === 'error' ? <ErrorMessage /> : null;
    const spinner = operation === 'loading' && !newComicsLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newComicsLoading}
                style={{ 'display': comicsEnded ? 'none' : '' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;