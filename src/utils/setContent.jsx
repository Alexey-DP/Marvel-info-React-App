import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';

const setContent = (operation, Component, data) => {
    switch (operation) {
        case 'waiting':
            return <Skeleton />;
        case 'loading':
            return <Spinner />;
        case 'success':
            return <Component data={data} />;
        case 'error':
            return <ErrorMessage />;
        default: throw new Error('Unexpected process state')
    }
}

export default setContent;