import {Component} from "react";
import Counter from "../Counter/Counter.js";

localStorage.removeItem("count")
export default class Input extends Component{
    constructor(props) {
        super(props);
        this.state = {
            inputValueForMax:+(localStorage.getItem("inputValueForMax")) || 10,
            inputValueForMin:+(localStorage.getItem("inputValueForMin")) || 0,
            step:+(localStorage.getItem("step")) || 1,
        }
    }
    componentDidMount() {
        if((localStorage.getItem("inputValueForMax")) === null){
            localStorage.setItem("inputValueForMax","10");
        }
        if((localStorage.getItem("inputValueForMin")) === null){
            localStorage.setItem("inputValueForMin","0");
        }
        if((localStorage.getItem("step")) === null){
            localStorage.setItem("step","1");
        }
    }

    handleResetClick = ()=>{
        this.setState({inputValueForMax:0,inputValueForMin:0,step:0});
    }



    //inputs handling
    handleInputChangeForMax = (e)=>{
        this.setState({inputValueForMax:+(e.target.value) || ""})
    }
    handleInputChangeForMin = (e)=>{
        this.setState({inputValueForMin:+(e.target.value) || ""})
    }
    handleInputChangeForStep = (e)=>{
        this.setState({step:+(e.target.value) || ""})
    }

    render() {
        const {handleInputChangeForMax,handleInputChangeForMin,handleInputChangeForStep,handleResetClick} = this;
        const {inputValueForMax,inputValueForMin,step} = this.state;
        return (
            <div>
                <Counter inputValueForMax = {inputValueForMax}
                         step={step}
                         handleResetClick={handleResetClick}
                         inputValueForMin={inputValueForMin}/>
                <div className={"inputField"}>
                    <h3>Maximal Value</h3>
                    <input onChange={handleInputChangeForMax}
                           value={inputValueForMax}
                           className={"input"}
                           type={"number"}/>
                    <h3>Minimal Value</h3>
                    <input  onChange={handleInputChangeForMin}
                            value={inputValueForMin}
                            className={"input"}
                            type={"number"}/>
                    <h3>Step</h3>
                    <input onChange={handleInputChangeForStep}
                           value={step}
                           className={"input"}
                           type={"number"}/>
                </div>
            </div>
        );
    }


}