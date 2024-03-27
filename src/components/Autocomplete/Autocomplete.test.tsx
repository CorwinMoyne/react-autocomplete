import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { Autocomplete } from "..";
import { movies } from "../../../mocks/movies";

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
});

it("should show suggestions on focus", async () => {
  vi.useFakeTimers();

  render(<Autocomplete placeholder="Movie search" />);

  act(() => vi.advanceTimersByTime(1000));

  fireEvent.focusIn(screen.getByTestId("autocomplete-input"));

  vi.useRealTimers();

  await waitFor(() => {
    expect(screen.getByTestId("suggestions")).toBeInTheDocument();
    expect(screen.getByRole("list").children.length).toBe(movies.length);
  });
});

it("should hide suggestions on click outside", async () => {
  vi.useFakeTimers();

  render(
    <div id="outside">
      <Autocomplete placeholder="Movie search" />
    </div>
  );

  act(() => vi.advanceTimersByTime(1000));

  fireEvent.focusIn(screen.getByTestId("autocomplete-input"));

  vi.useRealTimers();

  await waitFor(() => {
    expect(screen.getByTestId("suggestions")).toBeInTheDocument();
  });

  fireEvent.click(document.querySelector("#outside")!);

  await waitFor(() => {
    expect(screen.queryByTestId("suggestions")).not.toBeInTheDocument();
  });
});

it("should render No options when suggestions is empty", async () => {
  render(<Autocomplete placeholder="Movie search" />);

  fireEvent.focusIn(screen.getByTestId("autocomplete-input"));

  await waitFor(() => {
    expect(screen.getByTestId("suggestions")).toBeInTheDocument();
    expect(screen.getByText("No options")).toBeInTheDocument();
  });
});

it("should handle the arrow down key", async () => {
  vi.useFakeTimers();

  render(<Autocomplete placeholder="Movie search" />);

  act(() => vi.advanceTimersByTime(1000));

  fireEvent.focusIn(screen.getByTestId("autocomplete-input"));

  vi.useRealTimers();

  await waitFor(() => {
    expect(screen.getByRole("list").children[0]).toHaveClass("active");
  });

  fireEvent.keyDown(screen.getByTestId("autocomplete-input"), {
    key: "ArrowDown",
  });

  fireEvent.keyDown(screen.getByTestId("autocomplete-input"), {
    key: "ArrowDown",
  });

  await waitFor(() => {
    expect(screen.getByRole("list").children[2]).toHaveClass("active");
  });
});

it("should handle the arrow up key", async () => {
  vi.useFakeTimers();

  render(<Autocomplete placeholder="Movie search" />);

  act(() => vi.advanceTimersByTime(1000));

  fireEvent.focusIn(screen.getByTestId("autocomplete-input"));

  vi.useRealTimers();

  await waitFor(() => {
    expect(screen.getByRole("list").children[0]).toHaveClass("active");
  });

  fireEvent.keyDown(screen.getByTestId("autocomplete-input"), {
    key: "ArrowDown",
  });

  fireEvent.keyDown(screen.getByTestId("autocomplete-input"), {
    key: "ArrowDown",
  });

  fireEvent.keyDown(screen.getByTestId("autocomplete-input"), {
    key: "ArrowUp",
  });

  await waitFor(() => {
    screen.debug();
    expect(screen.getByRole("list").children[1]).toHaveClass("active");
  });
});

it("should handle the enter key", async () => {
  vi.useFakeTimers();

  render(<Autocomplete placeholder="Movie search" />);

  act(() => vi.advanceTimersByTime(1000));

  fireEvent.focusIn(screen.getByTestId("autocomplete-input"));

  vi.useRealTimers();

  await waitFor(() => {
    expect(screen.getByRole("list").children[0]).toHaveClass("active");
  });

  fireEvent.keyDown(screen.getByTestId("autocomplete-input"), {
    key: "Enter",
  });

  await waitFor(() => {
    expect(screen.queryByTestId("suggestions")).not.toBeInTheDocument();
    expect(screen.getByTestId("autocomplete-input")).toHaveValue(movies[0]);
  });
});

it("should bold matching text", async () => {
  vi.useFakeTimers();

  render(<Autocomplete placeholder="Movie search" />);

  act(() => vi.advanceTimersByTime(1000));

  fireEvent.focusIn(screen.getByTestId("autocomplete-input"));

  vi.useRealTimers();

  fireEvent.change(screen.getByTestId("autocomplete-input"), {
    target: { value: "12" },
  });

  await waitFor(() => {
    console.log(screen.getByTestId("autocomplete-input").textContent);
    expect(screen.getByRole("list").children[0].innerHTML).toBe("<b>12</b> Angry Men");
  });
});
