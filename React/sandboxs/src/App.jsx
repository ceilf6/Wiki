import React,{useState} from 'react'
// import {CheckBoxGroupText,SelectText ,RadioBoxGroupText} from './components'
// import Comp from './test/RefTestFunc'
// import ForwardRefTest from './test/ForwardRefTest copy'
// import AppHOC from './test/HOC/App'
// import ForceReRender from './test/Context/ForceReRender'
// import FormTest from './components/Form/Test'
// import EventTest from './Source-Event/Test'
import UseReducerText from './test/UseReducerText'

const UseStateText = (props) => {
    const {initialData} = props

    const [state,setState] = useState(() => 666*initialData)
    return (
        <button onClick={() => setState(state*10)}>
            {state}
        </button>
    )
}

const el = (
    <>
        {/* <CheckBoxGroupText />
        <SelectText />
        <RadioBoxGroupText /> */}
        
        <UseReducerText />
        <UseStateText initialData={1}/>
    </>
)


const App = () => el
export default App