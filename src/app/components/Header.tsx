import React from 'react'

import Image from 'next/image'
import TabsNavigation from './navigation/TabsNavigation'


type Props = {}

const Header = (props: Props) => {
    return (
        <div className='flex items-center '>
            <TabsNavigation />
        </div>
    )
}

export default Header