import {Component} from "react";

export default class Counter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            count:+(localStorage.getItem("count")),
            inputValueForMax:+(localStorage.getItem("inputValueForMax")),
            inputValueForMin:+(localStorage.getItem("inputValueForMin")),
            step:+(localStorage.getItem("step")) || 1,
        }
    }
    componentDidMount() {
        if(JSON.parse(localStorage.getItem("count")) === null){
            localStorage.setItem("count","0");
        }
        if((localStorage.getItem("inputValueForMax")) === null){
            localStorage.setItem("inputValueForMax","0");
        }
        if((localStorage.getItem("inputValueForMin")) === null){
            localStorage.setItem("inputValueForMin","0");
        }
        if((localStorage.getItem("step")) === null){
            localStorage.setItem("step","1");
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const {inputValueForMin,inputValueForMax,count,step} = this.state;
        if(prevState.count < inputValueForMin){
            this.setState({count:(inputValueForMin)})
        }
        else {
            localStorage.setItem("count",count);
            localStorage.setItem("step",step);
            localStorage.setItem("inputValueForMin",inputValueForMin);
            localStorage.setItem("inputValueForMax",inputValueForMax);
        }

    }



    //Add,Sub,Reset clicks handling
    handleAddClick = ()=>{
        this.setState({count:this.state.count + (+localStorage.getItem("step"))});
    }
    handleSubClick = ()=>{
        this.setState({count:this.state.count - (+localStorage.getItem("step"))});
    }
    handleResetClick = ()=>{
        this.setState({count:0,inputValueForMax:0,inputValueForMin:0,step:0});
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
        const {handleAddClick,handleSubClick,handleResetClick,handleInputChangeForMax,handleInputChangeForMin,handleInputChangeForStep} = this;
        const {count,inputValueForMax,inputValueForMin,step} = this.state;


        return(

            <div className={"container"}>
                <div className={"counterField"}>
                    <h1>{count}</h1>
                    <button  onClick={handleAddClick} disabled={ !(inputValueForMax) || (count +  (step)) >  inputValueForMax} className={"configButton"}>Add</button>
                    <button  onClick={handleSubClick} disabled={(count - (step)) <= inputValueForMin} className={"configButton"}>Sub</button>
                    <button  onClick={handleResetClick} disabled={!(inputValueForMax) && !(inputValueForMin) && !(step)}  className={"configButton"} >Reset</button>
                </div>
                <div className={"inputField"}>
                    <h3>Maximal Value</h3>
                    <input onChange={handleInputChangeForMax} value={inputValueForMax} className={"input"} type={"number"}/>
                    <h3>Minimal Value</h3>
                    <input  onChange={handleInputChangeForMin} value={inputValueForMin} className={"input"} type={"number"}/>
                    <h3>Step</h3>
                    <input onChange={handleInputChangeForStep} value={step} className={"input"} type={"number"}/>
                </div>
            </div>
        )
    }

}