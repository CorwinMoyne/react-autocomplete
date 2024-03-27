import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { Autocomplete } from "..";
import { movies } from "../../../mocks/movies";

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
