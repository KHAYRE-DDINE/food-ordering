import React from 'react'

const MainHead = ({ title, subTitle }: { title: string, subTitle: string }) => {
    return (
        <>
            <h2 className='uppercase text-accent font-semibold leading-4'>{title}</h2>
            <span className='text-primary text-4xl font-bold italic'>{subTitle}</span>
        </>
    )
}

export default MainHead
