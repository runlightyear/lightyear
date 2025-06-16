import { Command } from "commander";
import { useState, useEffect } from "react";
import { render, Text, useStdout } from "ink";

export const test = new Command("test");

test.description("Run tests with live counter").action(async () => {
  const Counter = () => {
    const [counter, setCounter] = useState(0);
    const { write } = useStdout();

    useEffect(() => {
      const timer = setInterval(() => {
        setCounter((previousCounter) => previousCounter + 1);
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }, []);

    useEffect(() => {
      write(`counter: ${counter}`);
    }, [counter, write]);

    return <Text color="green">{counter} tests passed</Text>;
  };

  render(<Counter />);

  console.log("test");
});
