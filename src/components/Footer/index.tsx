import getTrans from '@/lib/translation'
import React from 'react'
import { Locale } from '@/i18n.config'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Truck, ShieldCheck } from 'lucide-react'

const Footer = async ({ locale }: { locale: Locale }) => {
    const translation = await getTrans(locale)
    const isAr = locale === 'ar'

    return (
        <footer className='border-t border-gray-200 bg-white text-gray-600 mt-16 pt-14 pb-8'>
            <div className='container mx-auto px-4 max-w-6xl'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-gray-100'>
                    {/* Brand column */}
                    <div className='space-y-4'>
                        <Link href={`/${locale}`} className="logo text-primary font-bold text-2xl flex items-center gap-2">
                            <span>🍕</span> {translation.logo}
                        </Link>
                        <p className='text-xs text-gray-500 leading-relaxed'>
                            {isAr 
                                ? "أطباق طازجة ومحضرة بعناية من أفضل المكونات. خدمة توصيل سريعة واستلام مباشر من المطعم."
                                : "Authentic artisanal dishes prepared fresh daily with premium ingredients. Fast, reliable delivery and express takeaway."}
                        </p>
                        <div className='pt-2 space-y-1.5 text-xs text-gray-600'>
                            <div className='flex items-center gap-2'>
                                <Clock className='h-3.5 w-3.5 text-primary shrink-0' />
                                <span>10:00 AM – 11:00 PM (Mon – Sun)</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Phone className='h-3.5 w-3.5 text-primary shrink-0' />
                                <span>+1 555-0199</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Menu */}
                    <div>
                        <h4 className='text-sm font-bold text-gray-900 uppercase tracking-wider mb-4'>
                            {isAr ? "استكشف القائمة" : "Discover Menu"}
                        </h4>
                        <ul className='space-y-2 text-xs'>
                            <li>
                                <Link href={`/${locale}/menu`} className='hover:text-primary transition-colors'>
                                    {isAr ? "قائمة الطعام الكاملة" : "Full Food Menu"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/offers`} className='hover:text-primary transition-colors flex items-center gap-1.5'>
                                    <span>{isAr ? "العروض والخصومات" : "Offers & Meal Deals"}</span>
                                    <span className='bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded font-bold'>NEW</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/favorites`} className='hover:text-primary transition-colors'>
                                    {isAr ? "الأطباق المفضلة" : "My Saved Favorites"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}#best-sellers`} className='hover:text-primary transition-colors'>
                                    {isAr ? "الأكثر مبيعاً" : "Chef Specials"}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h4 className='text-sm font-bold text-gray-900 uppercase tracking-wider mb-4'>
                            {isAr ? "خدمة العملاء" : "Customer Care"}
                        </h4>
                        <ul className='space-y-2 text-xs'>
                            <li>
                                <Link href={`/${locale}/orders/track`} className='hover:text-primary transition-colors flex items-center gap-1.5'>
                                    <Truck className='h-3 w-3 text-primary' />
                                    <span>{isAr ? "تتبع حالة الطلب" : "Live Order Tracking"}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/orders`} className='hover:text-primary transition-colors'>
                                    {isAr ? "سجل طلباتي وإعادة الطلب" : "My Orders & Reorder"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/delivery-info`} className='hover:text-primary transition-colors'>
                                    {isAr ? "معلومات التوصيل والاستلام" : "Delivery & Pickup Info"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/faq`} className='hover:text-primary transition-colors'>
                                    {isAr ? "الأسئلة الشائعة" : "FAQ & Help Center"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/contact`} className='hover:text-primary transition-colors'>
                                    {isAr ? "تواصل معنا" : "Contact & Location"}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Policies */}
                    <div>
                        <h4 className='text-sm font-bold text-gray-900 uppercase tracking-wider mb-4'>
                            {isAr ? "السياسات والشروط" : "Legal & Policies"}
                        </h4>
                        <ul className='space-y-2 text-xs'>
                            <li>
                                <Link href={`/${locale}/privacy`} className='hover:text-primary transition-colors flex items-center gap-1'>
                                    <ShieldCheck className='h-3 w-3 text-green-600' />
                                    <span>{isAr ? "سياسة الخصوصية" : "Privacy Policy"}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/terms`} className='hover:text-primary transition-colors'>
                                    {isAr ? "شروط الخدمة" : "Terms of Service"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/refund-policy`} className='hover:text-primary transition-colors'>
                                    {isAr ? "سياسة الإلغاء والاسترجاع" : "Refund & Cancellation Policy"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/about`} className='hover:text-primary transition-colors'>
                                    {isAr ? "عن المطعم وقصتنا" : "About Our Story"}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className='pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400'>
                    <p>{translation.copyRight || "© 2026 Fasty Food. All rights reserved."}</p>
                    <div className='flex items-center gap-3 text-gray-500'>
                        <span>Secured with SSL</span>
                        <span>•</span>
                        <span>Cash & Card Payments</span>
                        <span>•</span>
                        <span className='capitalize'>{locale === 'ar' ? 'العربية' : 'English'}</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
