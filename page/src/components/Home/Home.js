import React, { useRef } from 'react'
import MainContent from './MainContent'
import About from './About'
import Prods from './Prods'
import Features from './Features'
import HandCrafted from './HandCrafted'
import Contact from './Contact'
import Footer from './Footer'

export default function Home() {
    const AboutRef = useRef(null)
    const ServicesRef = useRef(null)
    const ContactRef = useRef(null)
    const HandRef = useRef(null)

    const executeScroll = (ref) => {
        window.scrollTo(0, ref.current.offsetTop)
    }

    return (
        <div>
            <MainContent executeScroll={executeScroll} about={AboutRef} services={ServicesRef} contact={ContactRef} hand={HandRef} />
            <About aboutRef={AboutRef} />
            <Prods />
            <Features servicesRef={ServicesRef} /> {/*servicios?*/}
            <HandCrafted handRef={HandRef} />
            <Contact contactRef={ContactRef} />
            <Footer />
        </div>
    )
}
