import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Box extends React.Component{

    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col)
    }

    render(){
        return(
            <div 
                className = {this.props.boxClass}
                id = {this.props.id}
                onClick = {this.selectBox}
            />
        );
    }
}

class Grid extends React.Component{
    render(){
        const width = (this.props.cols * 16);
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
                {rowsArr}
            </div>
        );
    }
}

class Button extends React.Component{
    render(){
        return(

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

    selectBox = (row, col) => {
        let gridCopy = arrayClone(this.state.gridFull);
        gridCopy[row][col] = !gridCopy[row][col];
        this.setState({
            gridFull: gridCopy
        });
    }

    playButton = () => { 
        clearInterval(this.intervalId); 
        this.intervalId = setInterval(this.play, this.speed);
    }

    play = () => {
        let g = this.state.gridFull;
        let g2 = arrayClone(this.state.gridFull);

        for(var i = 0; i < this.rows; i++){
            for(var k = 0; k < this.cols; k++){
                let count = 0;
                if (i > 0) if (g[i - 1][k]) count++;
                if (i > 0 && k > 0) if (g[i - 1][k - 1]) count++;
                if (i > 0 && k < this.cols - 1) if (g[i - 1][k + 1]) count++;
                if (k < this.cols - 1) if (g[i][k + 1]) count++;
                if (k > 0) if (g[i][k - 1]) count++;
                if (i < this.rows - 1) if (g[i + 1][k]) count++;
                if (i < this.rows - 1 && k > 0) if (g[i + 1][k - 1]) count++;
                if (i < this.rows - 1 && k < this.cols - 1) if (g[i + 1][k + 1]) count++;
                if (g[i][k] && (count < 2 || count > 3)) g2[i][k] = false;
                if (!g[i][k] && count === 3) g2[i][k] = true;
            }
        }

        this.setState({
            gridFull: g2,
            generation: this.state.generation + 1
        });
    }

    pause = () => {
        clearInterval(this.intervalId );
    }

    seed = () => {
        console.log("Seed");
        let gridCopy = arrayClone(this.state.gridFull);
        for(var i = 0; i < this.rows; i++){
            for(var k = 0; k < this.cols; k++){  
                if(Math.floor(Math.random() * 4) === 1) {
                    console.log("Random");
                    gridCopy[i][k] = true;
                }
            }
        }
        this.setState({
            gridFull: gridCopy
        });
    }

    componentDidMount() {
        this.seed();
        this.playButton();
    }

    render(){
        return(
            <div>
                <h1>Game Of Life</h1>
                <Button
                    playButton = {this.playButton}
                    pauseButton = {this.pauseButton}
                    slow = {this.slow}
                    fast = {this.fast}
                    clear = {this.clear}
                    seed = {this.seed}
                    gridSize = {this.gridSize}
                />
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

function arrayClone(arr){
    return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
