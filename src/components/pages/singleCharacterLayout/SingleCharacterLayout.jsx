import { Link } from 'react-router-dom';

import './singleCharacterLayout.scss';

const SingleCharacterLayout = ({ data }) => {

    const { name, description, thumbnail, comics } = data;

    return (
        <div className="single-character">
            <img src={thumbnail} alt={name} className="single-character__img" />
            <div className="single-character__info">
                <h2 className="single-character__name">{name}</h2>
                <p className="single-character__descr">
                    {!description ? `Description of the ${name} is missing` : description}
                </p>
                <ul className="single-character__comics-list">
                    {
                        comics.map((comic, i) => {
                            const { name, resourceURI } = comic;
                            const url = resourceURI.match(/comics\/(\d+)/)[1];
                            // eslint-disable-next-line
                            if (i > 9) return;
                            return (
                                <li key={i} className="single-character__comics-item">
                                    <Link to={`/comic/${url}`}>{name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <Link to="/" className="single-character__back">Back to Main</Link>
        </div>
    )
}

export default SingleCharacterLayout;