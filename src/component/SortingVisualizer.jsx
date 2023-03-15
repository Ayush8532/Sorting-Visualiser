import React, { useState } from "react";
import "./SortingVisualizer.css";

function SortingVisualizer() {
  const [array, setArray] = useState([]);

  // Generate a new random array of specified size
  const generateArray = (size) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(randomIntFromInterval(10, 400));
    }
    setArray(arr);
  };

  const bubbleSort = () => {
    const arr = [...array];
    const process = [];
    const len = arr.length;
    let sorted = false;
    while (!sorted) {
      sorted = true;
      for (let i = 0; i < len - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          const temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          sorted = false;
        }
        process.push([...arr]);
      }
    }
    let i = 0;
    const interval = setInterval(() => {
      if (i < process.length) {
        setArray(process[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1);
  };


  // Generate a random integer within a specified range
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

    return (
      <>
        <div className="container">
          <h1>Sorting Visualiser</h1>
        </div>
        <div className="container parent">
          <div className="sorting-visualizer">
            <div className="array-container">
              {array.map((value, idx) => (
                <div
                  className="array-bar"
                  key={idx}
                  style={{ height: `${value}px` }}
                  ><span >{value}</span></div>
              ))}
            </div>
            <div className="button-container">
              <button onClick={() => generateArray(50)}>
                Generate New Array
              </button>
              <button onClick={() => bubbleSort()}>Bubble Sort</button>
            </div>
          </div>
        </div>
        <div className="container detail">Bubble Sort</div>
      </>
    );
}

export default SortingVisualizer;