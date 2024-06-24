"use client";

import Template from "@/components/template";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

export default function SelectionSort() {
  const array = [5, 3, 6, 4, 1, 2];
  const [arr, setArr] = useState(array);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [min, setMin] = useState(0);
  const [play, setPlay] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function runHelper(Min: number, I: number, J: number, Arr: number[]) {
    if (J < Arr.length) {
      if (Arr[J] < Arr[Min]) {
        Min = J;
        setMin(Min);
      }
      setJ(J + 1);
      timeoutRef.current = setTimeout(() => {
        runHelper(Min, I, J + 1, Arr);
      }, 1000);
    } else {
      if (Min !== I) {
        [Arr[I], Arr[Min]] = [Arr[Min], Arr[I]];
        setArr([...Arr]);
      }
      setI(I + 1);
      setJ(I + 1);
      timeoutRef.current = setTimeout(() => {
        run(I + 1, I + 1, Arr);
      }, 1000);
    }
  }

  function run(I: number, J: number, Arr: number[]) {
    if (I < Arr.length) {
      let Min = I;
      setMin(Min);
      runHelper(Min, I, J, Arr);
    } else {
      setPlay(false);
    }
  }

  useEffect(() => {
    if (play) {
      run(i, j, arr);
    } else {
      setI(0);
      setJ(0);
      setMin(0);
      setArr(array);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  return (
    <Template>
      <h1 className="text-4xl font-bold">Selection Sort</h1>
      <p>
        Selection sort is an in-place comparison sorting algorithm. It divides
        the input list into two parts: the sublist of items already sorted, and
        the sublist of items remaining to be sorted. It repeatedly selects the
        minimum element from the unsorted sublist and swaps it with the first
        element of the unsorted sublist.
      </p>
      <div className="divider" />
      <h2 className="text-2xl font-bold">Algorithm</h2>
      <p>
        The algorithm works by selecting the smallest unsorted element and then
        swapping it with the element in the first unsorted position. The
        selection sort algorithm is as follows:
      </p>
      <div className="divider" />
      <h2 className="text-2xl font-bold">Code</h2>
      <pre>
        {`function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }
          `}
      </pre>
      <div className="divider" />
      <h2 className="text-2xl font-bold">Complexity</h2>
      <div>
        <strong className="font-medium">Time Complexity:</strong> O(n^2) <br />
        <p>
          The time complexity of selection sort is O(n^2) in the worst case,
          where n is the number of elements in the array. This is because the
          algorithm has two nested loops that iterate over the array, resulting
          in a quadratic time complexity. The best-case time complexity of
          selection sort is also O(n^2), as the algorithm does not take
          advantage of any pre-sortedness in the input array.
        </p>
        <br />
        <strong className="font-medium">Space Complexity:</strong> O(1) <br />
        <p>
          The space complexity of selection sort is O(1) because the algorithm
          sorts the array in place, without using any additional data
          structures. This means that the amount of extra space required by the
          algorithm does not grow with the size of the input array.
        </p>
      </div>
      <div className="divider" />
      <h2 className="text-2xl font-bold">Visualize</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2 mx-auto">
          {arr.map((item, index) => (
            <div
              key={index}
              className={`h-8 w-8 flex items-center justify-center rounded-md ${
                index === i || index === j || index === min
                  ? "bg-primary text-white"
                  : "bg-stone-50"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
        {play ? (
          <button
            onClick={() => setPlay(false)}
            className="btn btn-error btn-sm px-8 mx-auto"
          >
            Reset
          </button>
        ) : (
          <button
            onClick={() => {
              setPlay(true);
            }}
            className="btn btn-primar btn-sm px-8 mx-auto"
          >
            Play
          </button>
        )}
      </div>
      <div className="w-full flex justify-between">
        <Link className="btn btn-neutral mt-4" href="/">
          <GoChevronLeft className="text-xl" />
          <p>Bubble Sort</p>
        </Link>
        <Link className="btn btn-neutral mt-4" href="/insertion-sort">
          <p>Insertion Sort</p>
          <GoChevronRight className="text-xl" />
        </Link>
      </div>
    </Template>
  );
}
