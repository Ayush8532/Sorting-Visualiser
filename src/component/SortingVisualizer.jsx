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
  //BUBBLE SORT
  const bubbleSort = async () => {
    const len = array.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        const divs = document.getElementsByClassName("array-bar");
        divs[j].style.backgroundColor = "red";
        divs[j + 1].style.backgroundColor = "red";
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 1)
        );
        if (array[j] > array[j + 1]) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          setArray([...array]);
        }
        divs[j].style.backgroundColor = "blue";
        divs[j + 1].style.backgroundColor = "blue";
      }
    }
  };

  //INSERTION SORT
  const insertionSort = async () => {
    const len = array.length;
    for (let i = 1; i < len; i++) {
      let temp = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > temp) {
        array[j + 1] = array[j];
        setArray([...array]);
        const divs = document.getElementsByClassName("array-bar");
        divs[j + 1].style.backgroundColor = "red";
        divs[j].style.backgroundColor = "red";
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 1)
        );
        divs[j + 1].style.backgroundColor = "blue";
        divs[j].style.backgroundColor = "blue";
        j--;
      }
      array[j + 1] = temp;
      setArray([...array]);
    }
  };

  //Merge SOrt
  const mergeSort = async (arr) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const leftArray = arr.slice(0, mid);
    const rightArray = arr.slice(mid);

    await mergeSort(leftArray);
    await mergeSort(rightArray);

    let i = 0;
    let j = 0;
    let k = 0;

    while (i < leftArray.length && j < rightArray.length) {
      const divs = document.getElementsByClassName("array-bar");
      divs[k].style.backgroundColor = "red";
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 10)
      );

      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }

      setArray([...arr]);
      divs[k].style.height = `${arr[k]}px`;
      divs[k].style.backgroundColor = "blue";
      k++;

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 10)
      );
    }

    while (i < leftArray.length) {
      arr[k] = leftArray[i];
      setArray([...arr]);
      const divs = document.getElementsByClassName("array-bar");
      divs[k].style.height = `${arr[k]}px`;
      divs[k].style.backgroundColor = "blue";
      i++;
      k++;

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 10)
      );
    }

    while (j < rightArray.length) {
      arr[k] = rightArray[j];
      setArray([...arr]);
      const divs = document.getElementsByClassName("array-bar");
      divs[k].style.height = `${arr[k]}px`;
      divs[k].style.backgroundColor = "blue";
      j++;
      k++;

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 10)
      );
    }

    return arr;
  };

  // Selection Sort
  const selectionSort = async () => {
    const len = array.length;
    for (let i = 0; i < len; i++) {
      let minIdx = i;
      for (let j = i + 1; j < len; j++) {
        const divs = document.getElementsByClassName("array-bar");
        divs[j].style.backgroundColor = "red";
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 10)
        );
        if (array[j] < array[minIdx]) {
          divs[minIdx].style.backgroundColor = "blue"; // Reset color for the previously selected element
          minIdx = j;
        } else {
          divs[j].style.backgroundColor = "blue"; // Reset color for the element being compared
        }
      }
      await swap(i, minIdx);
    }
  };

  // Helper function to swap two elements in the array
  const swap = async (i, j) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    setArray([...array]);
    const divs = document.getElementsByClassName("array-bar");
    divs[i].style.height = `${array[i]}px`;
    divs[j].style.height = `${array[j]}px`;
    divs[i].style.backgroundColor = "blue"; // Highlight the swapped elements
    divs[j].style.backgroundColor = "blue";
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 100)
    );
    divs[i].style.backgroundColor = "blue"; // Reset color after highlighting
    divs[j].style.backgroundColor = "blue";
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
              ></div>
            ))}
          </div>
          <div className="button-container">
            <button onClick={() => generateArray(50)}>
              Generate New Array
            </button>
            <button onClick={() => bubbleSort()}>Bubble Sort</button>
            <button onClick={() => insertionSort()}>Insertion Sort</button>
            <button onClick={() => mergeSort([...array])}>Merge Sort</button>
            <button onClick={() => selectionSort()}>Selection Sort</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SortingVisualizer;
