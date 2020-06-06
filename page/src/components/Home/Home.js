import React from 'react'
import MainContent from './MainContent'
import About from './About'
import Prods from './Prods'
import Features from './Features'
import HandCrafted from './HandCrafted'
import Contact from './Contact'
import Footer from './Footer'

export default function Home() {
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
