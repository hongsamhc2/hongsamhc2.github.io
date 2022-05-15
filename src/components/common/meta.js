import React from 'react'
import {Helmet} from 'react-helmet'
import favicon from '../../resources/png/favicon-16x16.png'

export default function Meta({title}){
    return(
        <Helmet>
            <html lang={'ko_KR'} />
            <link rel="icon" type="image/png" sizes="16x16" href={favicon} />
            <title>{title}</title>

        </Helmet>
    )
}