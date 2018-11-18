import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Grid extends React.Component{
    render(){
        const width = this.props.cols * 14;
        var rowsArr = [];

        var boxClass = "";
        for(var i = 0; i < this.props.rows; i++){
            for(var k = 0; k < this.props.cols; k++){
                let boxId = i + "_" + k;
                boxClass = this.props.gridFull[i][k] ? "box on" : "box off";

                rowsArr.push(
                    <Box
                        boxClass = {boxClass}
                        key = {boxId}
                        boxId = {boxId}
                        row = {i}
                        col = {k}
                        selectBox = {this.props.selectBox}
                    />
                );
            }
        }

        return (
            <div className="grid" style={{width: width}}>
            {{rowsArr}}
            </div>
        );
    }
}

class Main extends React.Component{
    constructor (){
        super();
        this.speed = 100;
        this.rows = 30;
        this.cols = 50;

        this.state = {
            generation: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
        }
    }
    render(){
        return(
            <div>
                <h1>Game Of Life</h1>
                <Grid 
                    gridFull = {this.state.gridFull}
                    rows = {this.rows}
                    cols = {this.cols}
                    selectBox = {this.selectBox}
                    />
                <h2>Generations: {this.state.generation}</h2>
            </div>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
