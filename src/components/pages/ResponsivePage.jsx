import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import useMarvelService from '../../services/MarvelServices';
import setContent from '../../utils/setContent';
import AppBanner from "../appBanner/AppBanner";

const ResponsivePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const { operation, setOperation, getComics, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComics(id).then(data => {
                    onDataLoaded(data);
                    setDescription(data?.description);
                    setTitle(data?.name);
                }).then(() => setOperation('success'));
                break;
            case 'character':
                getCharacter(id).then(data => {
                    onDataLoaded(data);
                    setDescription(data?.description || "The best marvel's character");
                    setTitle(data?.name);
                }).then(() => setOperation('success'));
                break;
            default: return null;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

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
            {setContent(operation, Component, data)}
        </>
    )
}

export default ResponsivePage;