import Contact from '@/components/Contact'
import { Locale } from '@/i18n.config'
import React from 'react'

const ContactPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
    const { locale } = await params

    return (
        <div>
            <Contact locale={locale} />
        </div>
    )
}

export default ContactPage
