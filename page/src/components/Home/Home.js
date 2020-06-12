import React, { useRef } from 'react'
import MainContent from './MainContent'
import About from './About'
import Prods from './Prods'
import Features from './Features'
import HandCrafted from './HandCrafted'
import Contact from './Contact'
import Footer from './Footer'

export default function Home() {
    const ab = useRef(null)
    const feat = useRef(null)
    const hand = useRef(null)
    const contact = useRef(null)


    return (
        <div>
            <MainContent about={ab} features={feat} contact={contact} hand={hand} />
            <About about={ab} />
            <Prods />
            <Features feat={feat} /> {/*servicios?*/}
            <HandCrafted handRef={hand} />
            <Contact contact={contact} />
            <Footer />
        </div>
    )
}
