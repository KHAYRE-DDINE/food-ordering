"use client";
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Languages } from '@/constants/enums'

const SwitchLanguage = () => {
  const { locale } = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (newLocale: string) => {
    const path = pathname.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`

    router.push(path)
  }
  return (
    <div className="flex mx-2">
      {locale === Languages.ARABIC ? (
        <Button
          variant="outline"
          onClick={() => switchLanguage(Languages.ENGLISH)}
          className='hover:!bg-button-background'
        >
          English
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => switchLanguage(Languages.ARABIC)}
          className='hover:!bg-button-background'
        >
          العربية
        </Button>
      )}
    </div>
  );
}

export default SwitchLanguage
