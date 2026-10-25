import React from 'react'

const MainHead = ({ title, subTitle }: { title: string, subTitle: string }) => {
    return (
        <div className="space-y-1 mb-2 text-center">
            <span className='uppercase text-primary font-bold text-xs tracking-wider block'>{title}</span>
            <h2 className='text-gray-900 text-3xl sm:text-4xl font-extrabold tracking-tight'>{subTitle}</h2>
        </div>
    )
}

export default MainHead
