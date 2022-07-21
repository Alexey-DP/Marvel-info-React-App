import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";

const ResponsivePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const { loading, error, getComics, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComics(id).then(data => {
                    onDataLoaded(data);
                    setDescription(data?.description);
                    setTitle(data?.name);
                });
                break;
            case 'character':
                getCharacter(id).then(data => {
                    onDataLoaded(data);
                    setDescription(data?.description || "The best marvel's character");
                    setTitle(data?.name);
                });
                break;
            default: return null;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={description}
                />
                <title>{title}</title>
            </Helmet>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default ResponsivePage;