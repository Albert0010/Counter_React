import {Component} from "react";

export default class Counter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            count:+(localStorage.getItem("count")) || 0,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {count} = this.state;
        const {inputValueForMin,inputValueForMax,step} = this.props;
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
    componentDidMount() {
        if(JSON.parse(localStorage.getItem("count")) === null){
            localStorage.setItem("count","0");
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
        this.props.handleResetClick();
        this.setState({count:0});
    }
    render() {
        const {handleAddClick,handleSubClick,handleResetClick} = this;
        const {inputValueForMax,inputValueForMin,step} = this.props;
        const {count} = this.state;
        const isDisabledAdd = !(inputValueForMax) || ((count +  (step)) >  inputValueForMax);
        const isDisabledSub = (count - (step)) <= inputValueForMin;
        const isDisabledReset = (!(inputValueForMax) && !(inputValueForMin) && !(step));
        return(
            <div className={"container"}>
                <div className={"counterField"}>
                    <h1>{count}</h1>
                    <button  onClick={handleAddClick}
                             disabled={isDisabledAdd}
                             className={"configButton"}>Add
                    </button>
                    <button  onClick={handleSubClick}
                             disabled={isDisabledSub}
                             className={"configButton"}>Sub
                    </button>
                    <button  onClick={handleResetClick}
                             disabled={isDisabledReset}
                             className={"configButton"} >Reset
                    </button>
                </div>
            </div>
        )
    }

}