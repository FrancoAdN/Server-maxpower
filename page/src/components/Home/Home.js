import React, { useEffect } from 'react'
import AOS from 'aos'
import MainContent from './MainContent'
import About from './About'
import Prods from './Prods'
import Features from './Features'
import HandCrafted from './HandCrafted'
import Contact from './Contact'
import Footer from './Footer'
import 'aos/dist/aos.css'



export default function Home() {
    useEffect(() => {
        AOS.init()
    }, [])

    return (
        <div>
            <MainContent />
            <About />
            <Prods />
            <Features />
            <HandCrafted />
            <Contact />
            <Footer />
        </div>
    )
}
