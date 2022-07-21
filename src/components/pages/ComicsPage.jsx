import { Helmet } from "react-helmet";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {


    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="page with the best comics"
                />
                <title>The Best comics</title>
            </Helmet>
            <AppBanner />
            <ComicsList />
        </>
    )
}

export default ComicsPage;