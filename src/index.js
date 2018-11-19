import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';


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
        const width = (this.props.cols * 14);
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
    handleSelected = (evt) => {
        this.props.gridSize(evt);
    }
    render(){
        return(
            <div className = "center">
                <ButtonToolbar>
                    <button className="btn btn-default" onClick={this.props.playButton}>Play</button>
                    <button className="btn btn-default" onClick={this.props.pauseButton}>Pause</button>
                    <button className="btn btn-default" onClick={this.props.clear}>Clear</button>
                    <button className="btn btn-default" onClick={this.props.slow}>Slow</button>
                    <button className="btn btn-default" onClick={this.props.fast}>Fast</button>
                    <button className="btn btn-default" onClick={this.props.seed}>Seed</button>
                    <DropdownButton
                        title = "Grid Size"
                        id = "size-menu"
                        onSelect = {this.handleSelected}>
                        <MenuItem eventKey="1">20x10</MenuItem>
                        <MenuItem eventKey="2">50x30</MenuItem>
                        <MenuItem eventKey="3">70x50</MenuItem>
                    </DropdownButton>
                </ButtonToolbar>
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

    pauseButton = () => {
        clearInterval(this.intervalId );
    }

    slow = () => {
        this.speed = this.speed + 100;
        this.playButton();
    }

    fast = () => {
        if(this.speed > 100){
            this.speed = this.speed - 100;
        }
        this.playButton();
    }

    clear = () => {
        var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
        this.setState({
            gridFull: grid,
            generation: 0
        });
    }

    gridSize = (size) => {
        if(size === "1"){
            this.cols = 20;
            this.rows = 10;
        }else if(size === "2"){
            this.cols = 50;
            this.rows = 30;
        }else if(size === "3"){
            this.cols = 70;
            this.rows = 50;
        }

        this.clear();
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
                <h3>Frame Rate: {this.speed / 1000}</h3>
            </div>
        );
    }
}

function arrayClone(arr){
    return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main/>, document.getElementById('root'));
