import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from "./components/pages/Index";
import Checkout from "./components/pages/Checkout";
import NotFound from './components/pages/NotFound';

class RootRouters extends Component {

    render() {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
}

export default RootRouters;