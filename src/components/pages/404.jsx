import {useState} from 'react';
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet";
import error404 from "../../resources/img/404.jpg";
import React from "react";

const Page404 = () => {

    const [hover, setHover] = useState(false);

    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="page not found"
                />
                <title>Not found 404 :(</title>
            </Helmet>
            <img style={{"display": "block", "width": "100%"}} src={error404} alt="error"/>
            <Link style={{'display': 'block',
            'textAlign': 'center', 'fontSize': 28,
            'color': `${hover ? '#5C5C5C' : '#9f1300'}`,
            'marginTop': '8px',
            'transition': 'color .3s'
            }}  to="/"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            >Back to main page^</Link>
        </div>
    )
}

export default Page404;