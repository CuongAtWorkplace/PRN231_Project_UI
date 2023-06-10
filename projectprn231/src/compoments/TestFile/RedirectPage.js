import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { Reporter } from "../Reporter/Reporter";
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

export class RedirectPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRedirect: false
        }
    }

    GotoDetail = () => {

    }

    render() {
        return (
            <>
                <NavLink to='/reporter'>
                    <div>
                        <button>Reporter</button>
                    </div>
                </NavLink>

                <Routes>
                    <Route path='/reporter' element={<Reporter />} />
                </Routes>
            </>



        )
    }
}
