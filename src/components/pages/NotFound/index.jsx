import { Component } from 'react';
import img404 from '../../../assets/img/404.jpg'

class NotFound extends Component {

    render() {
        return (
            <>
                <img src={img404} alt="Not Found" />
            </>
        );
    }
}

export default NotFound;