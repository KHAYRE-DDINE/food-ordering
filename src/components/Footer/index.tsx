import getTrans from '@/lib/translation'
import React from 'react'
import { Locale } from '@/i18n.config'


const Footer = async ({ locale }: { locale: Locale }) => {
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
