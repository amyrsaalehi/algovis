"use client";

import Template from "@/components/template";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GoChevronRight } from "react-icons/go";

export default function BubbleSort() {
  const array = [5, 3, 6, 4, 1, 2];
  const [arr, setArr] = useState(array);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [play, setPlay] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function run(I: number, J: number, Arr: number[]) {
    if (I < Arr.length) {
      if (J < Arr.length - I - 1) {
        if (Arr[J] > Arr[J + 1]) {
          [Arr[J], Arr[J + 1]] = [Arr[J + 1], Arr[J]];
          setArr([...Arr]);
        }
        setJ(J + 1);
        timeoutRef.current = setTimeout(() => {
          run(I, J + 1, Arr);
        }, 1000);
      } else {
        setJ(0);
        setI(I + 1);
        timeoutRef.current = setTimeout(() => {
          run(I + 1, 0, Arr);
        }, 1000);
      }
    } else {
      timeoutRef.current = setTimeout(() => {
        setPlay(false);
      }, 1000);
    }
  }

  useEffect(() => {
    if (play) {
      run(i, j, arr);
    } else {
      setI(0);
      setJ(0);
      setArr(array);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  return (
    <Template>
      <h1 className="text-4xl font-bold">Bubble Sort</h1>
      <p>
        Bubble sort is a simple sorting algorithm that repeatedly steps through
        the list, compares adjacent elements and swaps them if they are in the
        wrong order. The pass through the list is repeated until the list is
        sorted. The algorithm, which is a comparison sort, is named for the way
        smaller elements {'"'}bubble{'"'} to the top of the list. Although the
        algorithm is simple, it is too slow and impractical for most problems
        even when compared to insertion sort. It can be practical if the input
        is usually in sort order.
      </p>
      <div className="divider" />
      <h2 className="text-2xl font-bold">Algorithm</h2>
      <p>
        The algorithm starts at the beginning of the data set. It compares the
        first two elements, and if the first is greater than the second, it
        swaps them. It continues doing this for each pair of adjacent elements
        to the end of the data set. It then starts again with the first two
        elements, repeating until no swaps have occurred on the last pass.
      </p>
      <div className="divider" />
      <h2 className="text-2xl font-bold">Code</h2>
      <pre>
        {`function bubbleSort(arr) {
  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr.length - i - 1; ++j) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
          `}
      </pre>
      <div className="divider" />
      <h2 className="text-2xl font-bold">Complexity</h2>
      <div>
        <strong className="font-medium">Time Complexity:</strong> O(n^2) <br />
        <p>
          The worst-case time complexity of bubble sort is O(n^2). The best-case
          time complexity is O(n) when the list is already sorted.
        </p>
        <br />
        <strong className="font-medium">Space Complexity:</strong> O(1) <br />
        <p>
          The space complexity of bubble sort is O(1) because only a constant
          amount of extra space is needed.
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
                index === i || index === j
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
        <div />
        <Link className="btn btn-neutral mt-4" href="/selection-sort">
          <p>Selection Sort</p>
          <GoChevronRight className="text-xl" />
        </Link>
      </div>
    </Template>
  );
}
