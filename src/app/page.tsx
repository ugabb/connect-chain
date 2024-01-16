import Image from 'next/image'
import TextField from './components/inputs/TextField'
import SelectField from './components/inputs/SelectField'
import Button from './components/buttons/Button'
import TabsNavigation from './components/navigation/TabsNavigation'

export default function Home() {
  return (
    <main className="">
      <h1 className='text-mainRed font-instrument'>Hello Next</h1>
      <div className="flex flex-col gap-3 w-[500px]">
        <TextField />
        <SelectField />
        <Button name="Login" variant='default' />
        <Button name="Login" variant='outline' />
        <TabsNavigation />
      </div>
    </main>
  )
}
