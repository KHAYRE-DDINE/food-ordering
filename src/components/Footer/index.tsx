import { getCurrentLocale } from '@/lib/getCurrentLocale'
import getTrans from '@/lib/translation'
import React from 'react'


const Footer = async () => {
    const locale = await getCurrentLocale()
    const { copyRight } = await getTrans(locale)

    return (
        <footer className='border-t text-accent text-center p-4 mt-8'>
            <div className='container'>
                <p>{copyRight}</p>
            </div>
        </footer>
    )
}

export default Footer
