import { Routes } from "@/constants/enums"
import { getCurrentLocale } from "@/lib/getCurrentLocale"
import getTrans from "@/lib/translation"
import { Mail, MapPin, Phone, Send, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

// Simple heading component since MainHead is not available
const MainHead = ({ title, subTitle }: { title: string; subTitle: string }) => (
  <div className="text-center mb-12">
    <h1 className="text-5xl font-bold text-gray-900 mb-4 relative inline-block">
      {title}
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary rounded-full"></span>
    </h1>
    <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subTitle}</p>
  </div>
)

interface ContactInfo {
  contactUs: string;
  "Don't Hesitate": string;
  address: string;
  email: string;
  phone: string;
  workingHours: string;
}

const Contact = async () => {
    const locale = await getCurrentLocale();
    const { home } = await getTrans(locale);
    const contact = home.contact as unknown as ContactInfo;
    
    // Default values in case translations are missing
    const contactDetails = {
        address: contact?.address || '123 Food Street, Cuisine City',
        email: contact?.email || 'contact@foodordering.com',
        phone: contact?.phone || '+1 (555) 123-4567',
        workingHours: contact?.workingHours || 'Mon - Fri: 9:00 AM - 10:00 PM',
    };
    
    // Destructure for easier access
    const { address, email, phone, workingHours } = contactDetails;

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50" id={Routes.CONTACT}>
            <div className="container mx-auto px-4">
                <MainHead title={contact.contactUs} subTitle={contact["Don't Hesitate"]} />
                
                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="md:flex">
                        {/* Contact Information */}
                        <div className="md:w-2/5 text-white p-12" style={{ background: 'var(--primary-gradient)' }}>
                            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                            <p className="text-white/90 mb-10">
                                Have questions or feedback? We&apos;d love to hear from you. Reach out to us through any of these channels.
                            </p>
                            
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Our Location</h3>
                                        <p className="text-white/90">{address}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Email Us</h3>
                                        <a href={`mailto:${email}`} className="text-white/90 hover:text-white transition-colors">
                                            {email}
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Call Us</h3>
                                        <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-white/90 hover:text-white transition-colors">
                                            {phone}
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Working Hours</h3>
                                        <p className="text-white/90">{workingHours}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-12 pt-8 border-t border-white/20">
                                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                                <div className="flex gap-4">
                                    {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                                        <a
                                            key={social}
                                            href={`#`}
                                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                            aria-label={social}
                                        >
                                            <span className="sr-only">{social}</span>
                                            {social === 'facebook' && <Facebook className="w-5 h-5" />}
                                            {social === 'twitter' && <Twitter className="w-5 h-5" />}
                                            {social === 'instagram' && <Instagram className="w-5 h-5" />}
                                            {social === 'linkedin' && <Linkedin className="w-5 h-5" />}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Contact Form */}
                        <div className="md:w-3/5 p-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                            <p className="text-gray-600 mb-8">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
                            
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-primary transition-colors">
                                            Your Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 peer"
                                                placeholder="John Doe"
                                            />
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="group">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-primary transition-colors">
                                            Your Email <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 peer"
                                                placeholder="john@example.com"
                                            />
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="group">
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-primary transition-colors">
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="subject"
                                            required
                                            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 peer"
                                            placeholder="How can we help you?"
                                        />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="group">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-primary transition-colors">
                                        Your Message <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="message"
                                            rows={5}
                                            required
                                            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 peer"
                                            placeholder="Your message here..."
                                        ></textarea>
                                        <div className="absolute left-4 top-4 text-gray-400 peer-focus:text-primary transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-primary text-white py-4 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        <Send className="w-5 h-5" />
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
