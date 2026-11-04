import About from "@/components/About"
import { Locale } from "@/i18n.config"

const AboutPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
    const { locale } = await params

    return (
        <div>
            <About locale={locale} />
        </div>
    )
}

export default AboutPage
